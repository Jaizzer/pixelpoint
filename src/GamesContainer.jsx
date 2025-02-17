import PropTypes from 'prop-types';
import GameCard from './GameCard.jsx';
import { useState, useEffect, useRef } from 'react';

function GamesContainer({ games, gamesError, isGamesLoading, getNewGames, addToCart }) {
	const [showMoreButton, setShowMoreButton] = useState(false);
	const gamesContainerDOM = useRef(null);
	const previousGamesCount = useRef(games.length);

	// Detect when new games are loaded
	useEffect(() => {
		if (gamesError) {
			setShowMoreButton(false);
		} else if (games.length > 0) {
			// Auto scroll if new games have loaded
			if (previousGamesCount.current !== 0 && previousGamesCount.current !== games.length) {
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
		<div className="gamesContainer" title="game-cards-container" ref={gamesContainerDOM}>
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

			{gamesError && (
				<div className="error" title="error">
					{`${gamesError}`}
				</div>
			)}
		</div>
	);
}

GamesContainer.propTypes = {
	games: PropTypes.array.isRequired,
	gamesError: PropTypes.any,
	isGamesLoading: PropTypes.bool,
	getNewGames: PropTypes.func.isRequired,
	addToCart: PropTypes.func.isRequired,
};

export default GamesContainer;
