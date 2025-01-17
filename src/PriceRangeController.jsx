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
								const newMinValue = e.target.value === '' ? '' : parseInt(e.target.value);
								setPriceRange({ ...priceRange, min: newMinValue });

								// Convert empty string to null
								const maxValueToBeReturnedToParent = priceRange.max === '' ? null : priceRange.max;
								const minValueToBeReturnedToParent = newMinValue === '' ? null : newMinValue;
								onPriceRangeSet({ min: minValueToBeReturnedToParent, max: maxValueToBeReturnedToParent });
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
								const newMaxValue = e.target.value === '' ? '' : parseInt(e.target.value);
								setPriceRange({ ...priceRange, max: newMaxValue });

								// Convert empty string to null
								const maxValueToBeReturnedToParent = newMaxValue === '' ? null : newMaxValue;
								const minValueToBeReturnedToParent = priceRange.min === '' ? null : priceRange.min;
								onPriceRangeSet({ min: minValueToBeReturnedToParent, max: maxValueToBeReturnedToParent });
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
