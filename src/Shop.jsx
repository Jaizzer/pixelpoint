import ProductCard from './ProductCard';
import PropTypes from 'prop-types';
function Shop({ products, onAddItemToCart }) {
	const productCards = products.map((product) => {
		return (
			<ProductCard
				key={product.productId}
				imageLink={product.imageLink}
				productName={product.productName}
				productPrice={product.productPrice}
				onAddItemToCart={onAddItemToCart}
				productId={product.productId}
			/>
		);
	});

	return <div title="shop">{productCards}</div>;
}

Shop.propTypes = {
	products: PropTypes.array,
	onAddItemToCart: PropTypes.func,
};

export default Shop;
