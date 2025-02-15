import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Shop from './Shop.jsx';
import { userEvent } from '@testing-library/user-event';

vi.mock('./GamesContainer', () => ({
	default: ({ games }) => {
		const gameCards = games.map((game) => {
			return (
				<div key={game.id}>
					<img src={game.image} alt={game.title} role="image" />
					<div title="game-title">{game.title}</div>
					<div>{game.price}</div>
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
					<input
						type="checkbox"
						id={item.name}
						name={item.name}
						onChange={() => {
							onDropdownItemClick(item);
						}}
					/>
					<label htmlFor={item.name}>{item.name}</label>
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

vi.mock('./PriceRangeController', () => ({
	default: ({ onPriceRangeSet }) => {
		return (
			<div
				className="priceRangeController"
				onClick={() => {
					onPriceRangeSet({ min: 50, max: 100 });
				}}
			>
				Price Range Controller
			</div>
		);
	},
}));

describe('Shop component', () => {
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

	it('renders the entire games if no filter is applied', () => {
		const games = [
			{
				image: 'fakeLink',
				title: 'game',
				price: '$45',
				id: '1',
				genres: ['Action', 'Adventure'],
				platforms: ['Android'],
				esrbRating: ['Everyone 10+'],
			},
			{
				image: 'fakeLink',
				title: 'game',
				price: '$55',
				id: '2',
				genres: ['Action', 'Shooter'],
				platforms: ['PC'],
				esrbRating: ['Everyone 10+'],
			},
			{
				image: 'fakeLink',
				title: 'game',
				price: '$65',
				id: '3',
				genres: ['Mystery', 'Puzzle'],
				platforms: ['PC'],
				esrbRating: ['Everyone 10+'],
			},
		];
		render(<Shop games={games} genres={genres} platforms={platforms} />);

		// Existence of an image guarantees the existence of a game card
		const images = screen.queryAllByAltText('game');

		expect(images.length).toBe(games.length);
	});

	it('filters the game when a dropdown filter is clicked', async () => {
		const user = userEvent.setup();
		const games = [
			{
				image: 'fakeLink',
				title: 'game',
				price: '$45',
				id: '1',
				genres: ['Action', 'Adventure'],
				platforms: ['Android'],
				esrbRating: ['Everyone 10+'],
			},
			{
				image: 'fakeLink',
				title: 'game',
				price: '$55',
				id: '2',
				genres: ['Action', 'Shooter'],
				platforms: ['PC'],
				esrbRating: ['Everyone 10+'],
			},
			{
				image: 'fakeLink',
				title: 'game',
				price: '$65',
				id: '3',
				genres: ['Mystery', 'Puzzle'],
				platforms: ['PC'],
				esrbRating: ['Everyone 10+'],
			},
		];
		const mockFunction = vi.fn();
		render(<Shop games={games} gamesError={false} getSpecificGenres={mockFunction} genres={genres} platforms={platforms} />);

		// Filter all 'Action'
		const actionDropdownFilter = screen.queryByText('Action');
		await user.click(actionDropdownFilter);

		// getSpecificGenres must be called with an array of genres' IDs in which for this test, the genre ID of Action is '1'
		expect(mockFunction).toHaveBeenCalledWith([1]);
	});

	it('filters the games by platform', async () => {
		const user = userEvent.setup();
		const games = [
			{
				image: 'fakeLink',
				title: 'game',
				price: '$45',
				id: '1',
				genres: ['Action', 'Adventure'],
				platforms: ['Android'],
				esrbRating: ['Everyone 10+'],
			},
			{
				image: 'fakeLink',
				title: 'game',
				price: '$55',
				id: '2',
				genres: ['Action', 'Shooter'],
				platforms: ['PC'],
				esrbRating: ['Everyone 10+'],
			},
			{
				image: 'fakeLink',
				title: 'game',
				price: '$65',
				id: '3',
				genres: ['Mystery', 'Puzzle'],
				platforms: ['PC'],
				esrbRating: ['Everyone 10+'],
			},
		];
		const mockFunction = vi.fn();
		render(<Shop games={games} gamesError={false} getSpecificPlatforms={mockFunction} genres={genres} platforms={platforms} />);

		// Filter all games available for 'PC' platform
		const pcDropdownFilter = screen.queryByText('PC');
		await user.click(pcDropdownFilter);

		// getSpecificPlatforms must be called with an array of platforms' IDs in which for this test, the platform ID of PC is '1'
		expect(mockFunction).toHaveBeenCalledWith([1]);
	});

	it('filters the games by age rating', async () => {
		const user = userEvent.setup();
		const games = [
			{
				image: 'fakeLink',
				title: 'game',
				price: '$45',
				id: '1',
				genres: ['Action', 'Adventure'],
				platforms: ['Android'],
				esrbRating: ['Everyone 10+'],
			},
			{
				image: 'fakeLink',
				title: 'game',
				price: '$55',
				id: '2',
				genres: ['Action', 'Shooter'],
				platforms: ['PC'],
				esrbRating: ['Mature'],
			},
			{
				image: 'fakeLink',
				title: 'game',
				price: '$65',
				id: '3',
				genres: ['Mystery', 'Puzzle'],
				platforms: ['PC'],
				esrbRating: ['Mature'],
			},
		];
		render(<Shop games={games} gamesError={false} genres={genres} platforms={platforms} />);
		// Filter all games that are age rated as 'Mature'
		const ageRatingDropdownFilter = screen.queryByText('Mature');
		await user.click(ageRatingDropdownFilter);

		const isMatureRatedGamesRemained = screen.queryAllByRole('image').length === 2;
		expect(isMatureRatedGamesRemained).toBeTruthy();
	});

	it('filters the games base on the price range', async () => {
		const user = userEvent.setup();
		const games = [
			{
				image: 'fakeLink',
				title: 'game1',
				price: 650,
				id: '1',
				genres: ['Action', 'Adventure'],
				platforms: ['Android'],
				unitsSold: 10,
				esrbRating: ['Everyone 10+'],
			},
			{
				image: 'fakeLink',
				title: 'game2',
				price: 23,
				id: '2',
				genres: ['Action', 'Shooter'],
				platforms: ['PC'],
				unitsSold: 20,
				esrbRating: ['Everyone 10+'],
			},
			{
				image: 'fakeLink',
				title: 'game3',
				price: 55,
				id: '3',
				genres: ['Mystery', 'Puzzle'],
				platforms: ['PC'],
				unitsSold: 30,
				esrbRating: ['Everyone 10+'],
			},
		];
		render(<Shop games={games} gamesError={false} genres={genres} platforms={platforms} />);
		const priceRangeControllerMock = screen.queryByText('Price Range Controller');
		await user.click(priceRangeControllerMock);

		const gameThatFitsThePriceRange = screen.queryAllByTitle('game-title')[0];
		expect(gameThatFitsThePriceRange.textContent).toEqual('game3');
	});
});
