import PropTypes from 'prop-types';
import ProductCard from './GameCard';

function GamesContainer({ games }) {
	const gameCards = games.map((game) => (
		<ProductCard
			key={game.productId}
			imageLink={game.imageLink}
			productName={game.productName}
			productPrice={game.productPrice}
			productCartQuantity={game.productCartQuantity}
			productId={game.productId}
		/>
	));

	return <div className="gamesContainer">{gameCards}</div>;
}

GamesContainer.propTypes = {
	games: PropTypes.array,
};

export default GamesContainer;
