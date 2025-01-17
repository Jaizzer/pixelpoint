import PropTypes from 'prop-types';
import { useState } from 'react';

function PriceRangeController({ onPriceRangeSet }) {
	const [isPriceRangeDropdownVisible, setIsPriceRangeDropdownVisible] = useState(false);
	const [priceRange, setPriceRange] = useState({ min: '', max: '' });
	return (
		<div className="priceRangeController">
			<button
				className="priceRangeControllerTitle"
				onClick={() => {
					setIsPriceRangeDropdownVisible(!isPriceRangeDropdownVisible);
				}}
			>
				Price
			</button>
			{isPriceRangeDropdownVisible ? (
				<div className="priceRangeControllerDropdown" title="price-range-controller-dropdown">
					<div className="minimumPriceController">
						<label htmlFor="minimumPrice">Min</label>
						<input
							type="number"
							min={1}
							id="minimumPrice"
							value={priceRange.min}
							onChange={(e) => {
								const newMinValue = e.target.value;
								setPriceRange({ ...priceRange, min: newMinValue === '' ? '' : parseInt(newMinValue) });
								// Only return the range to the parent component if both min and max have values
								if (newMinValue !== '' && priceRange.max !== '') {
									onPriceRangeSet({ ...priceRange, min: parseInt(newMinValue) });
								}
							}}
						/>
					</div>
					<div className="maximumPriceController">
						<label htmlFor="maximumPrice">Max</label>
						<input
							type="number"
							min={1}
							id="maximumPrice"
							value={priceRange.max}
							onChange={(e) => {
								const newMaxValue = e.target.value;
								setPriceRange({ ...priceRange, max: newMaxValue === '' ? '' : parseInt(newMaxValue) });
								// Only return the range to the parent component if both min and max have values
								if (newMaxValue !== '' && priceRange.min !== '') {
									onPriceRangeSet({ ...priceRange, max: parseInt(newMaxValue) });
								}
							}}
						/>
					</div>
				</div>
			) : null}
		</div>
	);
}

PriceRangeController.propTypes = {
	onPriceRangeSet: PropTypes.func,
};

export default PriceRangeController;
