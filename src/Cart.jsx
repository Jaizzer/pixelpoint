import PropTypes from 'prop-types';
import CartContentCard from './CartContentCard';

function Cart({ content, clearCart, removeItem }) {
	let cartContentCards = [];
	let totalPrice = 0;
	if (content) {
		// Create the cart content cards
		cartContentCards = content.map((item) => {
			return (
				<CartContentCard
					key={item.id}
					id={item.id}
					title={item.title}
					price={item.price}
					rating={item.rating}
					image={item.screenshots[0]}
					removeItem={() => removeItem(item.id)}
				/>
			);
		});
		// Calculate the total price
		totalPrice =
			Math.ceil(
				content.reduce((previous, current) => {
					return previous + current.price;
				}, 0) * 100
			) / 100;
	}
	return (
		<div title="cart">
			<div className="cartContentsContainer">{cartContentCards}</div>
			<button title="clear-cart" className="clearCartButton" onClick={clearCart}>
				Clear
			</button>
			{content && content.length > 0 && <div className="totalPrice">Total Price: ${totalPrice.toFixed(2)} </div>}
		</div>
	);
}

Cart.propTypes = {
	content: PropTypes.array,
	clearCart: PropTypes.func,
	removeItem: PropTypes.func,
};

export default Cart;
