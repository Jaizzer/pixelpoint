import PropTypes from 'prop-types';
import GameCard from './GameCard.jsx';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 1.5em;
	justify-items: center;
	overflow: auto;

	@media (max-width: ${1000}px) {
		padding-bottom: 5em;
	}
`;

function GamesContainer({ games, gamesError, isGamesLoading, getNewGames, refetchGames, addToCart }) {
	const [showMoreButton, setShowMoreButton] = useState(false);
	const gamesContainerDOM = useRef(null);
	const [isErrorNoticeVisible, setIsErrorNoticeVisible] = useState(gamesError ? true : false);
	const previousGamesCount = useRef(games.length);

	// Detect when new games are loaded
	useEffect(() => {
		if (gamesError) {
			setShowMoreButton(false);
			setIsErrorNoticeVisible(true);
		} else if (games.length > 0) {
			// Auto scroll if new games have loaded
			if (previousGamesCount.current !== 0 && previousGamesCount.current < games.length) {
				gamesContainerDOM.current.scrollTo({
					top: gamesContainerDOM.current.scrollTop + gamesContainerDOM.current.clientHeight,
					left: 0,
					behavior: 'smooth',
				});
			}
			previousGamesCount.current = games.length;

			// Ensure DOM has mounted all the game cards before showing the 'Show More' Button
			setTimeout(() => {
				setShowMoreButton(true);
			}, 1000);
		}
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
		<Container className="gamesContainer" title="game-cards-container" ref={gamesContainerDOM}>
			{gameCards.length > 0 ? gameCards : null}

			{/* Ensure button only appears after new games are visible (after they finish loading) */}
			{getNewGames && !isGamesLoading && showMoreButton && (
				<button
					onClick={() => {
						if (!isGamesLoading && getNewGames) {
							// Hide button while loading new games
							setShowMoreButton(false);
							getNewGames();
						}
					}}
				>
					Show More
				</button>
			)}

			{isGamesLoading && (
				<div className="loading" title="loading">
					Loading...
				</div>
			)}

			{isErrorNoticeVisible && (
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
			)}
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
