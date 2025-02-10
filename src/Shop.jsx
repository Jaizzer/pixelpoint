import PropTypes from 'prop-types';
import DropdownFilter from './DropdownFilter';
import PriceRangeController from './PriceRangeController';
import { useState } from 'react';
import Sorter from './Sorter';
import GamesContainer from './GamesContainer';

function Shop({ games, gamesError, getNewGames }) {
	const [genreFilters, setGenreFilters] = useState([]);
	const [platformFilters, setPlatformFilters] = useState([]);
	const [ageRatingFilters, setAgeRatingFilters] = useState([]);
	const [sortCriteria, setSortCriteria] = useState(null);
	const [priceRangeFilters, setPriceRangeFilters] = useState({ min: null, max: null });
	const isGamesLoaded = games.length > 0;
	const isEveryFiltersUnset = genreFilters.length === 0 && platformFilters.length === 0 && ageRatingFilters.length === 0;

	//  Initialize the genre, platform and age rating filters if they are not set yet
	if (isGamesLoaded && isEveryFiltersUnset) {
		setGenreFilters(initializeFilters(games, 'genres'));
		setPlatformFilters(initializeFilters(games, 'platforms'));
		setAgeRatingFilters(initializeFilters(games, 'esrbRating'));
	}

	let gamesToDisplay = games;
	if (isGamesLoaded) {
		// Filter the games
		gamesToDisplay = filterGamesUsingCheckbox(gamesToDisplay, genreFilters, 'genres');
		gamesToDisplay = filterGamesUsingCheckbox(gamesToDisplay, platformFilters, 'platforms');
		gamesToDisplay = filterGamesUsingCheckbox(gamesToDisplay, ageRatingFilters, 'esrbRating');
		gamesToDisplay = filterGamesByPrice(gamesToDisplay, priceRangeFilters.min, priceRangeFilters.max);
		// Sort the games
		gamesToDisplay = sortGames(gamesToDisplay, sortCriteria);
	}

	return (
		<div title="shop">
			<div className="dropdownFiltersContainer">
				{
					// Render the dropdowns if all filters have been set
					!isEveryFiltersUnset && (
						<>
							<PriceRangeController
								onPriceRangeSet={(range) => {
									setPriceRangeFilters(range);
								}}
							></PriceRangeController>
							<DropdownFilter
								items={genreFilters}
								title="Genre"
								onDropdownItemClick={(clickedItem) => {
									checkOrUncheckItem(clickedItem, setGenreFilters);
								}}
								onClearClick={() => {
									clearDropdown(setGenreFilters);
								}}
								numberOfShowLessItems={7}
							/>
							<DropdownFilter
								items={platformFilters}
								title="Platform"
								onDropdownItemClick={(clickedItem) => {
									checkOrUncheckItem(clickedItem, setPlatformFilters);
								}}
								onClearClick={() => {
									clearDropdown(setPlatformFilters);
								}}
								numberOfShowLessItems={7}
							/>
							<DropdownFilter
								items={ageRatingFilters}
								title="Age Rating"
								onDropdownItemClick={(clickedItem) => {
									checkOrUncheckItem(clickedItem, setAgeRatingFilters);
								}}
								onClearClick={() => {
									clearDropdown(setAgeRatingFilters);
								}}
							/>
						</>
					)
				}
			</div>
			{<div className="otherTools">{!isEveryFiltersUnset && <Sorter onSortItemClick={setSortCriteria} numberOfShowLessItems={3} />}</div>}
			<GamesContainer games={gamesToDisplay} gamesError={gamesError} fetchNewGamesOnBottomScroll={getNewGames} />
		</div>
	);
}

function clearDropdown(setFilters) {
	// Clear all dropdown checks
	setFilters((prevFilters) =>
		prevFilters.map((filter) => {
			return { ...filter, isChecked: false };
		})
	);
}

function checkOrUncheckItem(clickedDropdownItem, setFilters) {
	// Save the Unchecked/Checked status of the clicked filter item
	setFilters((prevFilters) =>
		prevFilters.map((filter) => (filter.title === clickedDropdownItem ? { ...filter, isChecked: !filter.isChecked } : filter))
	);
}

function initializeFilters(games, property) {
	// Get all distinct values for a given game property
	const filters = [
		...new Set(
			games
				.map((game) => {
					return game[property];
				})
				.flat()
		),
	].map((filter) => {
		return { title: filter, isChecked: false };
	});
	return filters;
}

function filterGamesUsingCheckbox(games, checkboxFilter, property) {
	let checkedFilters;
	const isThereAtleastOneFilterChecked = checkboxFilter.filter((filter) => filter.isChecked).length === 0;
	if (isThereAtleastOneFilterChecked) {
		// Get all the checked filter items
		checkedFilters = checkboxFilter.map((filter) => filter.title);
	} else {
		// Use all the filters if there is currently no checked filter
		checkedFilters = checkboxFilter.filter((filter) => filter.isChecked).map((filter) => filter.title);
	}

	// Filter the games
	return games.filter((game) => {
		return game[property].reduce((acc, curr) => checkedFilters.includes(curr) || acc, false);
	});
}

function sortGames(games, sortCriteria) {
	let sortedGames = games;
	switch (sortCriteria) {
		case 'Popularity: High to Low':
			sortedGames = sortedGames.sort((gameA, gameB) => {
				return gameB.unitsSold - gameA.unitsSold;
			});
			break;
		case 'Popularity: Low to High':
			sortedGames = sortedGames.sort((gameA, gameB) => {
				return gameA.unitsSold - gameB.unitsSold;
			});
			break;
		case 'Release Date: Newest First':
			sortedGames = sortedGames.sort((gameA, gameB) => {
				const gameAReleaseDate = gameA.releaseDate;
				const gameBReleaseDate = gameB.releaseDate;
				return gameBReleaseDate.localeCompare(gameAReleaseDate);
			});
			break;
		case 'Release Date: Oldest First':
			sortedGames = sortedGames.sort((gameA, gameB) => {
				const gameAReleaseDate = gameA.releaseDate;
				const gameBReleaseDate = gameB.releaseDate;
				return gameAReleaseDate.localeCompare(gameBReleaseDate);
			});
			break;
		case 'Price: Low to High':
			sortedGames = sortedGames.sort((gameA, gameB) => {
				return gameA.price - gameB.price;
			});
			break;
		case 'Price: High to Low':
			sortedGames = sortedGames.sort((gameA, gameB) => {
				return gameB.price - gameA.price;
			});
			break;
		case 'Name: A to Z':
			sortedGames = sortedGames.sort((gameA, gameB) => {
				const gameAName = gameA.title;
				const gameBName = gameB.title;
				return gameAName.localeCompare(gameBName);
			});
			break;
		case 'Name: Z to A':
			sortedGames = sortedGames.sort((gameA, gameB) => {
				const gameAName = gameA.title;
				const gameBName = gameB.title;
				return gameBName.localeCompare(gameAName);
			});
			break;
		default:
			break;
	}
	return sortedGames;
}

function filterGamesByPrice(games, min, max) {
	let filteredGames = games;
	// Filter the games by price range if there is a provided price range
	if (min !== null && max !== null) {
		// Both minimum and maximum price was provided
		filteredGames = filteredGames.filter((game) => {
			return game.price >= min && game.price <= max;
		});
	} else if (min !== null && max === null) {
		// Only minimum price was provided
		filteredGames = filteredGames.filter((game) => {
			return game.price >= min;
		});
	} else if (min === null && max !== null) {
		// Only maximum price was provided
		filteredGames = filteredGames.filter((game) => {
			return game.price <= max;
		});
	}
	return filteredGames;
}

Shop.propTypes = {
	games: PropTypes.array,
	gamesError: PropTypes.error,
	getNewGames: PropTypes.func,
};

export default Shop;
