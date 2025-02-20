import Sidebar from './Sidebar';
import Home from './Home';
import Account from './Account';
import About from './About';
import Shop from './Shop';
import Error from './Error';
import Cart from './Cart';
import TopBar from './TopBar';
import { useParams } from 'react-router-dom';
import GameDetails from './GameDetails.jsx';
import useFetchGame from './useFetchGame.jsx';
import useFetchGames from './useFetchGames.jsx';
import { useEffect, useRef, useState } from 'react';
import useFetchGenres from './useFetchGenres.jsx';
import useFetchPlatforms from './useFetchPlatforms.jsx';
import ScrollToTop from './ScrollToTop.jsx';
import styled from 'styled-components';

const MainContent = styled.main`
	grid-column: 2 / 3;
	grid-row: 2/ 3;
	height: 100%;
    overflow: hidden;

    @media (max-width: ${600}px) {
        font-size: 0.6em;
	}
`;

export default function App() {
	const { pageToDisplay } = useParams();
	const { id } = useParams();
	const integerIdOfClickedGame = /^-?\d+$/.test(id) ? parseInt(id) : undefined;

	const [genres] = useFetchGenres();
	const [platforms] = useFetchPlatforms();

	const [clickedGame, clickedGameError, isClickedGameLoading, refetchGame] = useFetchGame(integerIdOfClickedGame);
	const [shopGames, shopGamesError, isShopGamesLoading, refetchShopGames, getNewShopGames, getSpecificGenres, getSpecificPlatforms] =
		useFetchGames();
	const [latestGames, latestGamesError, isLatestGamesLoading, refetchLatestGames] = useFetchGames('latest', 10);
	const [upcomingGames, upcomingGamesError, isUpcomingGamesLoading, refetchUpcomingGames] = useFetchGames('upcoming', 5, true);

	const [cart, setCart] = useState([]);
	const previousPage = useRef(pageToDisplay);

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
		if (previousPage.current === 'shop') {
			getSpecificGenres([]);
			getSpecificPlatforms([]);
		}
		previousPage.current = pageToDisplay;
	}, [pageToDisplay]);

	return (
		<>
			<ScrollToTop />
			<Sidebar></Sidebar>
			<TopBar cartContentCount={cart.length}></TopBar>
			<MainContent>
				{!pageToDisplay ? (
					<Home
						latestGames={latestGamesToDisplay}
						latestGamesError={latestGamesError}
						isLatestGamesLoading={isLatestGamesLoading}
						refetchLatestGames={refetchLatestGames}
						featuredGames={upcomingGamesToDisplay}
						featuredGamesError={upcomingGamesError}
						isFeaturedGamesLoading={isUpcomingGamesLoading}
						refetchFeaturedGames={refetchUpcomingGames}
						addToCart={addToCart}
					/>
				) : pageToDisplay === 'account' ? (
					<Account />
				) : pageToDisplay === 'shop' ? (
					<Shop
						games={shopGamesToDisplay}
						gamesError={shopGamesError}
						isGamesLoading={isShopGamesLoading}
						getNewGames={getNewShopGames}
						refetchGames={refetchShopGames}
						getSpecificGenres={getSpecificGenres}
						getSpecificPlatforms={getSpecificPlatforms}
						addToCart={addToCart}
						genres={genres}
						platforms={platforms}
					/>
				) : pageToDisplay === 'about' ? (
					<About />
				) : pageToDisplay === 'cart' ? (
					<Cart content={cart} removeItem={removeItem} clearCart={clearCart} />
				) : pageToDisplay === 'gameDetails' && integerIdOfClickedGame ? (
					<GameDetails
						key={id}
						game={clickedGameToDisplay}
						isLoading={isClickedGameLoading}
						error={clickedGameError}
						onAddItemToCart={addToCart}
						refetchGame={refetchGame}
					/>
				) : (
					<Error />
				)}
			</MainContent>
		</>
	);
}
