import ProductCard from './ProductCard';
import PropTypes from 'prop-types';
import DropdownFilter from './DropdownFilter';
import { useEffect, useState } from 'react';

function Shop({ products, error, loading, onAddItemToCart }) {
	const [genreFilters, setGenreFilters] = useState([]);

	useEffect(() => {
		// Collect every possible distinct genres from the products
		if (products) {
			let updatedGenreFilters = [
				...new Set(
					products.map((product) => {
						return product.genre;
					})
				),
			].map((genreFilter) => {
				return { name: genreFilter, isChecked: false };
			});
			setGenreFilters(updatedGenreFilters);
		}
	}, [products]);

	let productCards;
	if (products) {
		// Get all currently checked genre filter items to be used for filtering the products to be rendered
		let checkedGenreFilters;
		const isThereAtleastOneGenreFilterChecked = genreFilters.filter((genreFilter) => genreFilter.isChecked).length === 0;
		if (isThereAtleastOneGenreFilterChecked) {
			// Get all the checked genre filter items
			checkedGenreFilters = genreFilters.map((genreFilter) => genreFilter.name);
		} else {
			// Apply all filters (to render all items) if there is currently no checked genre filter
			checkedGenreFilters = genreFilters.filter((genreFilter) => genreFilter.isChecked).map((genreFilter) => genreFilter.name);
		}

		// Filter the products to be rendered by genre
		const filteredProducts = products.filter((product) => checkedGenreFilters.includes(product.genre));
		productCards = filteredProducts.map((product) => {
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
	);
}

Shop.propTypes = {
	products: PropTypes.array,
	onAddItemToCart: PropTypes.func,
	loading: PropTypes.bool,
	error: PropTypes.bool,
};

export default Shop;
