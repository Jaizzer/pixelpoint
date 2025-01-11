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
					onAddItemToCart(1);
					setInputValue(1);
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
						onAddItemToCart(parseInt(e.target.value) || 0);
						setInputValue(e.target.value);
					}}
				/>
				<button
					className="add"
					onClick={() => {
						// Increment the product quantity of the corresponding item that was added in the cart
						onAddItemToCart(parseInt(inputValue) + 1);
						setInputValue((current) => current + 1);
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
