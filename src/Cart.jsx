import ProductCard from './ProductCard';
import PropTypes from 'prop-types';

function Cart({ products, onAddItemToCart }) {
	const productCards = products.map((product) => {
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

	return <div title="cart">{productCards}</div>;
}

Cart.propTypes = {
	products: PropTypes.array,
	onAddItemToCart: PropTypes.func,
};

export default Cart;
