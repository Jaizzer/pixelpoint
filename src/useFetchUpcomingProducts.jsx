import { useState, useEffect, useRef } from 'react';
import getPrice from './getPrice';

export default function useFetchUpcomingProducts() {
	const [pageToRequestFromAPI, setPageToRequestFromAPI] = useState(1);
	const [upcomingProducts, setUpcomingProducts] = useState([]);
	const [isUpcomingProductsLoading, setIsUpcomingProductsLoading] = useState(true);
	const [isUpcomingProductsHaveError, setIsUpcomingProductsHaveError] = useState(false);
	const isFetchingApproved = useRef(true);
	const productCountPerRequest = 20;

	// Create a 1 year interval
	const dateRange = {
		min: new Date().toISOString().split('T')[0],
		max: getDateAYearFromNow().toISOString().split('T')[0],
	};

	function getNewUpcomingProducts() {
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
					setUpcomingProducts((product) => {
						return product.concat(modifiedProducts);
					});
				} catch (error) {
					setIsUpcomingProductsHaveError(error ? true : false);
				} finally {
					setIsUpcomingProductsLoading(false);
				}
			})();
		}
	}, [pageToRequestFromAPI]);

	return [upcomingProducts, isUpcomingProductsHaveError, isUpcomingProductsLoading, getNewUpcomingProducts];
}

function getDateAYearFromNow() {
	let oneYearFromNow = new Date();
	oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
	return oneYearFromNow;
}
