import PropTypes from 'prop-types';
import GameCard from './GameCard';
import { useState, useEffect } from 'react';

function GamesContainer({ games, gamesError, fetchNewGamesOnBottomScroll, checkIfGameIsInCart }) {
	const [isGamesLoading, setIsGamesLoading] = useState(true);
	const [error, setError] = useState(gamesError);

	// Remove the loading indicator if the parent component passed the newly requested games
	useEffect(() => {
		if (gamesError || games.length > 0) {
			setIsGamesLoading(false);
			setError(gamesError);
		}
	}, [games, gamesError]);

	// Create the game cards to be placed in DOM
	const gameCards = games.map((game) => {
		const isGameInCart = checkIfGameIsInCart ? checkIfGameIsInCart(game.id) : false;
		return (
			<GameCard
				key={game.id}
				image={game.images[0]}
				title={game.title}
				price={game.price}
				id={game.id}
				quantitySold={game.ownerCount}
				parentPlatforms={game.parentPlatforms}
				isGameInCart={isGameInCart}
				rating={game.rating}
			/>
		);
	});

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
				}
			}}
		>
			{gameCards ? gameCards : null}
			{isGamesLoading ? (
				<div className="loading" title="loading">
					Loading...
				</div>
			) : error ? (
				<div className="error" title="error">
					{`${error}`}
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
	checkIfGameIsInCart: PropTypes.func,
};

export default GamesContainer;
