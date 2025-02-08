import GameCard from './GameCard';
import PropTypes from 'prop-types';
import DropdownFilter from './DropdownFilter';
import PriceRangeController from './PriceRangeController';
import { useEffect, useState } from 'react';
import Sorter from './Sorter';

function Shop({ games, error, loading, getNewGames }) {
	const [genreFilters, setGenreFilters] = useState([]);
	const [platformFilters, setPlatformFilters] = useState([]);
	const [ageRatingFilters, setAgeRatingFilters] = useState([]);
	const [sortCriteria, setSortCriteria] = useState(null);
	const [priceRangeFilters, setPriceRangeFilters] = useState({ min: null, max: null });
	const [isGamesLoading, setIsGamesLoading] = useState(loading);

	// Remove the loading indicator if the parent component passed the newly requested games
	useEffect(() => {
		if (games.length > 0) {
			setIsGamesLoading(false);
		}
	}, [games]);

	// Check if the updated games have been fetched
	const hasFetchedAllUpdatedGames = games.length !== 0;

	// Check if the filters have not yet been set
	const areGenreFiltersUnset = genreFilters.length === 0;

	// Collect every possible distinct genres from the games
	// only if the updated games have been fetched and the genre filters have not yet been set
	if (hasFetchedAllUpdatedGames && areGenreFiltersUnset) {
		let updatedGenreFilters = [
			...new Set(
				games
					.map((game) => {
						return game.genres;
					})
					.flat()
			),
		].map((genreFilter) => {
			return { title: genreFilter, isChecked: false };
		});
		setGenreFilters(updatedGenreFilters);
	}

	// Check if the platform filters have not yet been set
	const arePlatformFiltersUnset = platformFilters.length === 0;

	// Collect every possible distinct platforms from the games
	// only if the updated games have been fetched and the platform filters have not yet been set
	if (hasFetchedAllUpdatedGames && arePlatformFiltersUnset) {
		let updatedPlatformFilters = [
			...new Set(
				games
					.map((game) => {
						return game.platforms;
					})
					.flat()
			),
		].map((platformFilter) => {
			return { title: platformFilter, isChecked: false };
		});
		setPlatformFilters(updatedPlatformFilters);
	}

	// Check if the age filters have not yet been set
	const areAgeRatingFiltersUnset = ageRatingFilters.length === 0;

	// Collect every possible distinct age ratings from the games
	// only if the updated games have been fetched and the age rating filters have not yet been set
	if (hasFetchedAllUpdatedGames && areAgeRatingFiltersUnset) {
		let updatedAgeRatingFilters = [
			...new Set(
				games.map((game) => {
					return game.esrbRating;
				})
			),
		].map((ageRatingFilter) => {
			return { title: ageRatingFilter, isChecked: false };
		});
		setAgeRatingFilters(updatedAgeRatingFilters);
	}

	let gameCards;
	if (games) {
		// Get all currently checked genre filter items to be used for filtering the games to be rendered
		let checkedGenreFilters;
		const isThereAtleastOneGenreFilterChecked = genreFilters.filter((genreFilter) => genreFilter.isChecked).length === 0;
		if (isThereAtleastOneGenreFilterChecked) {
			// Get all the checked genre filter items
			checkedGenreFilters = genreFilters.map((genreFilter) => genreFilter.title);
		} else {
			// Use all the genre filters if there is currently no checked genre filter
			checkedGenreFilters = genreFilters.filter((genreFilter) => genreFilter.isChecked).map((genreFilter) => genreFilter.title);
		}

		// Filter the games by genre
		const filteredGamesByGenre = games.filter((game) => {
			return game.genres.reduce((acc, curr) => checkedGenreFilters.includes(curr) || acc, false);
		});

		// Get all currently checked age rating filter items to be used for filtering the genre-filtered-games
		let checkedAgeRatingFilters;
		const isThereAtleastOneAgeRatingFilterChecked = ageRatingFilters.filter((ageRatingFilter) => ageRatingFilter.isChecked).length === 0;
		if (isThereAtleastOneAgeRatingFilterChecked) {
			// Get all the checked age rating filter items
			checkedAgeRatingFilters = ageRatingFilters.map((ageRatingFilter) => ageRatingFilter.title);
		} else {
			// Use all the age rating filters if there is currently no checked age rating filter
			checkedAgeRatingFilters = ageRatingFilters
				.filter((ageRatingFilter) => ageRatingFilter.isChecked)
				.map((ageRatingFilter) => ageRatingFilter.title);
		}

		// Filter the genre-filtered-games by age rating
		const filteredGamesByAgeRating = filteredGamesByGenre.filter((game) => checkedAgeRatingFilters.includes(game.esrbRating));

		// Get all currently checked platform filter items to be used for filtering the genre-filtered-games
		let checkedPlatformFilters;
		const isThereAtleastOnePlatformFilterChecked = platformFilters.filter((platformFilter) => platformFilter.isChecked).length === 0;
		if (isThereAtleastOnePlatformFilterChecked) {
			// Get all the checked platform filter items
			checkedPlatformFilters = platformFilters.map((platformFilter) => platformFilter.title);
		} else {
			// Use all the platform filters if there is currently no checked platform filter
			checkedPlatformFilters = platformFilters
				.filter((platformFilter) => platformFilter.isChecked)
				.map((platformFilter) => platformFilter.title);
		}

		// Filter the age-rating-filtered-games by platform
		let filteredGamesByPlatform = filteredGamesByAgeRating.filter((filteredGameByGenre) => {
			return filteredGameByGenre.platforms.reduce((acc, curr) => checkedPlatformFilters.includes(curr) || acc, false);
		});

		// Filter the games by price range if there is a provided price range
		if (priceRangeFilters.min !== null && priceRangeFilters.max !== null) {
			// Both minimum and maximum price was provided
			filteredGamesByPlatform = filteredGamesByPlatform.filter((game) => {
				return game.price >= priceRangeFilters.min && game.price <= priceRangeFilters.max;
			});
		} else if (priceRangeFilters.min !== null && priceRangeFilters.max === null) {
			// Only minimum price was provided
			filteredGamesByPlatform = filteredGamesByPlatform.filter((game) => {
				return game.price >= priceRangeFilters.min;
			});
		} else if (priceRangeFilters.min === null && priceRangeFilters.max !== null) {
			// Only maximum price was provided
			filteredGamesByPlatform = filteredGamesByPlatform.filter((game) => {
				return game.price <= priceRangeFilters.max;
			});
		}

		// Sort the games after filtering
		switch (sortCriteria) {
			case 'Popularity: High to Low':
				filteredGamesByPlatform = filteredGamesByPlatform.sort((gameA, gameB) => {
					return gameB.unitsSold - gameA.unitsSold;
				});
				break;
			case 'Popularity: Low to High':
				filteredGamesByPlatform = filteredGamesByPlatform.sort((gameA, gameB) => {
					return gameA.unitsSold - gameB.unitsSold;
				});
				break;
			case 'Release Date: Newest First':
				filteredGamesByPlatform = filteredGamesByPlatform.sort((gameA, gameB) => {
					const gameAReleaseDate = gameA.releaseDate;
					const gameBReleaseDate = gameB.releaseDate;
					return gameBReleaseDate.localeCompare(gameAReleaseDate);
				});
				break;
			case 'Release Date: Oldest First':
				filteredGamesByPlatform = filteredGamesByPlatform.sort((gameA, gameB) => {
					const gameAReleaseDate = gameA.releaseDate;
					const gameBReleaseDate = gameB.releaseDate;
					return gameAReleaseDate.localeCompare(gameBReleaseDate);
				});
				break;
			case 'Price: Low to High':
				filteredGamesByPlatform = filteredGamesByPlatform.sort((gameA, gameB) => {
					return gameA.price - gameB.price;
				});
				break;
			case 'Price: High to Low':
				filteredGamesByPlatform = filteredGamesByPlatform.sort((gameA, gameB) => {
					return gameB.price - gameA.price;
				});
				break;
			case 'Name: A to Z':
				filteredGamesByPlatform = filteredGamesByPlatform.sort((gameA, gameB) => {
					const gameAName = gameA.title;
					const gameBName = gameB.title;
					return gameAName.localeCompare(gameBName);
				});
				break;
			case 'Name: Z to A':
				filteredGamesByPlatform = filteredGamesByPlatform.sort((gameA, gameB) => {
					const gameAName = gameA.title;
					const gameBName = gameB.title;
					return gameBName.localeCompare(gameAName);
				});
				break;
			default:
				break;
		}

		gameCards = filteredGamesByPlatform.map((game) => {
			if (game)
				return (
					<GameCard key={game.id} image={game.image} title={game.title} price={game.price} cartQuantity={game.cartQuantity} id={game.id} />
				);
		});
	}

	return (
		<div title="shop">
			<div className="dropdownFiltersContainer">
				<PriceRangeController
					onPriceRangeSet={(range) => {
						setPriceRangeFilters(range);
					}}
				></PriceRangeController>
				{
					// Only render the genre dropdown filter if there are available genre filter
					genreFilters.length > 0 ? (
						<DropdownFilter
							items={genreFilters}
							title="Genre"
							onDropdownItemClick={(clickedItem) => {
								// Save the Unchecked/Checked status of the genre filter item in the 'genreFilters state array
								const updatedGenreFilters = genreFilters.map((genreFilter) =>
									genreFilter.title === clickedItem ? { ...genreFilter, isChecked: !genreFilter.isChecked } : genreFilter
								);
								setGenreFilters(updatedGenreFilters);
							}}
							onClearClick={() => {
								// Save the unchecking of all genre filter items in the 'genreFilters state array
								const updatedGenreFilters = genreFilters.map((genreFilter) => {
									return { ...genreFilter, isChecked: false };
								});
								setGenreFilters(updatedGenreFilters);
							}}
							numberOfShowLessItems={7}
						/>
					) : null
				}
				{
					// Only render the platform dropdown filter if there are available platform filter
					platformFilters.length > 0 ? (
						<DropdownFilter
							items={platformFilters}
							title="Platform"
							onDropdownItemClick={(clickedItem) => {
								// Save the Unchecked/Checked status of the platform filter item in the 'platformFilters state array
								const updatedPlatformFilters = platformFilters.map((platformFilter) =>
									platformFilter.title === clickedItem
										? { ...platformFilter, isChecked: !platformFilter.isChecked }
										: platformFilter
								);
								setPlatformFilters(updatedPlatformFilters);
							}}
							onClearClick={() => {
								// Save the unchecking of all platform filter items in the 'platformFilters state array
								const updatedPlatformFilters = platformFilters.map((platformFilter) => {
									return { ...platformFilter, isChecked: false };
								});
								setPlatformFilters(updatedPlatformFilters);
							}}
							numberOfShowLessItems={7}
						/>
					) : null
				}
				{
					// Only render the age rating dropdown filter if there are available age rating filter
					ageRatingFilters.length > 0 ? (
						<DropdownFilter
							items={ageRatingFilters}
							title="Age Rating"
							onDropdownItemClick={(clickedItem) => {
								// Save the Unchecked/Checked status of the age rating filter item in the 'ageRatingFilters' state array
								const updatedAgeRatingFilters = ageRatingFilters.map((ageRatingFilter) =>
									ageRatingFilter.title === clickedItem
										? { ...ageRatingFilter, isChecked: !ageRatingFilter.isChecked }
										: ageRatingFilter
								);
								setAgeRatingFilters(updatedAgeRatingFilters);
							}}
							onClearClick={() => {
								// Save the unchecking of all age rating filter items in the 'ageRatingFilters' state array
								const updatedAgeRatingFilters = ageRatingFilters.map((ageRatingFilter) => {
									return { ...ageRatingFilter, isChecked: false };
								});
								setAgeRatingFilters(updatedAgeRatingFilters);
							}}
						/>
					) : null
				}
			</div>
			{
				<div className="otherTools">
					<Sorter onSortItemClick={setSortCriteria} numberOfShowLessItems={3} />
				</div>
			}
			<div
				className="gameCardsContainer"
				title="game-cards-container"
				onScroll={(e) => {
					// Load new games if there are no new games being loaded when the user scrolled to the bottom of the div
					const isUserAtTheBottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 1;
					if (!isGamesLoading && isUserAtTheBottom) {
						// Render loading indicator if the user have scrolled to the bottom
						setIsGamesLoading(true);
						// Get the new games
						if (getNewGames) {
							getNewGames();
						}
					}
				}}
			>
				{gameCards ? gameCards : null}
				{isGamesLoading ? (
					<div className="loading" title="loading">
						Loading...
					</div>
				) : error ? (
					<div className="error" title="error">
						There was an error.
					</div>
				) : null}
			</div>
		</div>
	);
}

Shop.propTypes = {
	games: PropTypes.array.isRequired,
	onAddItemToCart: PropTypes.func,
	loading: PropTypes.bool,
	error: PropTypes.bool,
	getNewGames: PropTypes.func,
};

export default Shop;
