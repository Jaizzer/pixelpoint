import PropTypes from 'prop-types';
import CartContentCard from './CartContentCard.jsx';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ConfirmationMessage from './ConfirmationMessage.jsx';

function Cart({ content, clearCart, removeItem }) {
	let cartContentCards = [];
	const [itemToRemove, setItemToRemove] = useState(null);
	const [isClearCartConfirmationVisible, setIsClearCartConfirmationVisible] = useState(false);

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
					removeItem={() => {
						setItemToRemove(item);
						// Replace clear cart confirmation message with individual item removal confirmation
						setIsClearCartConfirmationVisible(false);
					}}
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
			{itemToRemove && (
				<ConfirmationMessage
					message={`Are you sure you want to remove "${itemToRemove.title}" from your cart?`}
					onClickYes={() => {
						removeItem(itemToRemove.id);
						// Reset the item to remove state to hide the confirmation message
						setItemToRemove(null);
					}}
					onClickCancel={() => {
						// Reset the item to remove state to hide the confirmation message
						setItemToRemove(null);
					}}
				/>
			)}

			{isClearCartConfirmationVisible && (
				<ConfirmationMessage
					message={`Are you sure you want to remove all items from your cart?`}
					onClickYes={() => {
						clearCart();
						// Hide the Clear Cart confirmation message
						setIsClearCartConfirmationVisible(false);
					}}
					onClickCancel={() => {
						// Hide the Clear Cart confirmation message
						setIsClearCartConfirmationVisible(false);
					}}
				/>
			)}
			<h1>Cart</h1>
			<h2>{content.length > 1 ? `${content.length} items` : content.length === 1 ? `${content.length} item` : 'Your cart is empty.'}</h2>
			<div className="cartContentsContainer">{cartContentCards}</div>
			{/* Hide clear cart if the individual item removal confirmation is visible, that is, if itemToRemove has a value */}
			{content && content.length > 0 && !isClearCartConfirmationVisible && !itemToRemove && (
				<button
					title="clear-cart"
					className="clearCartButton"
					onClick={() => {
						setIsClearCartConfirmationVisible(true);
					}}
				>
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
