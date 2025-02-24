import PropTypes from 'prop-types';
import { useState } from 'react';
import Image from './Image.jsx';
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton.jsx';
import styled from 'styled-components';

const Container = styled.div`
	@media (max-width: 1000px) {
		font-size: 0.8em;
	}
	padding: 1.5em;

	display: flex;
	flex-direction: column;
	gap: 2em;

	.unselectedFeaturedGamesContainer {
		display: flex;
		flex-direction: row;
		gap: 1em;
		overflow: auto;
		padding: 1em;

		.unselectedFeaturedGame {
			width: 300px;
			flex-shrink: 0;
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: 200px 1fr;
			background-color: #2c2c2c;
			border-radius: 0.5em;
			overflow: hidden;
		}

		@media (max-width: 1000px) {
			.unselectedFeaturedGame {
				width: 200px;
				grid-template-rows: 150px 1fr;
			}
		}

		@media (max-width: 400px) {
			.unselectedFeaturedGame {
				width: 150px;
				grid-template-rows: 100px 1fr;
			}
		}

		.unselectedFeaturedGameTitle {
			padding: 1em;
		}

		img {
			height: 100%;
			object-fit: cover;
		}
	}

	.selectedFeaturedGame {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto;
		border-radius: 1em;
		overflow: hidden;
		background-color: #2c2c2c;

		img {
			grid-column: 1 / 2;
			grid-row: 1 / 2;
			object-position: cover;
			width: min(900px, 100%);
			height: 400px;
		}

		.content {
			align-self: center;
			padding: 3em;
			grid-column: 2 / 3;
			grid-row: 1 / 2;
			background-color: transparent;

			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: 1em;

			.selectedFeaturedGameTitle {
				font-size: 1.5em;
				font-weight: 600;
			}

			.description {
				font-size: 0.9em;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 7;
				line-clamp: 7;
				-webkit-box-orient: vertical;
				grid-row: 2 / 3;
			}

			@media (max-width: 1000px) {
				padding: 2em;
				.description {
					display: -webkit-box;
					-webkit-line-clamp: 3;
					line-clamp: 3;
				}

				.selectedFeaturedGameTitle {
					font-size: 1.2em;
				}
			}

			@media (max-width: 1000px) {
				.description {
					display: none;
				}

				.selectedFeaturedGameTitle {
					font-size: 1.2em;
				}
			}
		}
		@media (max-width: 1000px) {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: auto auto;

			img {
				grid-column: 1 / 2;
				grid-row: 1 / 3;
			}

			.content {
				grid-column: 1 / 2;
				grid-row: 2 / 3;
			}
		}
	}

	.actions {
		display: flex;
		gap: 1em;

		.viewMore {
			border-radius: 0.5em;
			background-color: #ff8400;
			padding: 0.5em;
			font-size: 14px;
		}
	}
`;

const ModifiedAddToCartButton = styled(AddToCartButton)`
	border-radius: 0.5em;
	font-size: 1em;
	padding: 0.5em;
	font-size: 14px;

	button {
		font-size: 14px;
	}
`;

function FeaturedGames({ games, gamesError, isGamesLoading, addToCart }) {
	const [selectedFeaturedGameIndex, setSelectedFeaturedGameIndex] = useState(0);
	const isGamesLoaded = games.length > 0;

	let selectedFeaturedGamesContainer;
	let unselectedFeaturedGamesContainer = [];
	if (isGamesLoaded) {
		games.forEach((game) => {
			if (game.id === games[selectedFeaturedGameIndex].id) {
				selectedFeaturedGamesContainer = (
					<SelectedFeaturedGame game={game} key={game.id} description={game.description} addToCart={addToCart} />
				);
			} else {
				unselectedFeaturedGamesContainer.push(
					<UnselectedFeaturedGame game={game} key={game.id} onClick={() => setSelectedFeaturedGameIndex(games.indexOf(game))} />
				);
			}
		});
	}

	return (
		<Container className="featured-games-container">
			{isGamesLoading ? (
				<div title="loading-indicator">Loading...</div>
			) : gamesError ? (
				<div title="error-indicator"></div>
			) : (
				<>
					{selectedFeaturedGamesContainer}
					<div className="unselectedFeaturedGamesContainer">{unselectedFeaturedGamesContainer}</div>
				</>
			)}
		</Container>
	);
}

function SelectedFeaturedGame({ game, description, addToCart }) {
	return (
		<div key={game.id} title="selected-featured-game" className="selectedFeaturedGame">
			<Image src={game.images[0]} title={game.title} className={'selectedFeaturedGameImage'} />
			<div className="content">
				<div className="selectedFeaturedGameTitle" title="game-title">
					{game.title}
				</div>
				<div className="description">{description}</div>
				<div className="actions">
					<ModifiedAddToCartButton onAddItemToCart={() => addToCart(game)} isGameAdded={game.isAddedToCart} caption={'Pre-Order Now'} />
					<Link className="viewMore" to={`/gameDetails/${game.id}`}>
						View More
					</Link>
				</div>
			</div>
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
	isGamesLoading: PropTypes.bool,
};

export default FeaturedGames;
