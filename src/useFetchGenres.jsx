import { useState, useEffect, useRef } from 'react';

export default function useFetchGenres() {
	const isFetchingApproved = useRef(true);
	const [genres, setGenres] = useState([]);
	const [genresError, setGenresError] = useState([]);

	useEffect(() => {
		if (isFetchingApproved.current) {
			// Prevent double fetch request caused by StrictMode
			isFetchingApproved.current = false;
			(async function () {
				try {
					let url = `https://api.rawg.io/api/genres?key=c651b80b372d4bc595fa3ba01886bc17`;
					const response = await fetch(url);

					// Throw error if response is 404
					if (!response.ok) {
						throw new Error('No genres found');
					}
					const jsonData = await response.json();
					const genresWithDistilledProperties = jsonData.results.map((genre) => {
						return {
							id: genre.id,
							name: genre.name,
						};
					});
					setGenres(genresWithDistilledProperties);
				} catch (error) {
					setGenresError(error);
				}
			})();
		}
	}, []);

	return [genres, genresError];
}
