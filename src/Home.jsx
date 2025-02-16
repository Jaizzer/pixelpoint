import PropTypes from 'prop-types';
import FeaturedGames from './FeaturedGames.jsx';
import GamesContainer from './GamesContainer.jsx';
import { Link } from 'react-router-dom';

function Home({ featuredGames, featuredGamesError, isFeaturedGamesLoading, latestGames, latestGamesError, isLatestGamesLoading, addToCart }) {
	return (
		<div className="container" title="home">
			{isLatestGamesLoading || isFeaturedGamesLoading ? (
				<div>Loading...</div>
			) : (
				<>
					<div>
						<h2>Upcoming Games</h2>
						<FeaturedGames games={featuredGames} gamesError={featuredGamesError} isGamesLoading={false} addToCart={addToCart} />
					</div>
					<Link to="/shop">
						<button>View More</button>
					</Link>
					<div>
						<h2>Latest Games</h2>
						<GamesContainer games={latestGames} gamesError={latestGamesError} isGamesLoading={false} addToCart={addToCart} />
					</div>
				</>
			)}
		</div>
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
};

export default Home;
