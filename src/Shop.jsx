import ProductCard from './ProductCard';
import PropTypes from 'prop-types';
import DropdownFilter from './DropdownFilter';
import PriceRangeController from './PriceRangeController';
import { useEffect, useState } from 'react';
import Sorter from './Sorter';

function Shop({ products, error, loading, onAddItemToCart }) {
	const [genreFilters, setGenreFilters] = useState([]);
	const [platformFilters, setPlatformFilters] = useState([]);
	const [ageRatingFilters, setAgeRatingFilters] = useState([]);
	const [sortCriteria, setSortCriteria] = useState(null);
	const [priceRangeFilters, setPriceRangeFilters] = useState({ min: null, max: null });
	const [isProductsLoading, setIsProductsLoading] = useState(loading);

	// Update isProductsLoading if the parent component passed a new loading prop
	useEffect(() => {
		setIsProductsLoading(loading);
	}, [loading]);

	// Check if the updated products have been fetched
	const hasFetchedAllUpdatedProducts = products.length !== 0;

	// Check if the filters have not yet been set
	const areGenreFiltersUnset = genreFilters.length === 0;

	// Collect every possible distinct genres from the products
	// only if the updated products have been fetched and the genre filters have not yet been set
	if (hasFetchedAllUpdatedProducts && areGenreFiltersUnset) {
		let updatedGenreFilters = [
			...new Set(
				products
					.map((product) => {
						return product.genre;
					})
					.flat()
			),
		].map((genreFilter) => {
			return { name: genreFilter, isChecked: false };
		});
		setGenreFilters(updatedGenreFilters);
	}

	// Check if the platform filters have not yet been set
	const arePlatformFiltersUnset = platformFilters.length === 0;

	// Collect every possible distinct platforms from the products
	// only if the updated products have been fetched and the platform filters have not yet been set
	if (hasFetchedAllUpdatedProducts && arePlatformFiltersUnset) {
		let updatedPlatformFilters = [
			...new Set(
				products
					.map((product) => {
						return product.platforms;
					})
					.flat()
			),
		].map((platformFilter) => {
			return { name: platformFilter, isChecked: false };
		});
		setPlatformFilters(updatedPlatformFilters);
	}

	// Check if the age filters have not yet been set
	const areAgeRatingFiltersUnset = ageRatingFilters.length === 0;

	// Collect every possible distinct age ratings from the products
	// only if the updated products have been fetched and the age rating filters have not yet been set
	if (hasFetchedAllUpdatedProducts && areAgeRatingFiltersUnset) {
		let updatedAgeRatingFilters = [
			...new Set(
				products.map((product) => {
					return product.esrbRating;
				})
			),
		].map((ageRatingFilter) => {
			return { name: ageRatingFilter, isChecked: false };
		});
		setAgeRatingFilters(updatedAgeRatingFilters);
	}

	let productCards;
	if (products) {
		// Get all currently checked genre filter items to be used for filtering the products to be rendered
		let checkedGenreFilters;
		const isThereAtleastOneGenreFilterChecked = genreFilters.filter((genreFilter) => genreFilter.isChecked).length === 0;
		if (isThereAtleastOneGenreFilterChecked) {
			// Get all the checked genre filter items
			checkedGenreFilters = genreFilters.map((genreFilter) => genreFilter.name);
		} else {
			// Use all the genre filters if there is currently no checked genre filter
			checkedGenreFilters = genreFilters.filter((genreFilter) => genreFilter.isChecked).map((genreFilter) => genreFilter.name);
		}

		// Filter the products by genre
		const filteredProductsByGenre = products.filter((product) => {
			return product.genre.reduce((acc, curr) => checkedGenreFilters.includes(curr) || acc, false);
		});

		// Get all currently checked age rating filter items to be used for filtering the genre-filtered-products
		let checkedAgeRatingFilters;
		const isThereAtleastOneAgeRatingFilterChecked = ageRatingFilters.filter((ageRatingFilter) => ageRatingFilter.isChecked).length === 0;
		if (isThereAtleastOneAgeRatingFilterChecked) {
			// Get all the checked age rating filter items
			checkedAgeRatingFilters = ageRatingFilters.map((ageRatingFilter) => ageRatingFilter.name);
		} else {
			// Use all the age rating filters if there is currently no checked age rating filter
			checkedAgeRatingFilters = ageRatingFilters
				.filter((ageRatingFilter) => ageRatingFilter.isChecked)
				.map((ageRatingFilter) => ageRatingFilter.name);
		}

		// Filter the genre-filtered-products by age rating
		const filteredProductsByAgeRating = filteredProductsByGenre.filter((product) => checkedAgeRatingFilters.includes(product.esrbRating));

		// Get all currently checked platform filter items to be used for filtering the genre-filtered-products
		let checkedPlatformFilters;
		const isThereAtleastOnePlatformFilterChecked = platformFilters.filter((platformFilter) => platformFilter.isChecked).length === 0;
		if (isThereAtleastOnePlatformFilterChecked) {
			// Get all the checked platform filter items
			checkedPlatformFilters = platformFilters.map((platformFilter) => platformFilter.name);
		} else {
			// Use all the platform filters if there is currently no checked platform filter
			checkedPlatformFilters = platformFilters
				.filter((platformFilter) => platformFilter.isChecked)
				.map((platformFilter) => platformFilter.name);
		}

		// Filter the age-rating-filtered-products by platform
		let filteredProductsByPlatform = filteredProductsByAgeRating.filter((filteredProductByGenre) => {
			return filteredProductByGenre.platforms.reduce((acc, curr) => checkedPlatformFilters.includes(curr) || acc, false);
		});

		// Filter the products by price range if there is a provided price range
		if (priceRangeFilters.min !== null && priceRangeFilters.max !== null) {
			// Both minimum and maximum price was provided
			filteredProductsByPlatform = filteredProductsByPlatform.filter((product) => {
				return product.productPrice >= priceRangeFilters.min && product.productPrice <= priceRangeFilters.max;
			});
		} else if (priceRangeFilters.min !== null && priceRangeFilters.max === null) {
			// Only minimum price was provided
			filteredProductsByPlatform = filteredProductsByPlatform.filter((product) => {
				return product.productPrice >= priceRangeFilters.min;
			});
		} else if (priceRangeFilters.min === null && priceRangeFilters.max !== null) {
			// Only maximum price was provided
			filteredProductsByPlatform = filteredProductsByPlatform.filter((product) => {
				return product.productPrice <= priceRangeFilters.max;
			});
		}

		// Sort the products after filtering
		switch (sortCriteria) {
			case 'Popularity: High to Low':
				filteredProductsByPlatform = filteredProductsByPlatform.sort((productA, productB) => {
					return productB.unitsSold - productA.unitsSold;
				});
				break;
			case 'Popularity: Low to High':
				filteredProductsByPlatform = filteredProductsByPlatform.sort((productA, productB) => {
					return productA.unitsSold - productB.unitsSold;
				});
				break;
			case 'Release Date: Newest First':
				filteredProductsByPlatform = filteredProductsByPlatform.sort((productA, productB) => {
					const productAReleaseDate = productA.releaseDate;
					const productBReleaseDate = productB.releaseDate;
					return productBReleaseDate.localeCompare(productAReleaseDate);
				});
				break;
			case 'Release Date: Oldest First':
				filteredProductsByPlatform = filteredProductsByPlatform.sort((productA, productB) => {
					const productAReleaseDate = productA.releaseDate;
					const productBReleaseDate = productB.releaseDate;
					return productAReleaseDate.localeCompare(productBReleaseDate);
				});
				break;
			case 'Price: Low to High':
				filteredProductsByPlatform = filteredProductsByPlatform.sort((productA, productB) => {
					return productA.productPrice - productB.productPrice;
				});
				break;
			case 'Price: High to Low':
				filteredProductsByPlatform = filteredProductsByPlatform.sort((productA, productB) => {
					return productB.productPrice - productA.productPrice;
				});
				break;
			case 'Name: A to Z':
				filteredProductsByPlatform = filteredProductsByPlatform.sort((productA, productB) => {
					const productAName = productA.productName;
					const productBName = productB.productName;
					return productAName.localeCompare(productBName);
				});
				break;
			case 'Name: Z to A':
				filteredProductsByPlatform = filteredProductsByPlatform.sort((productA, productB) => {
					const productAName = productA.productName;
					const productBName = productB.productName;
					return productBName.localeCompare(productAName);
				});
				break;
			default:
				break;
		}

		productCards = filteredProductsByPlatform.map((product) => {
			if (product)
				return (
					<ProductCard
						key={product.productId}
						imageLink={product.imageLink}
						productName={product.productName}
						productPrice={product.productPrice}
						onAddItemToCart={onAddItemToCart}
						productCartQuantity={product.productCartQuantity}
						productId={product.productId}
					/>
				);
		});
	}

	return (
		<div title="shop">
			<div className="dropdownFiltersContainer">
				<PriceRangeController
					onPriceRangeSet={(range) => {
						setPriceRangeFilters(range);
					}}
				></PriceRangeController>
				{
					// Only render the genre dropdown filter if there are available genre filter
					genreFilters.length > 0 ? (
						<DropdownFilter
							items={genreFilters}
							title="Genre"
							onDropdownItemClick={(clickedItem) => {
								// Save the Unchecked/Checked status of the genre filter item in the 'genreFilters state array
								const updatedGenreFilters = genreFilters.map((genreFilter) =>
									genreFilter.name === clickedItem ? { ...genreFilter, isChecked: !genreFilter.isChecked } : genreFilter
								);
								setGenreFilters(updatedGenreFilters);
							}}
							onClearClick={() => {
								// Save the unchecking of all genre filter items in the 'genreFilters state array
								const updatedGenreFilters = genreFilters.map((genreFilter) => {
									return { ...genreFilter, isChecked: false };
								});
								setGenreFilters(updatedGenreFilters);
							}}
						/>
					) : null
				}
				{
					// Only render the platform dropdown filter if there are available platform filter
					platformFilters.length > 0 ? (
						<DropdownFilter
							items={platformFilters}
							title="Platform"
							onDropdownItemClick={(clickedItem) => {
								// Save the Unchecked/Checked status of the platform filter item in the 'platformFilters state array
								const updatedPlatformFilters = platformFilters.map((platformFilter) =>
									platformFilter.name === clickedItem ? { ...platformFilter, isChecked: !platformFilter.isChecked } : platformFilter
								);
								setPlatformFilters(updatedPlatformFilters);
							}}
							onClearClick={() => {
								// Save the unchecking of all platform filter items in the 'platformFilters state array
								const updatedPlatformFilters = platformFilters.map((platformFilter) => {
									return { ...platformFilter, isChecked: false };
								});
								setPlatformFilters(updatedPlatformFilters);
							}}
						/>
					) : null
				}
				{
					// Only render the age rating dropdown filter if there are available age rating filter
					ageRatingFilters.length > 0 ? (
						<DropdownFilter
							items={ageRatingFilters}
							title="Age Rating"
							onDropdownItemClick={(clickedItem) => {
								// Save the Unchecked/Checked status of the age rating filter item in the 'ageRatingFilters' state array
								const updatedAgeRatingFilters = ageRatingFilters.map((ageRatingFilter) =>
									ageRatingFilter.name === clickedItem
										? { ...ageRatingFilter, isChecked: !ageRatingFilter.isChecked }
										: ageRatingFilter
								);
								setAgeRatingFilters(updatedAgeRatingFilters);
							}}
							onClearClick={() => {
								// Save the unchecking of all age rating filter items in the 'ageRatingFilters' state array
								const updatedAgeRatingFilters = ageRatingFilters.map((ageRatingFilter) => {
									return { ...ageRatingFilter, isChecked: false };
								});
								setAgeRatingFilters(updatedAgeRatingFilters);
							}}
						/>
					) : null
				}
			</div>
			{
				<div className="otherTools">
					<Sorter onSortItemClick={setSortCriteria} />
				</div>
			}
			<div className="productCardsContainer" title="product-cards-container">
				{productCards ? productCards : null}
				{isProductsLoading ? (
					<div className="loading" title="loading">
						Loading...
					</div>
				) : error ? (
					<div className="error" title="error">
						There was an error.
					</div>
				) : null}
			</div>
		</div>
	);
}

Shop.propTypes = {
	products: PropTypes.array.isRequired,
	onAddItemToCart: PropTypes.func,
	loading: PropTypes.bool,
	error: PropTypes.bool,
};

export default Shop;
