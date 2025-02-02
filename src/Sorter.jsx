import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DropdownIcon from './DropDownIcon';

const SorterContainer = styled.div`
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

const SortButton = styled.button`
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

function Sorter({ onSortItemClick }) {
	const [isEverySortOptionVisible, setIsEverySortOptionVisible] = useState(false);
	const [selectedSortOption, setSelectedSortOption] = useState(null);

	// Create the sort option items to be put in DOM
	const sortOptions = [
		'Popularity: High to Low',
		'Popularity: Low to High',
		'Release Date: Newest First',
		'Release Date: Oldest First',
		'Name: A to Z',
		'Name: Z to A',
		'Price: Low to High',
		'Price: High to Low',
	];
	const sortOptionsDOM = sortOptions.map((sortOption) => {
		return (
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
		);
	});

	return (
		<SorterContainer>
			<SortButton
				onClick={() => {
					setIsEverySortOptionVisible(!isEverySortOptionVisible);
				}}
			>
				Sort
				<DropdownIcon isDropdownCollapsed={!isEverySortOptionVisible} />
			</SortButton>
			{isEverySortOptionVisible && <PopOver>{sortOptionsDOM}</PopOver>}
		</SorterContainer>
	);
}

Sorter.propTypes = {
	onSortItemClick: PropTypes.func,
};

export default Sorter;
