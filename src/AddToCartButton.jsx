import { useState } from 'react';
import PropTypes from 'prop-types';

function AddToCartButton({ onAddItemToCart, isProductAdded }) {
	const [isAddToCartClicked, setIsAddToCartClicked] = useState(isProductAdded);
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
	isProductAdded: PropTypes.bool,
};

export default AddToCartButton;
