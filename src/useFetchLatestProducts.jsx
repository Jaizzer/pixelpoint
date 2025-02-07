import { useState, useEffect, useRef } from 'react';
import getPrice from './getPrice';

export default function useFetchLatestProducts() {
	const [pageToRequestFromAPI, setPageToRequestFromAPI] = useState(1);
	const [latestProducts, setLatestProducts] = useState([]);
	const [isLatestProductsLoading, setIsLatestProductsLoading] = useState(true);
	const [isLatestProductsHaveError, setIsLatestProductsHaveError] = useState(false);
	const hasFetchingBeenApproved = useRef(true);
	const productCountPerRequest = 20;

	// Create a 1 year interval
	const dateRange = {
		min: getDateAYearAgo().toISOString().split('T')[0],
		max: new Date().toISOString().split('T')[0],
	};

	function getNewLatestProducts() {
		// Move to next page
		setPageToRequestFromAPI((prev) => prev + 1);

		// Allow fetching since new page was requested
		hasFetchingBeenApproved.current = true;
	}

	useEffect(() => {
		if (hasFetchingBeenApproved.current) {
			// Prevent double fetch request caused by StrictMode
			hasFetchingBeenApproved.current = false;
			(async function () {
				try {
					const response = await fetch(
						`https://api.rawg.io/api/games?key=99ef179fc1ee4d77a91ccee7e1bb59e6&dates=${dateRange.min},${dateRange.max}&page=${pageToRequestFromAPI}&page_size=${productCountPerRequest}`
					);
					const jsonData = await response.json();
					const modifiedProducts = jsonData.results.map((product) => {
						return {
							imageLink: product.background_image,
							productName: product.name,
							productPrice: getPrice(product.id),
							productId: `${product.id}`,
							genre: product.genres ? product.genres.map((genre) => genre.name) : ['Unknown'],
							platforms: product.platforms ? product.platforms.map((platform) => platform.platform.name) : ['Unknown'],
							unitsSold: product.added_by_status && product.added_by_status.owned ? product.added_by_status.owned : 0,
							releaseDate: product.released,
							esrbRating: product.esrb_rating ? product.esrb_rating.name : 'Unrated',
						};
					});
					// Add the newly requested products to current products array
					setLatestProducts((product) => {
						return product.concat(modifiedProducts);
					});
				} catch (error) {
					setIsLatestProductsHaveError(error ? true : false);
				} finally {
					setIsLatestProductsLoading(false);
				}
			})();
		}
	}, [pageToRequestFromAPI]);

	return [latestProducts, isLatestProductsHaveError, isLatestProductsLoading, getNewLatestProducts];
}

function getDateAYearAgo() {
	let oneYearFromNow = new Date();
	oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() - 1);
	return oneYearFromNow;
}
