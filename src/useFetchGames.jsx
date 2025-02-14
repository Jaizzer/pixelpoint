import { useState, useEffect, useRef } from 'react';
import getPrice from './getPrice';
import PropTypes from 'prop-types';

export default function useFetchGames(category, gameCountPerRequest = 40) {
	const [pageToRequestFromAPI, setPageToRequestFromAPI] = useState(1);
	const [games, setGames] = useState([]);
	const [gamesError, setGamesError] = useState(null);
	const isFetchingApproved = useRef(true);
	const [genres, setGenres] = useState([]);
	const [platforms, setPlatforms] = useState([]);

	function fetchMoreGames() {
		// Move to next page
		setPageToRequestFromAPI((prev) => prev + 1);

		// Allow fetching since new page was requested
		isFetchingApproved.current = true;
	}

	function getSpecificGenres(genres) {
		// Update genres using an array of genre IDs
		setGenres(genres);

		// Start again at page 1
		setPageToRequestFromAPI(1);

		// Clear the games array before filling it with games that match the updated genres
		setGames([]);

		// Allow fetching since new genres were requested
		isFetchingApproved.current = true;
	}

	function getSpecificPlatforms(platforms) {
		// Update platforms using an array of platform IDs
		setPlatforms(platforms);

		// Start again at page 1
		setPageToRequestFromAPI(1);

		// Clear the games array before filling it with games that match the updated platforms
		setGames([]);

		// Allow fetching since new platforms were requested
		isFetchingApproved.current = true;
	}

	useEffect(() => {
		if (isFetchingApproved.current) {
			// Prevent double fetch request caused by StrictMode
			isFetchingApproved.current = false;
			(async function () {
				try {
					let url = `https://api.rawg.io/api/games?key=7316558e23f844788817eccdda2769a2&page=${pageToRequestFromAPI}&page_size=${gameCountPerRequest}`;

					if (category === 'latest') {
						// Get the games released between current day and last year
						let dateOneYearAgo = new Date();
						dateOneYearAgo.setFullYear(dateOneYearAgo.getFullYear() - 1);
						let dateToday = new Date();
						url += `&dates=${dateOneYearAgo.toISOString().split('T')[0]},${dateToday.toISOString().split('T')[0]}`;
					} else if (category === 'upcoming') {
						// Get the games to be released between tomorrow and next year
						let dateOneYearFromNow = new Date();
						dateOneYearFromNow.setFullYear(dateOneYearFromNow.getFullYear() + 1);
						let dateTomorrow = new Date();
						dateTomorrow.setDate(dateTomorrow.getDate() + 1);
						url += `&dates=${dateTomorrow.toISOString().split('T')[0]},${dateOneYearFromNow.toISOString().split('T')[0]}`;
					}

					// Add genres if provided
					if (genres.length > 0) {
						url += `&genres=${genres.join(', ')}`;
					}

					// Add platforms if provided
					if (platforms.length > 0) {
						url += `&platforms=${platforms.join(', ')}`;
					}

					const response = await fetch(url);

					// Throw error if response is 404
					if (!response.ok) {
						throw new Error('No games found');
					}

					const jsonData = await response.json();
					const gamesWithDistilledProperties = jsonData.results.map((game) => {
						return {
							images: [game.background_image],
							title: game.name,
							price: getPrice(game.id),
							id: game.id,
							genres: game.genres ? game.genres.map((genre) => genre.name) : ['Unknown'],
							platforms: game.platforms ? game.platforms.map((platform) => platform.platform.name) : ['Unknown'],
							parentPlatforms: game.parent_platforms.map((parentPlatform) => parentPlatform.platform.name),
							ownerCount: game.added_by_status && game.added_by_status.owned ? game.added_by_status.owned : 0,
							rating: game.rating,
							releaseDate: game.released,
							esrbRating: [game.esrb_rating ? game.esrb_rating.name : 'Rating Pending'],
						};
					});

					// Add the newly requested games to the current games array
					setGames((prev) => {
						const updatedGames = [...prev];
						// Insert newly fetched games if they haven't been added yet to the games state array
						gamesWithDistilledProperties.forEach((game) => {
							const isGameNotYetAdded = prev.filter((element) => element.id === game.id).length === 0;
							if (isGameNotYetAdded) {
								updatedGames.push(game);
							}
						});
						return updatedGames;
					});
				} catch (error) {
					setGamesError(error);
				}
			})();
		}
	}, [pageToRequestFromAPI, category, gameCountPerRequest, genres, platforms]);

	return [games, gamesError, fetchMoreGames, getSpecificGenres, getSpecificPlatforms];
}

useFetchGames.propTypes = {
	category: PropTypes.string,
	gameCountPerRequest: PropTypes.number,
};
