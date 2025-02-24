import PropTypes from 'prop-types';
import FeaturedGames from './FeaturedGames.jsx';
import GamesContainer from './GamesContainer.jsx';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	height: 100%;
	overflow: scroll;
	background-color: #34343d;
	color: white;
	padding: 0em;

	h2 {
		font-size: 1.5em;
		padding: 1em 2em 0em 1em;
	}

	.latestGamesHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0em 1.5em;

		h2 {
			padding: 0;
		}

		a {
			font-size: 1em;
			padding: 0.5em;
			border-radius: 0.5em;
			border: 0px;
			background-color: #0ba9c2;
			color: white;

			@media (max-width: ${600}px) {
				font-size: 0.8em;
			}
		}
	}

	.loading,
	.errorMessage {
		padding: 1em;
		button {
			font-size: 1em;
			padding: 0.5em;
			border-radius: 0.5em;
			border: 0px;
			background-color: #0ba9c2;
			color: white;

			@media (max-width: ${600}px) {
				font-size: 0.8em;
			}
		}
	}
`;

function Home({
	featuredGames,
	featuredGamesError,
	isFeaturedGamesLoading,
	refetchFeaturedGames,
	latestGames,
	latestGamesError,
	isLatestGamesLoading,
	refetchLatestGames,
	addToCart,
}) {
	const [isErrorNoticeVisible, setIsErrorNoticeVisible] = useState(latestGamesError || featuredGamesError ? true : false);

	// Show error notice if an error is encountered
	useEffect(() => {
		if (featuredGamesError || latestGamesError) {
			setIsErrorNoticeVisible(true);
		}
	}, [featuredGamesError, latestGamesError]);

	return (
		<Container className="container" title="home">
			{isLatestGamesLoading || isFeaturedGamesLoading ? (
				<div className="loading">Loading...</div>
			) : isErrorNoticeVisible ? (
				<div className="errorMessage" title="error-message">
					{isErrorNoticeVisible && (
						<div className="error" title="error">
							<div>PixelPoint run into a problem</div>
							<button
								onClick={() => {
									if (latestGamesError) {
										refetchLatestGames();
									}
									if (featuredGames) {
										refetchFeaturedGames();
									}
									setIsErrorNoticeVisible(false);
								}}
							>
								Try Again
							</button>
						</div>
					)}
				</div>
			) : (
				<>
					<div>
						<h2>Upcoming Games</h2>
						<FeaturedGames
							games={featuredGames}
							gamesError={featuredGamesError}
							isGamesLoading={isFeaturedGamesLoading}
							addToCart={addToCart}
						/>
					</div>

					<div>
						<div className="latestGamesHeader">
							<h2>Latest Games</h2>
							<Link to="/shop">View More</Link>
						</div>
						<GamesContainer
							games={latestGames}
							gamesError={latestGamesError}
							isGamesLoading={false}
							refetchGames={refetchLatestGames}
							addToCart={addToCart}
						/>
					</div>
				</>
			)}
		</Container>
	);
}

Home.propTypes = {
	featuredGames: PropTypes.array,
	featuredGamesError: PropTypes.error,
	latestGames: PropTypes.array,
	latestGamesError: PropTypes.error,
	addToCart: PropTypes.func,
	isFeaturedGamesLoading: PropTypes.bool,
	isLatestGamesLoading: PropTypes.bool,
	refetchFeaturedGames: PropTypes.func,
	refetchLatestGames: PropTypes.func,
};

export default Home;
