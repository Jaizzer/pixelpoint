import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import App from './App.jsx';
import { useState } from 'react';

vi.mock('./GamesContainer', () => ({
	default: ({ games }) => {
		const gameCards = games.map((game) => {
			return (
				<div key={game.id}>
					<img src={game.image} alt={game.title} role="image" />
					<div title="game-title">{game.title}</div>
					<div>{game.price}</div>
					<div title="game-genre">{game.genres.join(', ')}</div>
					<div title="game-platform">{game.platforms.join(', ')}</div>
				</div>
			);
		});
		return <div>{gameCards}</div>;
	},
}));

vi.mock('./DropdownFilter', () => ({
	default: ({ items, title, onDropdownItemClick }) => {
		const dropdownItems = items.map((item) => {
			return (
				<div key={item.name} className="dropdownItem">
					<input type="checkbox" id={item.name} name={item.name} />
					<label
						htmlFor={item.name}
						onClick={() => {
							onDropdownItemClick(item);
						}}
					>
						{item.name}
					</label>
				</div>
			);
		});

		return (
			<div>
				<div className="filterButton">{title}</div>
				<div className="dropdown">{dropdownItems}</div>
			</div>
		);
	},
}));

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

			function getSpecificPlatforms(platformIDs) {
				function getPlatformName(platformId) {
					switch (platformId) {
						case 1:
							return 'PC';
						case 2:
							return 'PlayStation 5';
						case 3:
							return 'Xbox One';
						case 4:
							return 'PlayStation 4';
						case 5:
							return 'Xbox Series S/X';
						case 6:
							return 'Nintendo Switch';
						case 7:
							return 'iOS';
						case 8:
							return 'Android';
						case 9:
							return 'Nintendo 3DS';
						case 10:
							return 'Nintendo DS';
						case 11:
							return 'Nintendo DSi';
						case 12:
							return 'macOS';
						case 13:
							return 'Linux';
						case 14:
							return 'Xbox 360';
						case 15:
							return 'Xbox';
						case 16:
							return 'PlayStation 3';
						case 17:
							return 'PlayStation 2';
						case 18:
							return 'PlayStation';
						case 19:
							return 'PS Vita';
						case 20:
							return 'PSP';
						case 21:
							return 'Wii U';
						case 22:
							return 'Wii';
						case 23:
							return 'GameCube';
						case 24:
							return 'Nintendo 64';
						case 25:
							return 'Game Boy Advance';
						case 26:
							return 'Game Boy Color';
						case 27:
							return 'Game Boy';
						case 28:
							return 'SNES';
						case 29:
							return 'NES';
						case 30:
							return 'Classic Macintosh';
						case 31:
							return 'Apple II';
						case 32:
							return 'Commodore / Amiga';
						case 33:
							return 'Atari 7800';
						case 34:
							return 'Atari 5200';
						case 35:
							return 'Atari 2600';
						case 36:
							return 'Atari Flashback';
						case 37:
							return 'Atari 8-bit';
						case 38:
							return 'Atari ST';
						case 39:
							return 'Atari Lynx';
						case 40:
							return 'Atari XEGS';
						case 41:
							return 'Genesis';
						case 42:
							return 'SEGA Saturn';
						case 43:
							return 'SEGA CD';
						case 44:
							return 'SEGA 32X';
						case 45:
							return 'SEGA Master System';
						case 46:
							return 'Dreamcast';
						case 47:
							return '3DO';
						case 48:
							return 'Jaguar';
						case 49:
							return 'Game Gear';
						case 50:
							return 'Neo Geo';
						default:
							return 'Unknown Platform';
					}
				}

				setGames([
					{
						title: 'Game 10',
						price: 50,
						id: '1',
						genres: ['Action'],
						platforms: platformIDs.map((platformID) => getPlatformName(platformID)),
						ownerCount: 300,
						releaseDate: '2024-01-24',
						esrbRating: ['Everyone'],
						images: ['fakeLink1', 'fakeLink2', 'fakeLink3'],
					},
				]);
			}

			function getSpecificGenres(genreIDs) {
				function getGenreName(genreId) {
					switch (genreId) {
						case 1:
							return 'Action';
						case 2:
							return 'Indie';
						case 3:
							return 'Adventure';
						case 4:
							return 'RPG';
						case 5:
							return 'Strategy';
						case 6:
							return 'Shooter';
						case 7:
							return 'Casual';
						case 8:
							return 'Simulation';
						case 9:
							return 'Puzzle';
						case 10:
							return 'Arcade';
						case 11:
							return 'Platformer';
						case 12:
							return 'Massively Multiplayer';
						case 13:
							return 'Racing';
						case 14:
							return 'Sports';
						case 15:
							return 'Fighting';
						case 16:
							return 'Family';
						case 17:
							return 'Board Games';
						case 18:
							return 'Educational';
						case 19:
							return 'Card';
						default:
							return 'Unknown';
					}
				}

				setGames([
					{
						title: 'Game 10',
						price: 50,
						id: '1',
						genres: genreIDs.map((genreID) => getGenreName(genreID)),
						platforms: ['PC'],
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

	it('renders the new games when the user click the Show More', async () => {
		const user = userEvent.setup();
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

		// Add 1500ms delay since Show More button only appears after 1000ms
		await waitFor(
			async () => {
				const showMoreButton = screen.queryByText('Show More');
				await user.click(showMoreButton);
			},
			{ timeout: 1500 }
		);

		await waitFor(
			() => {
				// The number of game card after clicking show more
				const gameCardCountAfterClickingShowMore = screen.queryAllByTitle('game-card').length;

				// The game card should have doubled after the clicking show more
				expect(gameCardCountAfterClickingShowMore).toEqual(gameCardCountBeforeBottomScroll * 2);
			},
			{ timeout: 2000 }
		);
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

	it('provides the games that match the requested genres', async () => {
		const user = userEvent.setup();
		render(
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:pageToDisplay" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		// Go to shop
		const shop = screen.queryByText('Shop');
		await user.click(shop);

		// Filter all 'Action' and 'Puzzle'
		const actionDropdownFilter = screen.queryByText('Action');
		const puzzleDropdownFilter = screen.queryByText('Puzzle');
		const arcadeDropdownFilter = screen.queryByText('Arcade');
		await user.click(actionDropdownFilter);
		await user.click(puzzleDropdownFilter);
		await user.click(arcadeDropdownFilter);

		const gameGenres = screen.queryByText('Action, Puzzle, Arcade');
		expect(gameGenres).not.toBeNull();
	});

	it('provides the games that match the requested platforms', async () => {
		const user = userEvent.setup();
		render(
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:pageToDisplay" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		// Go to shop
		const shop = screen.queryByText('Shop');
		await user.click(shop);

		// Filter all 'PC' and 'PlayStation 5'
		const pcDropdownFilter = screen.queryByText('PC');
		const ps5DropdownFilter = screen.queryByText('PlayStation 5');
		await user.click(pcDropdownFilter);
		await user.click(ps5DropdownFilter);

		const gamePlatforms = screen.queryByText('PC, PlayStation 5');
		expect(gamePlatforms).not.toBeNull();
	});
});
