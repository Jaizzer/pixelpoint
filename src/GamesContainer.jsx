import PropTypes from 'prop-types';
import GameCard from './GameCard';
import { useState, useEffect } from 'react';

function GamesContainer({ games, gamesError, fetchNewGamesOnBottomScroll }) {
	const [isGamesLoading, setIsGamesLoading] = useState(true);

	// Remove the loading indicator if the parent component passed the newly requested games
	useEffect(() => {
		if (games.length > 0) {
			setIsGamesLoading(false);
		}
	}, [games]);

	// Create the game cards to be placed in DOM
	const gameCards = games.map((game) => <GameCard key={game.id} image={game.image} title={game.title} price={game.price} id={game.id} />);

	return (
		<div
			className="gamesContainer"
			title="game-cards-container"
			onScroll={(e) => {
				// Load new games if there are no new games being loaded when the user scrolled to the bottom of the div
				const isUserAtTheBottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 1;
				if (!isGamesLoading && isUserAtTheBottom && fetchNewGamesOnBottomScroll) {
					// Render loading indicator if the user have scrolled to the bottom
					setIsGamesLoading(true);
					fetchNewGamesOnBottomScroll();
					console.log('hi');
				}
			}}
		>
			{gameCards ? gameCards : null}
			{isGamesLoading ? (
				<div className="loading" title="loading">
					Loading...
				</div>
			) : gamesError ? (
				<div className="error" title="error">
					There was an error.
				</div>
			) : null}
		</div>
	);
}

GamesContainer.propTypes = {
	games: PropTypes.array,
	isGamesLoading: PropTypes.bool,
	gamesError: PropTypes.error,
	fetchNewGamesOnBottomScroll: PropTypes.func,
};

export default GamesContainer;
