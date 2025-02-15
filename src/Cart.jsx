import PropTypes from 'prop-types';
import CartContentCard from './CartContentCard';
import { Link } from 'react-router-dom';

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
					image={item.images[0]}
					parentPlatforms={item.parentPlatforms}
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
			<h1>Cart</h1>
			<h2>{content.length > 1 ? `${content.length} items` : content.length === 1 ? `${content.length} item` : 'Your cart is empty.'}</h2>
			<div className="cartContentsContainer">{cartContentCards}</div>

			{content && content.length > 0 && (
				<button title="clear-cart" className="clearCartButton" onClick={clearCart}>
					Clear Cart
				</button>
			)}
			<Link to="/shop">
				<div>← Continue Shopping</div>
			</Link>

			<div className="orderSummaryContainer">
				<h2>Order Summary</h2>
				<div className="itemCount">{'Items: ' + content.length}</div>
				<div className="totalPrice"> ${content && content.length > 0 ? totalPrice.toFixed(2) : 0} </div>
				<div className="promo-code-field">
					<h3>PROMO CODE</h3>
					<input type="text" placeholder="Enter your code" />
					<button>Apply</button>
				</div>
				<div className="total-cost-field">
					<h3>TOTAL COST</h3>
					<div className="totalCost"> ${content && content.length > 0 ? totalPrice.toFixed(2) : 0} </div>
				</div>
			</div>
			<a href="https://store.steampowered.com/">
				<button className="checkout" disabled={content.length === 0}>
					CHECKOUT
				</button>
			</a>
		</div>
	);
}

Cart.propTypes = {
	content: PropTypes.array,
	clearCart: PropTypes.func,
	removeItem: PropTypes.func,
};

export default Cart;
