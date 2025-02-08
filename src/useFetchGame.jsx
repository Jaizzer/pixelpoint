import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import getPrice from './getPrice';

function useFetchGame(id) {
	const [game, setGame] = useState(null);
	const [isGameLoading, setIsGameLoading] = useState(true);
	const [isGameHaveError, setIsGameHaveErrors] = useState(false);

	// Get the necessary details about the clicked game
	useEffect(() => {
		// Display loading by default when rendering new game
		setIsGameLoading(true);
		if (id !== undefined) {
			(async function () {
				try {
					const detailsResponse = await fetch(`https://api.rawg.io/api/games/${id}?key=99ef179fc1ee4d77a91ccee7e1bb59e6`);
					const jsonDataDetails = await detailsResponse.json();
					const screenshotsResponse = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=99ef179fc1ee4d77a91ccee7e1bb59e6`);
					const jsonDataImages = await screenshotsResponse.json();
					const modifiedGame = {
						id: jsonDataDetails.id,
						title: jsonDataDetails.name,
						description: jsonDataDetails.description_raw,
						rating: jsonDataDetails.rating,
						price: getPrice(jsonDataDetails.id),
						developers: jsonDataDetails.developers.map((developer) => developer.name),
						genres: jsonDataDetails.genres.map((genre) => genre.name),
						releaseDate: jsonDataDetails.released,
						platforms: jsonDataDetails.platforms.map((platform) => platform.platform.name),
						screenshots: [jsonDataDetails.background_image, ...jsonDataImages.results.map((result) => result.image)],
					};
					setGame(modifiedGame);
				} catch (error) {
					setIsGameHaveErrors(error ? true : false);
				} finally {
					setIsGameLoading(false);
				}
			})();
		}
	}, [id]);
	return [ game, isGameHaveError, isGameLoading ];
}

useFetchGame.propTypes = {
	id: PropTypes.string,
};

export default useFetchGame;
