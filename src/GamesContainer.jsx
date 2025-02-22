import PropTypes from 'prop-types';
import GameCard from './GameCard.jsx';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	overflow: auto;
	padding: 1.5em 1.5em 2.5em 1.5em;

	display: grid;
	gap: 1.5em;

	@media (max-width: ${1000}px) {
		padding: 1.5em 1.5em 5em 1.5em;
	}
`;

const GameCardsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 1.5em;
	justify-items: center;

	@media (max-width: ${1000}px) {
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		font-size: 0.6em;
	}

	@media (max-width: ${600}px) {
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	}
`;

const UtilitiesContainer = styled.div`
	justify-self: center;
	color: white;

	& > button,
	.loading,
	.error {
		align-self: center;
		justify-self: start;
	}

	& button {
		font-size: 1em;
		padding: 0.5em;
		border-radius: 0.5em;
		border: 0px;
		background-color: #0ba9c2;
		color: white;
	}
`;

function GamesContainer({ games, gamesError, isGamesLoading, getNewGames, refetchGames, addToCart }) {
	const [showMoreButton, setShowMoreButton] = useState(false);
	const gamesContainerDOM = useRef(null);
	const [isErrorNoticeVisible, setIsErrorNoticeVisible] = useState(gamesError ? true : false);
	const previousGamesCount = useRef(games.length);
	const isShowMoreButtonClicked = useRef(false);

	// Detect when new games are loaded
	useEffect(() => {
		let showMoreTimer;
		if (gamesError) {
			setShowMoreButton(false);
			setIsErrorNoticeVisible(true);
		} else if (games.length > 0) {
			// Auto scroll if new games have loaded via clicking 'Show More'
			if (isShowMoreButtonClicked.current && previousGamesCount.current !== 0 && previousGamesCount.current < games.length) {
				gamesContainerDOM.current.scrollTo({
					top: gamesContainerDOM.current.scrollTop + gamesContainerDOM.current.clientHeight,
					left: 0,
					behavior: 'smooth',
				});
				// Reset Show More button click tracker
				isShowMoreButtonClicked.current = false;
			}
			previousGamesCount.current = games.length;

			// Ensure DOM has mounted all the game cards before showing the 'Show More' Button
			showMoreTimer = setTimeout(() => {
				setShowMoreButton(true);
			}, 1000);
		} else if (games.length === 0 && !gamesError && !games.isGamesLoading) {
			setShowMoreButton(false);
		}
		return () => {
			clearTimeout(showMoreTimer);
		};
	}, [games, gamesError]);

	// Create game cards
	const gameCards = games.map((game) => (
		<GameCard
			key={game.id}
			image={game.images[0]}
			title={game.title}
			price={game.price}
			id={game.id}
			quantitySold={game.ownerCount}
			parentPlatforms={game.parentPlatforms}
			isGameInCart={game.isAddedToCart}
			rating={game.rating}
			addToCart={() => addToCart(game)}
		/>
	));

	return (
		<Container ref={gamesContainerDOM}>
			<GameCardsContainer className="gamesContainer" title="game-cards-container">
				{gameCards.length > 0 ? gameCards : null}
			</GameCardsContainer>
			<UtilitiesContainer>
				{/* Ensure button only appears after new games are visible (after they finish loading) */}
				{getNewGames && !isGamesLoading && showMoreButton && (
					<button
						onClick={() => {
							if (!isGamesLoading && getNewGames) {
								// Hide button while loading new games
								setShowMoreButton(false);
								getNewGames();
								isShowMoreButtonClicked.current = true;
							}
						}}
					>
						Show More
					</button>
				)}
				{!isGamesLoading && !gamesError && games.length === 0 ? (
					<div className="div">No games found</div>
				) : isGamesLoading ? (
					<div className="loading" title="loading">
						Loading...
					</div>
				) : (
					isErrorNoticeVisible && (
						<div className="error" title="error">
							<div>PixelPoint run into a problem</div>
							<button
								onClick={() => {
									if (games.length === 0) {
										// Refetch the first game batch
										refetchGames();
									} else {
										// Refetch the new games batch if the error is encountered when the "Show More" button is clicked
										getNewGames();
									}
									setIsErrorNoticeVisible(false);
								}}
							>
								Try Again
							</button>
						</div>
					)
				)}
			</UtilitiesContainer>
		</Container>
	);
}

GamesContainer.propTypes = {
	games: PropTypes.array.isRequired,
	gamesError: PropTypes.any,
	isGamesLoading: PropTypes.bool,
	getNewGames: PropTypes.func.isRequired,
	addToCart: PropTypes.func.isRequired,
	refetchGames: PropTypes.func.isRequired,
};

export default GamesContainer;
