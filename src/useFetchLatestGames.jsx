import { useState, useEffect, useRef } from 'react';
import getPrice from './getPrice';

export default function useFetchLatestGames() {
	const [pageToRequestFromAPI, setPageToRequestFromAPI] = useState(1);
	const [latestGames, setLatestGames] = useState([]);
	const [isLatestGamesLoading, setIsLatestGamesLoading] = useState(true);
	const [isLatestGamesHaveError, setIsLatestGamesHaveError] = useState(false);
	const isFetchingApproved = useRef(true);
	const gameCountPerRequest = 20;

	// Create a 1 year interval
	const dateRange = {
		min: getDateAYearAgo().toISOString().split('T')[0],
		max: new Date().toISOString().split('T')[0],
	};

	function getNewLatestGames() {
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
					const response = await fetch(
						`https://api.rawg.io/api/games?key=99ef179fc1ee4d77a91ccee7e1bb59e6&dates=${dateRange.min},${dateRange.max}&page=${pageToRequestFromAPI}&page_size=${gameCountPerRequest}`
					);
					const jsonData = await response.json();
					const modifiedGames = jsonData.results.map((game) => {
						return {
							imageLink: game.background_image,
							gameName: game.name,
							gamePrice: getPrice(game.id),
							gameId: `${game.id}`,
							genre: game.genres ? game.genres.map((genre) => genre.name) : ['Unknown'],
							platforms: game.platforms ? game.platforms.map((platform) => platform.platform.name) : ['Unknown'],
							unitsSold: game.added_by_status && game.added_by_status.owned ? game.added_by_status.owned : 0,
							releaseDate: game.released,
							esrbRating: game.esrb_rating ? game.esrb_rating.name : 'Unrated',
						};
					});
					// Add the newly requested games to current games array
					setLatestGames((game) => {
						return game.concat(modifiedGames);
					});
				} catch (error) {
					setIsLatestGamesHaveError(error ? true : false);
				} finally {
					setIsLatestGamesLoading(false);
				}
			})();
		}
	}, [pageToRequestFromAPI]);

	return [latestGames, isLatestGamesHaveError, isLatestGamesLoading, getNewLatestGames];
}

function getDateAYearAgo() {
	let dateOneYearAgo = new Date();
	dateOneYearAgo.setFullYear(dateOneYearAgo.getFullYear() - 1);
	return dateOneYearAgo;
}
