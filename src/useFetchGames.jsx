import { useState, useEffect, useRef } from 'react';
import getPrice from './getPrice';

export default function useFetchGames() {
	const [pageToRequestFromAPI, setPageToRequestFromAPI] = useState(1);
	const [games, setGames] = useState([]);
	const [isGamesLoading, setIsGamesLoading] = useState(true);
	const [isGamesHaveError, setIsGamesHaveError] = useState(false);
	const isFetchingApproved = useRef(true);

	function getNewGames() {
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
						`https://api.rawg.io/api/games?key=99ef179fc1ee4d77a91ccee7e1bb59e6&page=${pageToRequestFromAPI}&page_size=100`
					);
					const jsonData = await response.json();
					const modifiedGames = jsonData.results.map((game) => {
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
						return game.concat(modifiedGames);
					});
				} catch (error) {
					setIsGamesHaveError(error ? true : false);
				} finally {
					setIsGamesLoading(false);
				}
			})();
		}
	}, [pageToRequestFromAPI]);

	return [games, isGamesHaveError, isGamesLoading, getNewGames];
}
