import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import getPrice from './getPrice.jsx';

function useFetchGame(id) {
	const [game, setGame] = useState(null);
	const [isGameLoading, setIsGameLoading] = useState(true);
	const [gameError, setGameError] = useState(null);
	const [isComponentGoingToRerender, setIsComponentGoingToRerender] = useState(false);

	function refetchGame() {
		setIsComponentGoingToRerender(!isComponentGoingToRerender);
	}

	// Get the necessary details about the clicked game
	useEffect(() => {
		if (id !== undefined) {
			// Display loading by default when rendering new game
			setIsGameLoading(true);
			(async function () {
				try {
					// Get the details about the game
					let response = await fetch(`https://api.rawg.io/api/games/${id}?key=7316558e23f844788817eccdda2769a2`);
					const gameDetails = await response.json();

					// Get the screenshots of the game
					response = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=7316558e23f844788817eccdda2769a2`);
					const gameScreenshots = await response.json();

					const gameWithDistilledProperties = {
						id: gameDetails.id,
						title: gameDetails.name,
						description: gameDetails.description_raw,
						rating: gameDetails.rating,
						price: getPrice(gameDetails.id),
						ownerCount: gameDetails.added_by_status && gameDetails.added_by_status.owned ? gameDetails.added_by_status.owned : 0,
						developers: gameDetails.developers.map((developer) => developer.name),
						genres: gameDetails.genres.map((genre) => genre.name),
						releaseDate: gameDetails.released,
						platforms: gameDetails.platforms.map((platform) => platform.platform.name),
						parentPlatforms: gameDetails.parent_platforms.map((parentPlatform) => parentPlatform.platform.name),
						esrbRating: [gameDetails.esrb_rating ? gameDetails.esrb_rating.name : 'Rating Pending'],
						images: [gameDetails.background_image, ...gameScreenshots.results.map((result) => result.image)],
					};

					setGame(gameWithDistilledProperties);
				} catch (error) {
					setGameError(error);
				} finally {
					setIsGameLoading(false);
				}
			})();
		}
	}, [id, isComponentGoingToRerender]);
	return [game, gameError, isGameLoading, refetchGame];
}

useFetchGame.propTypes = {
	id: PropTypes.string,
};

export default useFetchGame;
