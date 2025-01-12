import ProductCard from './ProductCard';
import PropTypes from 'prop-types';
function Shop({ products, error, loading, onAddItemToCart }) {
	let productCards;
	if (products) {
		productCards = products.map((product) => {
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
