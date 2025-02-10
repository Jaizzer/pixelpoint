import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import getPrice from './getPrice';

function useFetchGame(id) {
	const [game, setGame] = useState(null);
	const [isGameLoading, setIsGameLoading] = useState(true);
	const [gameError, setGameError] = useState(null);

	// Get the necessary details about the clicked game
	useEffect(() => {
		// Display loading by default when rendering new game
		setIsGameLoading(true);
		if (id !== undefined) {
			(async function () {
				try {
					// Get the details about the game
					let response = await fetch(`https://api.rawg.io/api/games/${id}?key=99ef179fc1ee4d77a91ccee7e1bb59e6`);
					const gameDetails = await response.json();

					// Get the screenshots of the game
					response = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=99ef179fc1ee4d77a91ccee7e1bb59e6`);
					const gameScreenshots = await response.json();

					const gameWithDistilledProperties = {
						id: gameDetails.id,
						title: gameDetails.name,
						description: gameDetails.description_raw,
						rating: gameDetails.rating,
						price: getPrice(gameDetails.id),
						developers: gameDetails.developers.map((developer) => developer.name),
						genres: gameDetails.genres.map((genre) => genre.name),
						releaseDate: gameDetails.released,
						platforms: gameDetails.platforms.map((platform) => platform.platform.name),
						esrbRating: [gameDetails.esrb_rating ? gameDetails.esrb_rating.name : 'Unrated'],
						screenshots: [gameDetails.background_image, ...gameScreenshots.results.map((result) => result.image)],
					};

					setGame(gameWithDistilledProperties);
				} catch (error) {
					setGameError(error);
				} finally {
					setIsGameLoading(false);
				}
			})();
		}
	}, [id]);
	return [game, gameError, isGameLoading];
}

useFetchGame.propTypes = {
	id: PropTypes.string,
};

export default useFetchGame;
