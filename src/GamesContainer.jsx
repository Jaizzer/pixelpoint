import PropTypes from 'prop-types';
import GameCard from './GameCard';

function GamesContainer({ games }) {
	const gameCards = games.map((game) => <GameCard key={game.id} image={game.image} title={game.title} price={game.price} id={game.id} />);

	return <div className="gamesContainer">{gameCards}</div>;
}

GamesContainer.propTypes = {
	games: PropTypes.array,
};

export default GamesContainer;
