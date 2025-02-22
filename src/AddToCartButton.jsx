import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSvg = styled.svg`
	width: 1.75em;
	height: 1.75em;
`;

const Container = styled.div`
	width: auto;
	height: auto;
	text-align: center;
	padding: 0.6em;
	font-size: 0.8em;
	background-color: #0ba9c2;
	color: white;
`;

const StyledButton = styled.button`
	background-color: transparent;
	color: white;
	border: 0px;
`;

function AddToCartButton({ onAddItemToCart, isGameAdded, className, caption }) {
	const [isAddToCartClicked, setIsAddToCartClicked] = useState(isGameAdded);
	return (
		<Container className={className}>
			{isAddToCartClicked ? (
				<div className="productAdditionIndicator">Added ✓</div>
			) : (
				<StyledButton
					className="addToCart"
					onClick={() => {
						onAddItemToCart();
						setIsAddToCartClicked(true);
					}}
					title="add-to-cart-button"
				>
					{caption ? (
						caption
					) : (
						<StyledSvg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M37.721 30L43.388 13H12.721L10.721 7H5V9H9.279L15.928 28.948L11.461 39H39V37H14.539L17.65 30H37.721ZM40.612 15L36.279 28H17.721L13.388 15H40.612Z"
								fill="white"
							/>
							<path
								d="M20 44C21.1046 44 22 43.1046 22 42C22 40.8954 21.1046 40 20 40C18.8954 40 18 40.8954 18 42C18 43.1046 18.8954 44 20 44Z"
								fill="white"
							/>
							<path
								d="M32 44C33.1046 44 34 43.1046 34 42C34 40.8954 33.1046 40 32 40C30.8954 40 30 40.8954 30 42C30 43.1046 30.8954 44 32 44Z"
								fill="white"
							/>
							<defs>
								<clipPath id="clip0_2_188">
									<rect width="48" height="48" fill="white" />
								</clipPath>
							</defs>
						</StyledSvg>
					)}
				</StyledButton>
			)}
		</Container>
	);
}

AddToCartButton.propTypes = {
	onAddItemToCart: PropTypes.func,
	isGameAdded: PropTypes.bool,
	className: PropTypes.string,
	caption: PropTypes.string,
};

export default AddToCartButton;
