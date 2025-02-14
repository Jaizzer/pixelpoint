import PropTypes from 'prop-types';
import FeaturedGames from './FeaturedGames';
import GamesContainer from './GamesContainer';
import { Link } from 'react-router-dom';

function Home({ featuredGames, featuredGamesError, latestGames, latestGamesError, addToCart }) {
	return (
		<div className="container" title="home">
			<div>
				<h2>Upcoming Games</h2>
				<FeaturedGames games={featuredGames} gamesError={featuredGamesError} addToCart={addToCart} />
			</div>
			<Link to="/shop">
				<button>View More</button>
			</Link>
			<div>
				<h2>Latest Games</h2>
				<GamesContainer games={latestGames} gamesError={latestGamesError} addToCart={addToCart} />
			</div>
		</div>
	);
}

Home.propTypes = {
	featuredGames: PropTypes.array,
	featuredGamesError: PropTypes.error,
	latestGames: PropTypes.array,
	latestGamesError: PropTypes.error,
	addToCart: PropTypes.func,
};

export default Home;
