import { useState } from 'react';
import PropTypes from 'prop-types';

function AddToCartButton({ onAddItemToCart }) {
	const [inputValue, setInputValue] = useState(0);

	if (inputValue === 0) {
		return (
			<button
				role="button"
				onClick={() => {
					onAddItemToCart();
					setInputValue((current) => current + 1);
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
							setInputValue((current) => current - 1);
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
					onChange={(e) => {
						setInputValue(e.target.value);
					}}
				/>
				<button
					className="add"
					onClick={() => {
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
};

export default AddToCartButton;
