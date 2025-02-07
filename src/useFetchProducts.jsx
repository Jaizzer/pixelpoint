import { useState, useEffect, useRef } from 'react';
import getPrice from './getPrice';

export default function useFetchProducts() {
	const [pageToRequestFromAPI, setPageToRequestFromAPI] = useState(1);
	const [products, setProducts] = useState([]);
	const [isProductsLoading, setIsProductsLoading] = useState(true);
	const [isProductsHaveError, setIsProductsHaveError] = useState(false);
	const isFetchingApproved = useRef(true);

	function getNewProducts() {
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
					const modifiedProducts = jsonData.results.map((product) => {
						return {
							imageLink: product.background_image,
							productName: product.name,
							productPrice: getPrice(product.id),
							productId: `${product.id}`,
							genre: product.genres.map((genre) => genre.name),
							platforms: product.platforms.map((platform) => platform.platform.name),
							unitsSold: product.added_by_status.owned,
							releaseDate: product.released,
							esrbRating: product.esrb_rating ? product.esrb_rating.name : 'Unrated',
						};
					});
					// Add the newly requested products to current products array
					setProducts((product) => {
						return product.concat(modifiedProducts);
					});
				} catch (error) {
					setIsProductsHaveError(error ? true : false);
				} finally {
					setIsProductsLoading(false);
				}
			})();
		}
	}, [pageToRequestFromAPI]);

	return [products, isProductsHaveError, isProductsLoading, getNewProducts];
}
