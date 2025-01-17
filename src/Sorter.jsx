import { useState } from 'react';
import PropTypes from 'prop-types';

function Sorter({ onSortItemClick }) {
	const [isEverySortOptionVisible, setIsEverySortOptionVisible] = useState(false);
	const [selectedSortOption, setSelectedSortOption] = useState(null);

	// Create the sort option items to be put in DOM
	const sortOptions = ['Popularity: High to Low', 'Popularity: Low to High', 'Release Date: Newest First', 'Release Date: Oldest First', 'Name: A to Z', 'Name: Z to A', 'Price: Low to High', 'Price: High to Low'];
	const sortOptionsDOM = sortOptions.map((sortOption) => {
		// Add distinction between selected and non-selected sort option
		const className = sortOption === selectedSortOption ? 'sortOption selected' : 'sortOption';
		return (
			<div
				key={sortOption}
				className={className}
				title="sort-option"
				onClick={(e) => {
					// Set the clicked sort option else unset the clicked sort option if its the currently selected sort option
					let newlySelectedSortOption = e.target.textContent !== selectedSortOption ? e.target.textContent : null;
					onSortItemClick(newlySelectedSortOption);
					setSelectedSortOption(newlySelectedSortOption);
				}}
			>
				{sortOption}
			</div>
		);
	});

	return (
		<div className="sorter">
			<button
				className="sort"
				onClick={() => {
					setIsEverySortOptionVisible(!isEverySortOptionVisible);
				}}
			>
				Sort
			</button>
			{isEverySortOptionVisible && <div className="sortOptions">{sortOptionsDOM}</div>}
		</div>
	);
}

Sorter.propTypes = {
	onSortItemClick: PropTypes.func,
};

export default Sorter;
