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
import { useState } from 'react';

export default function App() {
	const { pageToDisplay } = useParams();
	const { id } = useParams();
	const [clickedGame, clickedGameError, isClickedGameLoading] = useFetchGame(id);
	const [games, gamesError, getNewGames, getSpecificGenres, getSpecificPlatforms] = useFetchGames();
	const [cart, setCart] = useState([]);

	function checkIfGameIsInCart(gameID) {
		return cart.filter((game) => game.id === gameID).length > 0;
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

	return (
		<>
			<Sidebar></Sidebar>
			<TopBar cartContentCount={cart.length}></TopBar>
			<main>
				{!pageToDisplay ? (
					<Home />
				) : pageToDisplay === 'account' ? (
					<Account />
				) : pageToDisplay === 'shop' ? (
					<Shop
						games={games}
						gamesError={gamesError}
						getNewGames={getNewGames}
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
						game={clickedGame}
						isLoading={isClickedGameLoading}
						error={clickedGameError}
						onAddItemToCart={addToCart}
						isGameInCart={checkIfGameIsInCart(parseInt(id))}
					/>
				) : (
					<Error />
				)}
			</main>
		</>
	);
}
