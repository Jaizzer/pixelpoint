import Sidebar from './Sidebar';
import Home from './Home';
import Account from './Account';
import About from './About';
import Shop from './Shop';
import Error from './Error';
import Cart from './Cart';
import TopBar from './TopBar';
import { useParams } from 'react-router-dom';
import GameDetails from './GameDetails';
import useFetchGame from './useFetchGame';
import useFetchGames from './useFetchGames';
import { useEffect, useState } from 'react';

export default function App() {
	const { pageToDisplay } = useParams();
	const { id } = useParams();
	const [clickedGame, clickedGameError, isClickedGameLoading] = useFetchGame(id);
	const [shopGames, shopGamesError, getNewShopGames, getSpecificGenres, getSpecificPlatforms] = useFetchGames();
	const [latestGames, latestGamesError] = useFetchGames('latest', 10);
	const [upcomingGames, upcomingGamesError] = useFetchGames('upcoming', 5);

	const [cart, setCart] = useState([]);

	function checkIfGameIsInCart(gameID) {
		return cart.filter((game) => game.id === gameID).length > 0;
	}

	// Add add to cart status
	let shopGamesToDisplay = shopGames;
	if (!shopGamesError && shopGames.length > 0) {
		shopGamesToDisplay = shopGames.map((game) => ({ ...game, isAddedToCart: checkIfGameIsInCart(game.id) }));
	}

	// Add add to cart status
	let upcomingGamesToDisplay = upcomingGames;
	if (!upcomingGamesError && upcomingGames.length > 0) {
		upcomingGamesToDisplay = upcomingGames.map((game) => ({ ...game, isAddedToCart: checkIfGameIsInCart(game.id) }));
	}

	// Add add to cart status
	let latestGamesToDisplay = latestGames;
	if (!latestGamesError && latestGames.length > 0) {
		latestGamesToDisplay = latestGames.map((game) => ({ ...game, isAddedToCart: checkIfGameIsInCart(game.id) }));
	}

	// Add add to cart status
	let clickedGameToDisplay = clickedGame;
	if (!clickedGameError && clickedGame) {
		clickedGameToDisplay = { ...clickedGame, isAddedToCart: checkIfGameIsInCart(clickedGame.id) };
	}

	function addToCart(gameToAdd) {
		// Add the game to the cart
		setCart(
			cart.concat({
				id: gameToAdd.id,
				title: gameToAdd.title,
				rating: gameToAdd.rating,
				parentPlatforms: gameToAdd.parentPlatforms,
				price: gameToAdd.price,
				images: gameToAdd.images,
			})
		);
	}

	function removeItem(gameID) {
		// Remove an item from the cart
		setCart(cart.filter((item) => item.id !== gameID));
	}

	function clearCart() {
		// Clear all the contents of the cart
		setCart([]);
	}

	useEffect(() => {
		// Reset the game genres and platforms when moving outside the shop
		if (pageToDisplay !== 'shop') {
			getSpecificGenres([]);
			getSpecificPlatforms([]);
		}
	}, [pageToDisplay]);

	return (
		<>
			<Sidebar></Sidebar>
			<TopBar cartContentCount={cart.length}></TopBar>
			<main>
				{!pageToDisplay ? (
					<Home
						latestGames={latestGamesToDisplay}
						latestGamesError={latestGamesError}
						featuredGames={upcomingGamesToDisplay}
						featuredGamesError={upcomingGamesError}
					/>
				) : pageToDisplay === 'account' ? (
					<Account />
				) : pageToDisplay === 'shop' ? (
					<Shop
						games={shopGamesToDisplay}
						gamesError={shopGamesError}
						getNewShopGames={getNewShopGames}
						getSpecificGenres={getSpecificGenres}
						getSpecificPlatforms={getSpecificPlatforms}
						checkIfGameIsInCart={checkIfGameIsInCart}
					/>
				) : pageToDisplay === 'about' ? (
					<About />
				) : pageToDisplay === 'cart' ? (
					<Cart content={cart} removeItem={removeItem} clearCart={clearCart} />
				) : pageToDisplay === 'gameDetails' && id !== undefined ? (
					<GameDetails
						key={id}
						game={clickedGameToDisplay}
						isLoading={isClickedGameLoading}
						error={clickedGameError}
						onAddItemToCart={addToCart}
					/>
				) : (
					<Error />
				)}
			</main>
		</>
	);
}
