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
	border: 1px solid #1b1e22;

	@media (max-width: ${breakPoint}px) {
		padding: 0;
	}

	@media (max-width: ${breakPoint}px) {
		border: ${(props) => (props.isexpanded ? '1px' : '0px')} solid #067f97;
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

	@media (max-width: 430px) {
		gap: 2em;
		padding-bottom: 1.5em;
		font-size: 0.55em;
	}
`;

const FilterItemsContainer = styled.div`
	display: grid;
	gap: 0.5em;

	overflow: auto;
	@media (max-width: ${breakPoint}px) {
		grid-template-columns: repeat(auto-fit, clamp(80px, 30%, 200px));
		gap: 0.5em;
		overflow: auto;
	}
`;

const FilterButton = styled.button`
	width: 100%;
	height: 100%;

	border: 0px;
	padding-top: 1em;
	padding-bottom: 1em;

	display: flex;
	gap: 1em;
	justify-content: end;
	align-items: center;

	& > div:nth-child(1) {
		margin-right: auto;
	}

	& .checkedFilterCount {
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

	text-align: justify;
	font-weight: 600;
	color: white;
	font-size: 1.1em;

	background-color: transparent;

	@media (max-width: ${breakPoint}px) {
		font-size: 0.7em;
		padding: 0.5em;

		& .checkedFilterCount {
			font-size: 0.3em;
		}
	}

	@media (max-width: 430px) {
		font-size: 0.6em;
	}
`;

const CheckboxContainer = styled.div`
	flex-grow: 1;

	display: grid;
	grid-template-columns: auto 1fr;
	align-items: center;
	gap: 0.6em;

	// Ensure the checkbox border and the label always has the same color
	--color: #858585;
`;

const Checkbox = styled.input`
	-webkit-appearance: none;
	appearance: none;
	// Align the checkbox with the label
	transform: translateY(-0.075em);

	// Set the size of the checkbox base on the font size of the parent element
	font: inherit;
	width: 1.15em;
	height: 1.15em;

	border: 1.5px solid var(--color);
	border-radius: 0.15em;
	background-color: transparent;

	// Center the pseudo element that will replace the original checkbox checkmark
	display: grid;
	place-content: center;

	&::before {
		// Replace the original checkbox checkmark with pseudo element

		// Create a square
		content: '';
		width: 0.65em;
		height: 0.65em;
		background-color: #099ea6;

		// Clip the square to make a check
		clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);

		// Only show the check when the dropdown is clicked
		transform: scale(0);
	}

	&:checked::before {
		// Show the created checkmark
		transform: scale(1);
	}
`;

const Label = styled.label`
	font: inherit;
	color: var(--color);
`;

const FilterActions = styled.div`
	display: flex;
	justify-content: space-between;

	color: white;
`;

function DropdownFilter({ items, title, onDropdownItemClick, numberOfShowLessItems, onClearClick, onDropdownButtonClick, isExpanded = false }) {
	// State variable that determines whether the dropdown is in 'Show less' or 'Show more' mode
	const [isEveryDropdownItemsVisible, setIsEveryDropdownItemsVisible] = useState(false);

	// Create the dropdown items
	let dropdownItems = [];
	if (isEveryDropdownItemsVisible || !numberOfShowLessItems || numberOfShowLessItems >= items.length) {
		/* Render all dropdown items if the dropdown is in 'Show more' mode or if there is no numberOfShowLessItems provided  
        or if the numberOfShowLessItems is greater than the original number of items (which is impossible) */
		dropdownItems = items.map((item) => {
			return (
				<DropdownItem
					key={`${item.name}-${item.isChecked}`}
					item={item}
					isCheckedInitialValue={item.isChecked}
					onDropdownItemClick={onDropdownItemClick}
				/>
			);
		});
	} else {
		// Limit the number of dropdown items to 'numberOfShowLessItems' if 'numberOfShowLessItems' was provided
		for (let index = 0; index < numberOfShowLessItems; index++) {
			let item = items[index];
			dropdownItems.push(
				<DropdownItem
					key={`${item.name}-${item.isChecked}`}
					item={item}
					isCheckedInitialValue={item.isChecked}
					onDropdownItemClick={onDropdownItemClick}
				/>
			);
		}
	}

	return (
		<DropdownFilterContainer isexpanded={isExpanded}>
			<FilterButton
				className="filterButton"
				onClick={() => {
					// Switch back to 'Show less' mode when expanding or collapsing the dropdown
					setIsEveryDropdownItemsVisible(false);
					onDropdownButtonClick();
				}}
			>
				<div className="dropdownTitle">{title}</div>
				{items.filter((item) => item.isChecked).length > 0 && (
					<div className="checkedFilterCount" title="checked-filter-count-indicator">
						{items.filter((item) => item.isChecked).length}
					</div>
				)}
				<DropdownIcon isDropdownCollapsed={!isExpanded} />
			</FilterButton>
			{isExpanded && (
				<PopOver>
					<FilterItemsContainer>{dropdownItems}</FilterItemsContainer>
					<FilterActions>
						{
							// Only show 'Show less' or 'Show more' button if there is a provided number of items to be shown in 'Show less' mode
							items.length > numberOfShowLessItems ? (
								<div
									className="expand-collapse-toggler"
									onClick={() => {
										setIsEveryDropdownItemsVisible(!isEveryDropdownItemsVisible);
									}}
								>
									{isEveryDropdownItemsVisible ? 'Show less' : 'Show more'}
								</div>
							) : null
						}
						<div className="clear" onClick={onClearClick}>
							Clear
						</div>
					</FilterActions>
				</PopOver>
			)}
		</DropdownFilterContainer>
	);
}

function DropdownItem({ item, isCheckedInitialValue, onDropdownItemClick }) {
	const [isChecked, setIsChecked] = useState(isCheckedInitialValue);
	return (
		<CheckboxContainer>
			<Checkbox
				type="checkbox"
				id={item.name}
				name={item.name}
				checked={isChecked || false}
				onChange={() => {
					setIsChecked(!isChecked);
					onDropdownItemClick(item);
				}}
			></Checkbox>
			<Label htmlFor={item.name}>{item.name}</Label>
		</CheckboxContainer>
	);
}

DropdownItem.propTypes = {
	item: PropTypes.object,
	isCheckedInitialValue: PropTypes.bool,
	onDropdownItemClick: PropTypes.func,
};

DropdownFilter.propTypes = {
	items: PropTypes.array,
	title: PropTypes.string,
	onDropdownItemClick: PropTypes.func,
	onDropdownButtonClick: PropTypes.func,
	onClearClick: PropTypes.func,
	numberOfShowLessItems: PropTypes.number,
	isExpanded: PropTypes.bool,
};

export default DropdownFilter;
