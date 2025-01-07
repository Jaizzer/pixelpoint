import { useState } from 'react';

export default function AddToCartButton() {
	const [inputValue, setInputValue] = useState(0);

	if (inputValue === 0) {
		return (
			<button
				role="button"
				onClick={() => {
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
				<input type="number" min={0} value={inputValue} role="input" />
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
