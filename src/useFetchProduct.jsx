import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import getPrice from './getPrice';

function useFetchProduct(id) {
	const [product, setProduct] = useState(null);
	const [isProductLoading, setIsProductLoading] = useState(true);
	const [isProductHaveError, setIsProductHaveErrors] = useState(false);

	// Get the necessary details about the clicked product
	useEffect(() => {
		// Display loading by default when rendering new product
		setIsProductLoading(true);
		if (id !== undefined) {
			(async function () {
				try {
					const detailsResponse = await fetch(`https://api.rawg.io/api/games/${id}?key=99ef179fc1ee4d77a91ccee7e1bb59e6`);
					const jsonDataDetails = await detailsResponse.json();
					const screenshotsResponse = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=99ef179fc1ee4d77a91ccee7e1bb59e6`);
					const jsonDataImages = await screenshotsResponse.json();
					const modifiedProduct = {
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
					setProduct(modifiedProduct);
				} catch (error) {
					setIsProductHaveErrors(error ? true : false);
				} finally {
					setIsProductLoading(false);
				}
			})();
		}
	}, [id]);
	return [ product, isProductHaveError, isProductLoading ];
}

useFetchProduct.propTypes = {
	id: PropTypes.string,
};

export default useFetchProduct;
