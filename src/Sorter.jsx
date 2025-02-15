import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DropdownIcon from './DropdownIcon.jsx';

const SorterContainer = styled.div`
	box-sizing: border-box;
	margin: 0px;

	width: clamp(200px, 80%, 360px);
	padding: 10px 18px;
	border-radius: 10px;
	background-color: #1b1e22;
	position: relative;
`;

const PopOver = styled.div`
	box-sizing: border-box;
	margin: 0px;

	width: 100%;
	border-radius: 0px 0px 10px 10px;

	display: grid;
	gap: 10px;
	align-content: space-around;
	padding: 10px 33px 33px 33px;
	background-color: #1b1e22;
	font-family: 'Poppins';

	position: absolute;
	right: 0;
	z-index: 900;
`;

const SortButton = styled.button`
	box-sizing: border-box;
	margin: 0px;

	width: 100%;
	height: 40px;
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

const SortOption = styled.div`
	box-sizing: border-box;
	margin: 0px;

	display: grid;
	grid-template-columns: auto 1fr;
	align-items: center;
	gap: 10px;
	font-size: 15px;
	color: ${(props) => (props.isClicked ? 'white' : '#858585')};
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

const CurrentlySelectedSortOption = styled.div`
	box-sizing: border-box;
	margin: 0px;

	padding: 3px 10px;
	border-radius: 3px;
	background-color: white;
	font-size: 13px;
	color: #1c1c1c;
`;

const ButtonContent = styled.div`
	box-sizing: border-box;
	margin: 0px;

	display: grid;
	grid-template-rows: auto;
	grid-template-columns: auto 1fr;
	gap: 10px;
	align-items: center;
`;

function Sorter({ onSortItemClick, numberOfShowLessItems }) {
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const [selectedSortOption, setSelectedSortOption] = useState(null);
	const [isEverySortItemsVisible, setIsEverySortItemsVisible] = useState(false);

	// Create the sort option items to be put in DOM
	const sortOptions = [
		'Popularity: High to Low',
		'Release Date: Newest First',
		'Price: Low to High',
		'Price: High to Low',
		'Popularity: Low to High',
		'Release Date: Oldest First',
		'Name: A to Z',
		'Name: Z to A',
	];

	let sortOptionsDOM = [];
	if (isEverySortItemsVisible || !numberOfShowLessItems || numberOfShowLessItems >= sortOptions.length) {
		/* Render all dropdown items if the dropdown is in 'Show more' mode or if there is no numberOfShowLessItems provided  
        or if the numberOfShowLessItems is greater than the original number of sort options (which is impossible) */
		sortOptionsDOM = sortOptions.map((sortOption) => (
			<SortOption
				key={sortOption}
				title="sort-option"
				onClick={(e) => {
					// Set the clicked sort option else unset the clicked sort option if its the currently selected sort option
					let newlySelectedSortOption = e.target.textContent !== selectedSortOption ? e.target.textContent : null;
					onSortItemClick(newlySelectedSortOption);
					setSelectedSortOption(newlySelectedSortOption);
				}}
				isClicked={sortOption === selectedSortOption}
			>
				{sortOption}
			</SortOption>
		));
	} else {
		// Limit the number of dropdown items to 'numberOfShowLessItems' if 'numberOfShowLessItems' was provided
		for (let index = 0; index < numberOfShowLessItems; index++) {
			let item = sortOptions[index];
			sortOptionsDOM.push(
				<SortOption
					key={item}
					title="sort-option"
					onClick={(e) => {
						// Set the clicked sort option else unset the clicked sort option if its the currently selected sort option
						let newlySelectedSortOption = e.target.textContent !== selectedSortOption ? e.target.textContent : null;
						onSortItemClick(newlySelectedSortOption);
						setSelectedSortOption(newlySelectedSortOption);
					}}
					isClicked={item === selectedSortOption}
				>
					{item}
				</SortOption>
			);
		}
	}

	return (
		<SorterContainer>
			<SortButton
				onClick={() => {
					setIsDropdownVisible(!isDropdownVisible);
				}}
			>
				<SortButtonContent selectedSortOption={selectedSortOption} />
				<DropdownIcon isDropdownCollapsed={!isDropdownVisible} />
			</SortButton>
			{isDropdownVisible && (
				<PopOver>
					{sortOptionsDOM}
					<FilterActions>
						<div
							onClick={() => {
								setIsEverySortItemsVisible(!isEverySortItemsVisible);
							}}
						>
							{isEverySortItemsVisible ? 'Show less' : 'Show more'}
						</div>
						<div
							className="clear"
							onClick={() => {
								// Unset the currently selected sort option
								onSortItemClick(null);
								setSelectedSortOption(null);
							}}
						>
							Clear
						</div>
					</FilterActions>
				</PopOver>
			)}
		</SorterContainer>
	);
}

function SortButtonContent({ selectedSortOption }) {
	return (
		<ButtonContent>
			Sort by {selectedSortOption ? <CurrentlySelectedSortOption>{selectedSortOption}</CurrentlySelectedSortOption> : null}
		</ButtonContent>
	);
}
SortButtonContent.propTypes = {
	selectedSortOption: PropTypes.string,
};

Sorter.propTypes = {
	onSortItemClick: PropTypes.func,
	numberOfShowLessItems: PropTypes.number,
};

export default Sorter;
