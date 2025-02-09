import { useState, useEffect, useRef } from 'react';
import getPrice from './getPrice';
import PropTypes from 'prop-types';

export default function useFetchGames(category, gameCountPerRequest) {
	const [pageToRequestFromAPI, setPageToRequestFromAPI] = useState(1);
	const [games, setGames] = useState([]);
	const [isGamesLoading, setIsGamesLoading] = useState(true);
	const [gamesError, setGamesError] = useState(null);
	const isFetchingApproved = useRef(true);

	function fetchMoreGames() {
		// Move to next page
		setPageToRequestFromAPI((prev) => prev + 1);

		// Allow fetching since new page was requested
		isFetchingApproved.current = true;
	}

	useEffect(() => {
		if (isFetchingApproved.current) {
			// Prevent double fetch request caused by StrictMode
			isFetchingApproved.current = false;
			(async function () {
				try {
					let url = `https://api.rawg.io/api/games?key=99ef179fc1ee4d77a91ccee7e1bb59e6&page=${pageToRequestFromAPI}&page_size=${gameCountPerRequest}`;

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
					const response = await fetch(url);

					// Throw error if response is 404
					if (!response.ok) {
						throw new Error('No games found');
					}

					const jsonData = await response.json();
					const gamesWithDistilledProperties = jsonData.results.map((game) => {
						return {
							image: game.background_image,
							title: game.name,
							price: getPrice(game.id),
							id: `${game.id}`,
							genres: game.genres ? game.genres.map((genre) => genre.name) : ['Unknown'],
							platforms: game.platforms ? game.platforms.map((platform) => platform.platform.name) : ['Unknown'],
							ownerCount: game.added_by_status && game.added_by_status.owned ? game.added_by_status.owned : 0,
							releaseDate: game.released,
							esrbRating: game.esrb_rating ? game.esrb_rating.name : 'Unrated',
						};
					});
					// Add the newly requested games to current games array
					setGames((game) => {
						return game.concat(gamesWithDistilledProperties);
					});
				} catch (error) {
					setGamesError(error);
				} finally {
					setIsGamesLoading(false);
				}
			})();
		}
	}, [pageToRequestFromAPI, category, gameCountPerRequest]);

	return [games, gamesError, isGamesLoading, fetchMoreGames];
}

useFetchGames.propTypes = {
	category: PropTypes.string,
	gameCountPerRequest: PropTypes.number,
};
