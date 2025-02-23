import PropTypes from 'prop-types';
import CartContentCard from './CartContentCard.jsx';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ConfirmationMessage from './ConfirmationMessage.jsx';
import styled from 'styled-components';

const Container = styled.div`
	display: grid;
	align-content: start;
	grid-template-columns: 1fr auto;
	justify-content: start;
	gap: 1em;
	align-items: start;

	height: 100%;
	overflow: scroll;
	padding: 1.5em;

	background-color: #34343d;
	color: white;

	& > h1 {
		grid-column: 1 /-1;
		grid-row: 1 / 2;

		font-size: 1.5em;
	}
	& > h2 {
		grid-column: 1 /-1;
		grid-row: 2 / 3;

		font-size: 0.9em;
		font-weight: 500;
	}

	.cartContentsContainer {
		grid-column: 1 / 2;
		grid-row: 4 / 5;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 1em;
	}

	.actions {
		grid-row: 3 / 4;
		grid-column: 1 / 2;
		display: flex;
		justify-content: space-between;
		align-items: center;

		padding: 1em;
		background-color: #2c2c2c;
		border-radius: 0.5em;
	}

	.actions button {
		font-size: 1em;

		border-radius: 0.25em;

		border: 0;
		padding: 0.5em 2em;
		background-color: #0ba9c2;
		color: white;
	}

	@media (max-width: ${932}px) {
		grid-template-columns: 1fr;
		.orderSummaryContainer {
			bottom: 54px;
			left: 0px;
			width: 100%;

			position: fixed;
			background-color: #453e3e;
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 0.5em;
			padding: 0.75em 1.5em;

			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
		}

		.cartContentsContainer {
			padding-bottom: 300px;
		}
	}
`;

const OrderSummary = styled.div`
	grid-column: 2 /3;
	grid-row: 3 / 5;

	display: grid;
	grid-template-columns: auto auto;
	justify-content: space-between;
	gap: 1.25em;

	padding: 2em;
	background-color: #2c2c2c;
	border-radius: 0.5em;
	color: white;

	h2 {
		font-size: 1.25em;
		grid-column: 1/-1;
	}

	.itemCount {
		grid-column: 1 / 2;
		grid-row: 2 / 3;
	}
	.totalPrice {
		grid-column: 2 / 3;
		grid-row: 2 / 3;
		justify-self: end;
	}

	.promoCodeField {
		grid-column: 1/ -1;
		grid-row: 3 /4;
		gap: 0.25em 0em;

		display: grid;
		grid-template-columns: 1fr auto;

		div {
			font-size: 0.9em;
		}

		h3 {
			font-size: 0.9em;
			grid-column: 1 / -1;
			grid-row: 1 / 2;
		}

		input {
			grid-column: 1 / 2;
			grid-row: 2 / 3;

			padding: 0.1em 0.2em;
			padding-left: 1em;
			overflow: scroll;
			border: 0.1em solid white;
			border-top-left-radius: 0.25em;
			border-bottom-left-radius: 0.25em;
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
			outline: none;
			font-size: 0.9em;

			&::-webkit-outer-spin-button,
			&::-webkit-inner-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}

			&:focus {
				border-color: #099ea6;
			}
		}

		button {
			grid-column: 2 / 3;
			grid-row: 2 / 3;
			font-size: 1em;

			border-top-right-radius: 0.25em;
			border-bottom-right-radius: 0.25em;
			font-size: 0.9em;

			border: 0;
			padding: 0.5em 2em;
			background-color: #0ba9c2;
			color: white;

			@media (max-width: ${600}px) {
			}
		}
	}

	.total-cost-field {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: auto auto;
		justify-content: space-between;
		gap: 0.25em;

		div {
			font-size: 0.9em;
		}

		h3 {
			font-size: 0.9em;
			grid-column: 1 / 2;
		}

		div {
			grid-column: 2 / 3;
			justify-self: end;
		}

		a {
			grid-column: 1 / -1;
			grid-row: 2 / 3;
			padding: 0.25em 2em;
			background-color: #0ba9c2;
			text-align: center;
			border-radius: 0.25em;
		}

		button {
			background-color: transparent;
			font-size: 0.8em;
			border: 0;
			color: white;

			@media (max-width: ${600}px) {
			}
		}
	}
`;

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
					ownerCount={item.ownerCount}
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
		<Container title="cart">
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
			<h2>
				{content.length > 1
					? `You have ${content.length} items in your cart`
					: content.length === 1
					? `${content.length} item`
					: 'Your cart is empty.'}
			</h2>
			<div className="cartContentsContainer">{cartContentCards}</div>
			<div className="actions">
				<Link to="/shop">
					<div>← Continue Shopping</div>
				</Link>
				{/* disable clear cart if the individual item removal confirmation is visible, that is, if itemToRemove has a value */}

				<button
					title="clear-cart"
					className="clearCartButton"
					onClick={() => {
						setIsClearCartConfirmationVisible(true);
					}}
					disabled={!(content && content.length > 0 && !isClearCartConfirmationVisible && !itemToRemove)}
				>
					Clear Cart
				</button>
			</div>
			{content.length > 0 && (
				<OrderSummary className="orderSummaryContainer">
					<h2>Order Summary</h2>
					<div className="itemCount">{'Items: ' + content.length}</div>
					<div className="totalPrice"> ${content && content.length > 0 ? totalPrice.toFixed(2) : 0} </div>
					<div className="promoCodeField">
						<h3>Promo Code</h3>
						<input type="text" placeholder="Enter your code" />
						<button>Apply</button>
					</div>
					<div className="total-cost-field">
						<h3>Total</h3>
						<div className="totalCost"> ${content && content.length > 0 ? totalPrice.toFixed(2) : 0} </div>
						<a href="https://store.steampowered.com/">
							<button className="checkout" disabled={content.length === 0}>
								CHECKOUT
							</button>
						</a>
					</div>
				</OrderSummary>
			)}
		</Container>
	);
}

Cart.propTypes = {
	content: PropTypes.array,
	clearCart: PropTypes.func,
	removeItem: PropTypes.func,
};

export default Cart;
