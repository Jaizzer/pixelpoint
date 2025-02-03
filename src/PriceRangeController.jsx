import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import DropdownIcon from './DropDownIcon';

const DropdownFilterContainer = styled.div`
	box-sizing: border-box;
	margin: 0px;

	min-width: 245px;
	padding: 10px 18px;
	border-radius: 10px;
	background-color: #1b1e22;
`;

const PopOver = styled.div`
	box-sizing: border-box;
	margin: 0px;

	display: grid;
	gap: 10px;
	align-content: space-around;
	padding: 15px;
	background-color: transparent;
	font-family: 'Poppins';
`;

const DropdownButton = styled.button`
	box-sizing: border-box;
	margin: 0px;

	width: 100%;
	padding: 5px 15px;
	border-radius: 10px;
	border: 0px;

	display: flex;
	justify-content: space-between;
	align-items: center;

	background-color: transparent;
	font-size: 16px;
	font-weight: 600;
	text-align: justify;
	color: white;
`;

const PopOverItem = styled.div`
	box-sizing: border-box;
	margin: 0px;

	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 10px;
	font-size: 14px;
	color: white;
`;

const Input = styled.input`
	box-sizing: border-box;
	margin: 0px;

	width: 120px;
	padding: 2px 10px;
	overflow: scroll;
	border: 3px solid white;
	border-radius: 5px;
	outline: none;
	font: inherit;

	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	&:focus {
		border-color: #099ea6;
	}
`;

function PriceRangeController({ onPriceRangeSet }) {
	const [isPriceRangeDropdownVisible, setIsPriceRangeDropdownVisible] = useState(false);
	const [priceRange, setPriceRange] = useState({ min: '', max: '' });
	return (
		<DropdownFilterContainer>
			<DropdownButton
				className="priceRangeControllerTitle"
				onClick={() => {
					setIsPriceRangeDropdownVisible(!isPriceRangeDropdownVisible);
				}}
			>
				Price
				<DropdownIcon isDropdownCollapsed={!isPriceRangeDropdownVisible} />
			</DropdownButton>
			{isPriceRangeDropdownVisible ? (
				<PopOver title="price-range-controller-dropdown">
					<PopOverItem>
						<label htmlFor="minimumPrice">Min</label>
						<Input
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
					</PopOverItem>
					<PopOverItem>
						<label htmlFor="maximumPrice">Max</label>
						<Input
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
					</PopOverItem>
				</PopOver>
			) : null}
		</DropdownFilterContainer>
	);
}

PriceRangeController.propTypes = {
	onPriceRangeSet: PropTypes.func,
};

export default PriceRangeController;
