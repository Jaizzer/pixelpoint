import { useState } from 'react';
import PropTypes from 'prop-types';

function AddToCartButton({ onAddItemToCart, isGameAdded }) {
	const [isAddToCartClicked, setIsAddToCartClicked] = useState(isGameAdded);
	return (
		<>
			{isAddToCartClicked ? (
				<div className="productAdditionIndicator">Added ✓</div>
			) : (
				<button
					className="addToCart"
					onClick={() => {
						onAddItemToCart();
						setIsAddToCartClicked(true);
					}}
				>
					Add To Cart +
				</button>
			)}
		</>
	);
}

AddToCartButton.propTypes = {
	onAddItemToCart: PropTypes.func,
	isGameAdded: PropTypes.bool,
};

export default AddToCartButton;
