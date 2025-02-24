import { useState, useEffect, useRef } from 'react';

export default function useFetchPlatforms() {
	const isFetchingApproved = useRef(true);
	const [platforms, setPlatforms] = useState([]);
	const [platformsError, setPlatformsError] = useState([]);

	useEffect(() => {
		if (isFetchingApproved.current) {
			// Prevent double fetch request caused by StrictMode
			isFetchingApproved.current = false;
			(async function () {
				try {
					let url = `https://api.rawg.io/api/platforms?key=c651b80b372d4bc595fa3ba01886bc17`;
					const response = await fetch(url);

					// Throw error if response is 404
					if (!response.ok) {
						throw new Error('No platforms found');
					}
					const jsonData = await response.json();
					const platformsWithDistilledProperties = jsonData.results.map((platform) => {
						return {
							id: platform.id,
							name: platform.name,
						};
					});
					setPlatforms(platformsWithDistilledProperties);
				} catch (error) {
					setPlatformsError(error);
				}
			})();
		}
	}, []);

	return [platforms, platformsError];
}
