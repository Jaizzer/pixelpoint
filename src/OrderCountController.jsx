import { useState } from 'react';
import PropTypes from 'prop-types';

function AddToCartButton({ onAddItemToCart, productCartQuantity }) {
	const [inputValue, setInputValue] = useState(productCartQuantity || 0);

	if (inputValue === 0) {
		return (
			<button
				role="button"
				onClick={() => {
					// Initialize the product quantity to 1 when the item is added to the cart for the first time
					setInputValue(1);
					onAddItemToCart(1);
				}}
			>
				Add to Cart
			</button>
		);
	} else {
		return (
			<div>
				<button
					className="subtract"
					onClick={() => {
						if (inputValue > 0) {
							// Decrement the product quantity of the corresponding item that was added in the cart
							setInputValue((current) => current - 1);
							onAddItemToCart(parseInt(inputValue) - 1);
						}
					}}
				>
					-
				</button>
				<input
					type="number"
					min={0}
					value={inputValue}
					role="input"
					onInput={(e) => {
						setInputValue(e.target.value);
						onAddItemToCart(parseInt(e.target.value) || 0);
					}}
				/>
				<button
					className="add"
					onClick={() => {
						// Increment the product quantity of the corresponding item that was added in the cart
						setInputValue((current) => current + 1);
						onAddItemToCart(parseInt(inputValue) + 1);
					}}
				>
					+
				</button>
			</div>
		);
	}
}

AddToCartButton.propTypes = {
	onAddItemToCart: PropTypes.func,
	productCartQuantity: PropTypes.number,
};

export default AddToCartButton;
