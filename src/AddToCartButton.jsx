import { useState } from 'react';
import PropTypes from 'prop-types';

function AddToCartButton({ onAddItemToCart }) {
	const [isClicked, setIsClicked] = useState(false);
	return (
		<>
			{isClicked ? (
				<div className="productAdditionIndicator">Added ✓</div>
			) : (
				<button
					className="addToCart"
					onClick={() => {
						onAddItemToCart();
						setIsClicked(true);
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
};

export default AddToCartButton;
