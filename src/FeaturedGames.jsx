import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Image from './Image.jsx';
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton.jsx';

function FeaturedGames({ games, gamesError, addToCart }) {
	const [isGamesLoading, setIsGamesLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedFeaturedGameIndex, setSelectedFeaturedGameIndex] = useState(0);
	const isGamesLoaded = games.length > 0;

	useEffect(() => {
		if (gamesError) {
			setError(gamesError);
			// Remove loading indicator if error had updated
			setIsGamesLoading(false);
		}

		if (isGamesLoaded) {
			// Set the selected featured game as the first game in the games array by default
			setSelectedFeaturedGameIndex(0);
			// Remove loading indicator if games had updated
			setIsGamesLoading(false);
		}
	}, [isGamesLoaded, gamesError, games]);

	let featuredGames;
	if (isGamesLoaded) {
		featuredGames = games.map((game) => {
			if (game.id === games[selectedFeaturedGameIndex].id) {
				return <SelectedFeaturedGame game={game} key={game.id} description={game.description} addToCart={addToCart} />;
			} else {
				return <UnselectedFeaturedGame game={game} key={game.id} onClick={() => setSelectedFeaturedGameIndex(games.indexOf(game))} />;
			}
		});
	}

	return (
		<div className="featured-games-container">
			{isGamesLoading ? (
				<div title="loading-indicator">Loading...</div>
			) : error ? (
				<div title="error-indicator"></div>
			) : (
				<div>{featuredGames}</div>
			)}
		</div>
	);
}

function SelectedFeaturedGame({ game, description, addToCart }) {
	return (
		<div className="container">
			<Link to={`/gameDetails/${game.id}`}>
				<div key={game.id} title="selected-featured-game" className="selectedFeaturedGame">
					<Image src={game.images[0]} title={game.title} className={'selectedFeaturedGameImage'} />
					<div className="content">
						<div className="selectedFeaturedGameTitle" title="game-title">
							{game.title}
						</div>
						<div className="description">{description}</div>
					</div>
				</div>
			</Link>
			<AddToCartButton onAddItemToCart={() => addToCart(game)} isGameAdded={game.isAddedToCart} />
		</div>
	);
}

function UnselectedFeaturedGame({ game, onClick }) {
	return (
		<div key={game.id} title="unselected-featured-game" className="unselectedFeaturedGame" onClick={onClick}>
			<Image src={game.images[0]} title={game.title} className={'unselectedFeaturedGameImage'} />
			<div className="unselectedFeaturedGameTitle" title="game-title">
				{game.title}
			</div>
		</div>
	);
}

SelectedFeaturedGame.propTypes = {
	game: PropTypes.object,
	description: PropTypes.string,
	addToCart: PropTypes.func,
};

UnselectedFeaturedGame.propTypes = {
	game: PropTypes.object,
	onClick: PropTypes.func,
};

FeaturedGames.propTypes = {
	games: PropTypes.array,
	gamesError: PropTypes.gamesError,
	addToCart: PropTypes.func,
};

export default FeaturedGames;
