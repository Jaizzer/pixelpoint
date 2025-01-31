import PropTypes from 'prop-types';
import CartContentCard from './CartContentCard';

function Cart({ content, clearCart, removeItem }) {
	let cartContentCards = [];
	if (content) {
		// Create the cart content cards
		cartContentCards = content.map((item) => {
			return (
				<CartContentCard
					key={item.id}
					id={item.id}
					title={item.title}
					price={item.price}
					image={item.screenshots[0]}
					removeItem={() => removeItem(item.id)}
				/>
			);
		});
	}
	return (
		<div title="cart">
			<div className="cartContentsContainer">{cartContentCards}</div>
			<button title="clear-cart" className="clearCartButton" onClick={clearCart}>
				Clear
			</button>
		</div>
	);
}

Cart.propTypes = {
	content: PropTypes.array,
	clearCart: PropTypes.func,
	removeItem: PropTypes.func,
};

export default Cart;
