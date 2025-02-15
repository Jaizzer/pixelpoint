import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import App from './App';
import { useState } from 'react';

vi.mock('./useFetchGenres.jsx', () => ({
	default: () => {
		const genres = [
			{ id: 1, name: 'Action' },
			{ id: 2, name: 'Indie' },
			{ id: 3, name: 'Adventure' },
			{ id: 4, name: 'RPG' },
			{ id: 5, name: 'Strategy' },
			{ id: 6, name: 'Shooter' },
			{ id: 7, name: 'Casual' },
			{ id: 8, name: 'Simulation' },
			{ id: 9, name: 'Puzzle' },
			{ id: 10, name: 'Arcade' },
			{ id: 11, name: 'Platformer' },
			{ id: 12, name: 'Massively Multiplayer' },
			{ id: 13, name: 'Racing' },
			{ id: 14, name: 'Sports' },
			{ id: 15, name: 'Fighting' },
			{ id: 16, name: 'Family' },
			{ id: 17, name: 'Board Games' },
			{ id: 18, name: 'Educational' },
			{ id: 19, name: 'Card' },
		];
		const genresError = null;
		return [genres, genresError];
	},
}));

vi.mock('./useFetchPlatforms.jsx', () => ({
	default: () => {
		const platforms = [
			{ id: 1, name: 'PC' },
			{ id: 2, name: 'PlayStation 5' },
			{ id: 3, name: 'Xbox One' },
			{ id: 4, name: 'PlayStation 4' },
			{ id: 5, name: 'Xbox Series S/X' },
			{ id: 6, name: 'Nintendo Switch' },
			{ id: 7, name: 'iOS' },
			{ id: 8, name: 'Android' },
			{ id: 9, name: 'Nintendo 3DS' },
			{ id: 10, name: 'Nintendo DS' },
			{ id: 11, name: 'Nintendo DSi' },
			{ id: 12, name: 'macOS' },
			{ id: 13, name: 'Linux' },
			{ id: 14, name: 'Xbox 360' },
			{ id: 15, name: 'Xbox' },
			{ id: 16, name: 'PlayStation 3' },
			{ id: 17, name: 'PlayStation 2' },
			{ id: 18, name: 'PlayStation' },
			{ id: 19, name: 'PS Vita' },
			{ id: 20, name: 'PSP' },
			{ id: 21, name: 'Wii U' },
			{ id: 22, name: 'Wii' },
			{ id: 23, name: 'GameCube' },
			{ id: 24, name: 'Nintendo 64' },
			{ id: 25, name: 'Game Boy Advance' },
			{ id: 26, name: 'Game Boy Color' },
			{ id: 27, name: 'Game Boy' },
			{ id: 28, name: 'SNES' },
			{ id: 29, name: 'NES' },
			{ id: 30, name: 'Classic Macintosh' },
			{ id: 31, name: 'Apple II' },
			{ id: 32, name: 'Commodore / Amiga' },
			{ id: 33, name: 'Atari 7800' },
			{ id: 34, name: 'Atari 5200' },
			{ id: 35, name: 'Atari 2600' },
			{ id: 36, name: 'Atari Flashback' },
			{ id: 37, name: 'Atari 8-bit' },
			{ id: 38, name: 'Atari ST' },
			{ id: 39, name: 'Atari Lynx' },
			{ id: 40, name: 'Atari XEGS' },
			{ id: 41, name: 'Genesis' },
			{ id: 42, name: 'SEGA Saturn' },
			{ id: 43, name: 'SEGA CD' },
			{ id: 44, name: 'SEGA 32X' },
			{ id: 45, name: 'SEGA Master System' },
			{ id: 46, name: 'Dreamcast' },
			{ id: 47, name: '3DO' },
			{ id: 48, name: 'Jaguar' },
			{ id: 49, name: 'Game Gear' },
			{ id: 50, name: 'Neo Geo' },
		];
		const platformsError = null;
		return [platforms, platformsError];
	},
}));

vi.mock('./useFetchGame.jsx', () => ({
	default: () => {
		const game = {
			id: '1',
			title: 'Game 1',
			description: 'This is the game description',
			rating: 4.47,
			price: 45,
			developers: ['Developer A', 'Developer B'],
			genres: ['Action'],
			releaseDate: '2012-12-12',
			platforms: ['platform1', 'platform2'],
			images: ['fakeLink1', 'fakeLink2', 'fakeLink3'],
		};
		const gameError = null;
		const isGameLoading = false;
		return [game, gameError, isGameLoading];
	},
}));

vi.mock('./useFetchGames.jsx', () => {
	return {
		default: () => {
			const [games, setGames] = useState([
				{
					title: 'Game 1',
					price: 50,
					id: '1',
					genres: ['Genre 1', 'Genre 2', 'Genre 3'],
					platforms: ['Platform 1', 'Platform 2', 'Platform 3'],
					ownerCount: 300,
					releaseDate: '2024-01-24',
					esrbRating: ['Everyone'],
					images: ['fakeLink1', 'fakeLink2', 'fakeLink3'],
				},
			]);
			const gamesError = null;
			const getNewGames = vi.fn(() => {
				setGames((games) =>
					games.concat([
						{
							title: 'game 2',
							price: 50,
							id: '2',
							genres: ['Genre 1', 'Genre 2', 'Genre 3'],
							platforms: ['Platform 1', 'Platform 2', 'Platform 3'],
							ownerCount: 300,
							releaseDate: '2024-01-24',
							esrbRating: ['Everyone'],
						},
					])
				);
			});

			function getSpecificPlatforms() {
				setGames([
					{
						title: 'Game 10',
						price: 50,
						id: '1',
						genres: ['Genre 6'],
						platforms: ['Platform 5', 'Platform 5', 'Platform 5'],
						ownerCount: 300,
						releaseDate: '2024-01-24',
						esrbRating: ['Everyone'],
						images: ['fakeLink1', 'fakeLink2', 'fakeLink3'],
					},
				]);
			}

			function getSpecificGenres() {
				setGames([
					{
						title: 'Game 10',
						price: 50,
						id: '1',
						genres: ['Genre 12', 'Genre 9'],
						platforms: ['Platform 1', 'Platform 2'],
						ownerCount: 300,
						releaseDate: '2024-01-24',
						esrbRating: ['Everyone'],
						images: ['fakeLink1', 'fakeLink2', 'fakeLink3'],
					},
				]);
			}
			return [games, gamesError, getNewGames, getSpecificGenres, getSpecificPlatforms];
		},
	};
});

describe('App component', () => {
	it('renders the sidebar', async () => {
		render(
			<MemoryRouter initialEntries={['/about']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:pageToDisplay" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		await waitFor(() => {
			const sidebar = screen.queryByRole('navigation');
			expect(sidebar).not.toBeNull();
		});
	});

	it('renders the main content', async () => {
		render(
			<MemoryRouter initialEntries={['/about']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:pageToDisplay" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		await waitFor(() => {
			const mainContent = screen.queryByRole('main');
			expect(mainContent).not.toBeNull();
		});
	});

	it("renders the Home page in '/' route", async () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:pageToDisplay" element={<App />} />
				</Routes>
			</MemoryRouter>
		);
		await waitFor(() => {
			const homePage = screen.queryByTitle('home');
			expect(homePage).not.toBeNull();
		});
	});

	it("renders the Shop page in '/shop' route", async () => {
		render(
			<MemoryRouter initialEntries={['/shop']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:pageToDisplay" element={<App />} />
				</Routes>
			</MemoryRouter>
		);
		await waitFor(() => {
			const shopPage = screen.queryByTitle('shop');
			expect(shopPage).not.toBeNull();
		});
	});

	it("renders the About page in '/about' route", async () => {
		render(
			<MemoryRouter initialEntries={['/about']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:pageToDisplay" element={<App />} />
				</Routes>
			</MemoryRouter>
		);
		await waitFor(() => {
			const aboutPage = screen.queryByTitle('about');
			expect(aboutPage).not.toBeNull();
		});
	});

	it('renders the Error page if the path does not exist', async () => {
		render(
			<MemoryRouter initialEntries={['/nonExistentPath']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:pageToDisplay" element={<App />} />
				</Routes>
			</MemoryRouter>
		);
		await waitFor(() => {
			const errorPage = screen.queryByTitle('error');
			expect(errorPage).not.toBeNull();
		});
	});

	it("renders the Cart page in '/cart' route", async () => {
		render(
			<MemoryRouter initialEntries={['/cart']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:pageToDisplay" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		await waitFor(() => {
			const cartPage = screen.queryByTitle('cart');
			expect(cartPage).not.toBeNull();
		});
	});

	it("renders the details page of the game when a game's image is clicked", async () => {
		// Render the app with initial route pointing to game details
		render(
			<MemoryRouter initialEntries={['/gameDetails/1']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:pageToDisplay" element={<App />} />
					<Route path="/:pageToDisplay/:id" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		// Wait for the loading state to finish and the description to appear
		await waitFor(() => {
			const description = screen.queryByText('Description');
			expect(description).not.toBeNull();
		});
	});

	it('renders the new games when the user scroll to the bottom', async () => {
		render(
			<MemoryRouter initialEntries={['/shop']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:pageToDisplay" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		// The number of game cards before scrolling to the bottom
		const gameCardCountBeforeBottomScroll = screen.queryAllByTitle('game-card').length;

		if (screen.queryAllByTitle('game-card').length > 0) {
			// Mock the user's action of scrolling to the bottom
			const gameCardsContainer = screen.getByTitle('game-cards-container');
			Object.defineProperty(gameCardsContainer, 'scrollHeight', { value: 1000 });
			Object.defineProperty(gameCardsContainer, 'clientHeight', { value: 300 });
			Object.defineProperty(gameCardsContainer, 'scrollTop', { value: 700 });
			fireEvent.scroll(gameCardsContainer);
		}

		await waitFor(() => {
			// The number of game card after scrolling to the bottom
			const gameCardCountAfterBottomScroll = screen.queryAllByTitle('game-card').length;

			// The game card should have doubled after the scroll
			expect(gameCardCountAfterBottomScroll).toEqual(gameCardCountBeforeBottomScroll * 2);
		});
	});

	it('allows the user to add games to cart when inside the game details page', async () => {
		const user = userEvent.setup();
		render(
			<MemoryRouter initialEntries={['/gameDetails/1']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:pageToDisplay" element={<App />} />
					<Route path="/:pageToDisplay/:id" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		// Click the add to cart button
		const addToCarButton = screen.queryByText(/Add to Cart/i);
		await user.click(addToCarButton);

		// Check the cart content count indicator
		const cartContentCountIndicator = screen.queryByTitle('cart-content-count');

		expect(cartContentCountIndicator.textContent).toEqual('1');
	});

	it('allows the user to remove a game in the cart', async () => {
		const user = userEvent.setup();
		render(
			<MemoryRouter initialEntries={['/gameDetails/1']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:pageToDisplay" element={<App />} />
					<Route path="/:pageToDisplay/:id" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		// Add an item to cart
		const addToCarButton = screen.queryByText(/Add to Cart/i);
		await user.click(addToCarButton);

		// Go to Cart page
		const cart = screen.queryByTitle('cart-icon');
		await user.click(cart);

		// Remove a game in the cart
		const removeItemButton = screen.getByTitle('remove-item');
		await user.click(removeItemButton);

		await waitFor(() => {
			// Check if the cart count indicator in the topbar disappeared
			const isCartCountIndicatorGone = screen.queryByTitle('cart-count-indicator') === null;

			// Check if the cart contents in the cart page disappeared
			const isCartContentGone = screen.queryByTitle('cart-content-card') === null;

			expect(isCartContentGone && isCartCountIndicatorGone).toBeTruthy();
		});
	});

	it('allows the user to remove all games in the cart', async () => {
		const user = userEvent.setup();
		render(
			<MemoryRouter initialEntries={['/gameDetails/1']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:pageToDisplay" element={<App />} />
					<Route path="/:pageToDisplay/:id" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		// Add an item to cart
		const addToCarButton = screen.queryByText(/Add to Cart/i);
		await user.click(addToCarButton);

		// Go to Cart page
		const cart = screen.queryByTitle('cart-icon');
		await user.click(cart);

		// Clear the cart
		const clearCartButton = screen.getByTitle('clear-cart');
		await user.click(clearCartButton);

		await waitFor(() => {
			// Check if the cart count indicator in the topbar disappeared
			const isCartCountIndicatorGone = screen.queryByTitle('cart-count-indicator') === null;

			// Check if the cart contents in the cart page disappeared
			const isCartContentGone = screen.queryByTitle('cart-content-card') === null;

			expect(isCartContentGone && isCartCountIndicatorGone).toBeTruthy();
		});
	});
});
