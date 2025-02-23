import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import DropdownIcon from './DropdownIcon.jsx';

const breakPoint = 1700;

const DropdownFilterContainer = styled.div`
	display: grid;
	grid-template-rows: 1fr;

	padding-left: 1.5em;
	padding-right: 1.5em;
	border-radius: 0.5em;

	overflow: hidden;

	background-color: #1b1e22;

	@media (max-width: ${breakPoint}px) {
		padding: 0;
	}

	@media (max-width: ${breakPoint}px) {
		border: 1px solid ${(props) => (props.isexpanded ? '#067f97' : '#1b1e22')};
	}
`;

const PopOver = styled.div`
	overflow: hidden;

	display: grid;
	grid-template-rows: 1fr auto;
	gap: 0.75em;

	padding-bottom: 2em;

	border-top-left-radius: 0;
	border-top-right-radius: 0;

	align-content: space-around;
	background-color: transparent;

	@media (max-width: ${breakPoint}px) {
		position: absolute;
		left: 0px;
		right: 0px;
		top: 100%;
		max-height: 300px;
		z-index: 1;
		background-color: #1b1e22;
		padding: 2em;
		border-bottom-left-radius: 0.5em;
		border-bottom-right-radius: 0.5em;
	}

	@media (max-width: 580px) {
		font-size: 0.7em;
	}

	@media (max-width: 430px) {
		gap: 1.2em;
		padding-bottom: 1.5em;
		font-size: 0.55em;
	}
`;

const DropdownButton = styled.button`
	width: 100%;
	height: 100%;

	border: 0px;
	padding-top: 1em;
	padding-bottom: 1em;

	display: flex;
	gap: 1em;
	justify-content: space-between;
	align-items: center;

	text-align: justify;
	font-weight: 600;
	color: white;
	font-size: 1.1em;

	background-color: transparent;

	& > div:nth-child(1) {
		margin-right: auto;
	}

	@media (max-width: ${breakPoint}px) {
		font-size: 0.7em;
		padding: 0.5em;

		& .inputIndicator {
			font-size: 0.8em;
		}
	}

	@media (max-width: 430px) {
		font-size: 0.6em;
	}

	& .inputIndicator {
		background-color: #067f97;
		width: 1em;
		height: 1em;
		border-radius: 1em;
		padding: 0.8em;
		font-size: 0.8em;
		display: grid;
		justify-content: center;
		align-content: center;
	}
`;

const PopOverItem = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	gap: 1em;

	color: white;

	label {
		width: 30px;
	}
`;

const Input = styled.input`
	padding: 0.1em 0.2em;
	overflow: scroll;
	border: 0.1em solid white;
	border-radius: 0.3em;
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

function PriceRangeController({ onPriceRangeSet, isExpanded, onDropdownButtonClick }) {
	const [priceRange, setPriceRange] = useState({ min: '', max: '' });

	return (
		<DropdownFilterContainer isexpanded={isExpanded}>
			<DropdownButton
				className="priceRangeControllerTitle"
				onClick={() => {
					onDropdownButtonClick();
				}}
			>
				<div>Price</div>
				{priceRange.min !== '' || priceRange.max !== '' ? (
					<div className="inputIndicator" title="input-filter-indicator">
						1
					</div>
				) : null}
				<DropdownIcon isDropdownCollapsed={!isExpanded} />
			</DropdownButton>
			{isExpanded ? (
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
	isExpanded: PropTypes.bool,
	onDropdownButtonClick: PropTypes.func,
};

export default PriceRangeController;
