import PropTypes from 'prop-types';
import DropdownFilter from './DropdownFilter.jsx';
import PriceRangeController from './PriceRangeController.jsx';
import { useEffect, useState } from 'react';
import GamesContainer from './GamesContainer.jsx';
import styled from 'styled-components';

const breakPoint = 1700;
const Container = styled.div`
	justify-content: space-between;
	overflow: hidden;
	height: 100%;
	padding-top: 1.5em;

	display: grid;
	grid-template-rows: 1fr;
	grid-template-columns: 1fr 300px;

    background-color: #34343d;

	@media (max-width: ${breakPoint}px) {
		grid-template-rows: auto 1fr;
		padding-top: 0em;
		position: relative;
		grid-template-columns: 1fr;
	}
`;

const DropdownFiltersContainer = styled.div`
	position: relative;
	grid-row: 1 / 2;
	grid-column: 2 / 3;

	height: 100%;
	overflow: auto;

	padding: 1.5em;

	background-color: #373737;

	& > div {
		margin-top: 0.5em;
	}

	& > div:nth-child(1) {
		margin-top: 0em;
	}

	@media (max-width: ${breakPoint}px) {
		grid-row: 1 / 2;
		grid-column: 1 / 2;

		padding: 0.75em;
		overflow: visible;

		display: flex;
		flex-direction: row;
		justify-content: start;
        gap: 0.3em;

		& > div {
			margin-top: 0;
		}
	}

	@media (max-width: 460px) {
		flex-wrap: wrap;
	}
`;

function Shop({
	games,
	gamesError,
	isGamesLoading,
	refetchGames,
	getNewGames,
	getSpecificGenres,
	getSpecificPlatforms,
	addToCart,
	genres,
	platforms,
}) {
	const isGenresLoaded = genres.length > 0;
	const isPlatformsLoaded = platforms.length > 0;

	const [genreFilters, setGenreFilters] = useState([]);
	const [platformFilters, setPlatformFilters] = useState([]);
	const [ageRatingFilters, setAgeRatingFilters] = useState([]);
	const [priceRangeFilters, setPriceRangeFilters] = useState({ min: null, max: null });
	const isGamesLoaded = games.length > 0;
	const isEveryFiltersUnset = genreFilters.length === 0 && platformFilters.length === 0 && ageRatingFilters.length === 0;

	// Expand genre and platform dropdown if the screen is not narrow
	const [activeDropdowns, setActiveDropdowns] = useState(window.innerWidth < breakPoint ? [] : ['genre', 'platform']);
	const [isScreenNarrow, setIsScreenNarrow] = useState(window.innerWidth < breakPoint);

	function handleResize() {
		if (window.innerWidth < breakPoint) {
			setIsScreenNarrow(true);
		} else {
			setIsScreenNarrow(false);
		}
	}

	useEffect(() => {
		window.addEventListener('resize', handleResize);
	});

	useEffect(() => {
		if (isScreenNarrow) {
			// Collapse all dropdown if a narrow screen breakpoint is hit
			setActiveDropdowns([]);
		} else {
			// Expand genre and platform dropdown if a wide screen breakpoint is hit
			setActiveDropdowns(['genre', 'platform']);
		}
	}, [isScreenNarrow]);

	//  Initialize the genre, platform and age rating filters if they are not set yet
	if (isGamesLoaded && isEveryFiltersUnset && isGenresLoaded && isPlatformsLoaded) {
		setGenreFilters(genres.map((filter) => ({ ...filter, isChecked: false })));
		setPlatformFilters(platforms.map((filter) => ({ ...filter, isChecked: false })));
		setAgeRatingFilters(
			['Everyone', 'Everyone 10+', 'Teen', 'Mature', 'Adults Only', 'Rating Pending'].map((filter) => ({ name: filter, isChecked: false }))
		);
	}

	let gamesToDisplay = games;
	if (isGamesLoaded) {
		// Filter the games
		gamesToDisplay = filterGamesUsingCheckbox(gamesToDisplay, genreFilters, 'genres');
		gamesToDisplay = filterGamesUsingCheckbox(gamesToDisplay, platformFilters, 'platforms');
		gamesToDisplay = filterGamesUsingCheckbox(gamesToDisplay, ageRatingFilters, 'esrbRating');
		gamesToDisplay = filterGamesByPrice(gamesToDisplay, priceRangeFilters.min, priceRangeFilters.max);
	}

	function toggleActiveDropdowns(dropdownName) {
		const isDropdownActive = activeDropdowns.filter((dropdown) => dropdown === dropdownName).length === 1;
		if (isScreenNarrow) {
			// Ensure only 1 dropdown is active at a time when the screen is narrow
			if (isDropdownActive) {
				// Clear entire active dropdown
				setActiveDropdowns([]);
			} else {
				// Make dropdown the only active dropdown
				setActiveDropdowns([dropdownName]);
			}
		} else {
			// Allow multiple active dropdowns if the screen is wide
			if (isDropdownActive) {
				// Remove current dropdown from the active dropdowns if its already in the active dropdowns
				setActiveDropdowns((prev) => prev.filter((activeDropdown) => activeDropdown !== dropdownName));
			} else {
				// Add dropdown to the active dropdowns if its not yet in the active dropdowns
				setActiveDropdowns([...activeDropdowns, dropdownName]);
			}
		}
	}

	return (
		<Container title="shop">
			<DropdownFiltersContainer className="dropdownFiltersContainer">
				{
					// Render the dropdowns if all filters have been set
					!isEveryFiltersUnset && (
						<>
							<PriceRangeController
								onPriceRangeSet={(range) => {
									setPriceRangeFilters(range);
								}}
								isExpanded={activeDropdowns.includes('price')}
								onDropdownButtonClick={() => {
									toggleActiveDropdowns('price');
								}}
							></PriceRangeController>
							<DropdownFilter
								items={genreFilters}
								title="Genre"
								onDropdownItemClick={(clickedItem) => {
									// Add/Remove Checkmark
									checkOrUncheckItem(clickedItem, setGenreFilters);

									// Get the genre IDs (genre IDs are used by the API used for fetching games of specific genres)
									const checkedGenreIDs = getCheckedFiltersForTheNextRender(clickedItem, genreFilters).map((genre) => genre.id);

									// Request games that matches the checked genre filters via API
									getSpecificGenres(checkedGenreIDs);
								}}
								onClearClick={() => {
									// Remove checkmarks
									clearDropdown(setGenreFilters);

									// Clear genres request via API
									getSpecificGenres([]);
								}}
								numberOfShowLessItems={isScreenNarrow ? 12 : 7}
								isExpanded={activeDropdowns.includes('genre')}
								onDropdownButtonClick={() => {
									toggleActiveDropdowns('genre');
								}}
							/>
							<DropdownFilter
								items={platformFilters}
								title="Platform"
								onDropdownItemClick={(clickedItem) => {
									// Add/Remove Checkmark
									checkOrUncheckItem(clickedItem, setPlatformFilters);

									// Get the platform IDs (platform IDs are used by the API used for fetching games for specific platforms)
									const checkedPlatformIDs = getCheckedFiltersForTheNextRender(clickedItem, platformFilters).map(
										(platform) => platform.id
									);

									// Request games that matches the checked platform filters via API
									getSpecificPlatforms(checkedPlatformIDs);
								}}
								onClearClick={() => {
									// Remove checkmarks
									clearDropdown(setPlatformFilters);

									// Clear platforms request via API
									getSpecificPlatforms([]);
								}}
								numberOfShowLessItems={isScreenNarrow ? 20 : 7}
								isExpanded={activeDropdowns.includes('platform')}
								onDropdownButtonClick={() => {
									toggleActiveDropdowns('platform');
								}}
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
								isExpanded={activeDropdowns.includes('ageRating')}
								onDropdownButtonClick={() => {
									toggleActiveDropdowns('ageRating');
								}}
							/>
						</>
					)
				}
			</DropdownFiltersContainer>
			<GamesContainer
				games={gamesToDisplay}
				gamesError={gamesError}
				isGamesLoading={isGamesLoading}
				getNewGames={getNewGames}
				addToCart={addToCart}
				refetchGames={refetchGames}
			/>
		</Container>
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
		prevFilters.map((filter) => (filter.name === clickedDropdownItem.name ? { ...filter, isChecked: !filter.isChecked } : filter))
	);
}

function filterGamesUsingCheckbox(games, checkboxFilter, property) {
	let checkedFilters;
	const isThereAtleastOneFilterChecked = checkboxFilter.filter((filter) => filter.isChecked).length === 0;
	if (isThereAtleastOneFilterChecked) {
		// Get all the checked filter items
		checkedFilters = checkboxFilter.map((filter) => filter.name);
	} else {
		// Use all the filters if there is currently no checked filter
		checkedFilters = checkboxFilter.filter((filter) => filter.isChecked).map((filter) => filter.name);
	}

	// Filter the games
	return games.filter((game) => {
		return game[property].reduce((acc, curr) => checkedFilters.includes(curr) || acc, false);
	});
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

function getCheckedFiltersForTheNextRender(clickedItem, filters) {
	// If the clicked item was checked before clicking, then it would be unchecked after the click
	const isClickedItemUnchecked = filters.filter((filter) => filter.name === clickedItem.name)[0].isChecked;
	let remainingCheckedFilters;
	if (isClickedItemUnchecked) {
		// Remove the clicked item from the checked filters array
		remainingCheckedFilters = [...filters.filter((filter) => filter.name !== clickedItem.name && filter.isChecked)];
	} else {
		// Add the clicked item to checked filters array
		remainingCheckedFilters = [...filters.filter((item) => item.isChecked), clickedItem];
	}
	return remainingCheckedFilters;
}

Shop.propTypes = {
	games: PropTypes.array,
	gamesError: PropTypes.error,
	isGamesLoading: PropTypes.bool,
	getNewGames: PropTypes.func,
	getSpecificGenres: PropTypes.func,
	getSpecificPlatforms: PropTypes.func,
	addToCart: PropTypes.func,
	genres: PropTypes.array,
	platforms: PropTypes.array,
	refetchGames: PropTypes.func,
};

export default Shop;
