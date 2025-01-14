import PropTypes from 'prop-types';
import { useState } from 'react';

function DropdownFilter({ items, title, onDropdownItemClick, numberOfShowLessItems, onClearClick }) {
	try {
		// Throw error if the number of items that should be visible when the dropdown is 'showing less' is greater than or equal the number of items itself
		if (items.length <= numberOfShowLessItems) {
			throw new Error('The "numberOfShowLessItems" should be less than "items.length"');
		}

		// State variable that determines whether the dropdown is expanded or collapsed
		const [isDropdownVisible, setIsDropdownVisible] = useState(false);

		// State variable that determines whether the dropdown is in 'Show less' or 'Show more' mode
		const [isEveryDropdownItemsVisible, setIsEveryDropdownItemsVisible] = useState(false);

		// Create the dropdown items
		let dropdownItems = [];
		if (isEveryDropdownItemsVisible || !numberOfShowLessItems) {
			// Render all dropdown items since there is no 'Show less' or 'Show more' button
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
			<div className="dropdownFilter">
				<button
					className="filterButton"
					onClick={() => {
						// Switch back to 'Show less' mode when expanding or collapsing the dropdown
						setIsEveryDropdownItemsVisible(false);
						setIsDropdownVisible(!isDropdownVisible);
					}}
				>
					{title}
				</button>
				{isDropdownVisible && (
					<div className="dropdown">
						{dropdownItems}
						<div className="filterActions">
							{
								// Only show 'Show less' or 'Show more' button if there is a provided number of items to be shown in 'Show less' mode
								numberOfShowLessItems ? (
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
						</div>
					</div>
				)}
			</div>
		);
	} catch (error) {
		throw new Error(error);
	}
}

function DropdownItem({ name, isCheckedInitialValue, onDropdownItemClick }) {
	const [isChecked, setIsChecked] = useState(isCheckedInitialValue);
	return (
		<div key={name} className="dropdownItem">
			<input
				type="checkbox"
				id={name}
				name={name}
				checked={isChecked || false}
				onChange={() => {
					setIsChecked(!isChecked);
					onDropdownItemClick(name);
				}}
			/>
			<label htmlFor={name}>{name}</label>
		</div>
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
