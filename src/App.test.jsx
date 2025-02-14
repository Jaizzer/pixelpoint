import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import App from './App';
import { useState } from 'react';

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
			return [games, gamesError, getNewGames];
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
