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

const FilterButton = styled.button`
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

const CheckboxContainer = styled.div`
	box-sizing: border-box;
	margin: 0px;

	display: grid;
	grid-template-columns: auto 1fr;
	align-items: center;
	gap: 10px;
	font-size: 15px;

	// Ensure the checkbox border and the label always has the same color
	--color: #858585;
`;

const Checkbox = styled.input`
	box-sizing: border-box;
	margin: 0px;

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
	box-sizing: border-box;
	margin: 0px;

	font: inherit;
	color: var(--color);
`;

const FilterActions = styled.div`
	box-sizing: border-box;
	margin: 0px;

	display: flex;
	justify-content: space-between;
	padding-top: 15px;
	font-size: 13px;
	color: white;
`;

function DropdownFilter({ items, title, onDropdownItemClick, numberOfShowLessItems, onClearClick }) {
	// State variable that determines whether the dropdown is expanded or collapsed
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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
					name={item.name}
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
					name={item.name}
					isCheckedInitialValue={item.isChecked}
					onDropdownItemClick={onDropdownItemClick}
				/>
			);
		}
	}

	return (
		<DropdownFilterContainer>
			<FilterButton
				className="filterButton"
				onClick={() => {
					// Switch back to 'Show less' mode when expanding or collapsing the dropdown
					setIsEveryDropdownItemsVisible(false);
					setIsDropdownVisible(!isDropdownVisible);
				}}
			>
				{title}
				<DropdownIcon isDropdownCollapsed={!isDropdownVisible} />
			</FilterButton>
			{isDropdownVisible && (
				<PopOver>
					{dropdownItems}
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

function DropdownItem({ name, isCheckedInitialValue, onDropdownItemClick }) {
	const [isChecked, setIsChecked] = useState(isCheckedInitialValue);
	return (
		<CheckboxContainer>
			<Checkbox
				type="checkbox"
				id={name}
				name={name}
				checked={isChecked || false}
				onChange={() => {
					setIsChecked(!isChecked);
					onDropdownItemClick(name);
				}}
			></Checkbox>
			<Label htmlFor={name}>{name}</Label>
		</CheckboxContainer>
	);
}

DropdownItem.propTypes = {
	name: PropTypes.string,
	isCheckedInitialValue: PropTypes.bool,
	onDropdownItemClick: PropTypes.func,
};

DropdownFilter.propTypes = {
	items: PropTypes.array,
	title: PropTypes.string,
	onDropdownItemClick: PropTypes.func,
	onClearClick: PropTypes.func,
	numberOfShowLessItems: PropTypes.number,
};

export default DropdownFilter;
