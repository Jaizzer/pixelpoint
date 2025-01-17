import ProductCard from './ProductCard';
import PropTypes from 'prop-types';
import DropdownFilter from './DropdownFilter';
import { useState } from 'react';
import Sorter from './Sorter';

function Shop({ products, error, loading, onAddItemToCart }) {
	const [genreFilters, setGenreFilters] = useState([]);
	const [platformFilters, setPlatformFilters] = useState([]);
	const [sortCriteria, setSortCriteria] = useState(null);

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

		// Filter the genre-filtered-products by platform
		let filteredProductsByPlatform = filteredProductsByGenre.filter((filteredProductByGenre) => {
			return filteredProductByGenre.platforms.reduce((acc, curr) => checkedPlatformFilters.includes(curr) || acc, false);
		});

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
					// Only render the genre dropdown filter if there are available platform filter
					platformFilters.length > 0 ? (
						<DropdownFilter
							items={platformFilters}
							title="Platform"
							onDropdownItemClick={(clickedItem) => {
								// Save the Unchecked/Checked status of the genre filter item in the 'genreFilters state array
								const updatedPlatformFilters = platformFilters.map((platformFilter) =>
									platformFilter.name === clickedItem ? { ...platformFilter, isChecked: !platformFilter.isChecked } : platformFilter
								);
								setPlatformFilters(updatedPlatformFilters);
							}}
							onClearClick={() => {
								// Save the unchecking of all genre filter items in the 'genreFilters state array
								const updatedPlatformFilters = platformFilters.map((platformFilter) => {
									return { ...platformFilter, isChecked: false };
								});
								setPlatformFilters(updatedPlatformFilters);
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
			<div className="productCardsContainer">
				{loading ? (
					<div className="loading" title="loading">
						Loading...
					</div>
				) : error ? (
					<div className="error" title="error">
						There was an error.
					</div>
				) : (
					productCards
				)}
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
