import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Shop from './Shop';
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
							onDropdownItemClick(item.name);
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
	it('renders the entire games if no filter is applied', () => {
		const games = [
			{
				image: 'fakeLink',
				title: 'game',
				price: '$45',
				id: '1',
				genres: ['Action', 'Adventure'],
				platforms: ['Mobile'],
				esrbRating: ['Everyone 10+'],
			},
			{
				image: 'fakeLink',
				title: 'game',
				price: '$55',
				id: '2',
				genres: ['Action', 'Open World'],
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
		render(<Shop games={games} />);

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
				platforms: ['Mobile'],
				esrbRating: ['Everyone 10+'],
			},
			{
				image: 'fakeLink',
				title: 'game',
				price: '$55',
				id: '2',
				genres: ['Action', 'Open World'],
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
		render(<Shop games={games} gamesError={false} />);

		// Filter all 'Action'
		const actionDropdownFilter = screen.queryByText('Action');
		await user.click(actionDropdownFilter);

		// Check if the games that are 'Action' genre the only games that remained
		// by checking if the number of images corresponds to the number of Action games provided which is 2
		const isActionGenresRemained = screen.queryAllByRole('image');

		expect(isActionGenresRemained.length).toEqual(2);
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
				platforms: ['Mobile'],
				esrbRating: ['Everyone 10+'],
			},
			{
				image: 'fakeLink',
				title: 'game',
				price: '$55',
				id: '2',
				genres: ['Action', 'Open World'],
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
		render(<Shop games={games} gamesError={false} />);
		// Filter all games available for 'PC' platform
		const pcDropdownFilter = screen.queryByText('PC');
		await user.click(pcDropdownFilter);

		const isGamesForPCRemained = screen.queryAllByRole('image').length === 2;
		expect(isGamesForPCRemained).toBeTruthy();
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
				platforms: ['Mobile'],
				esrbRating: ['Everyone 10+'],
			},
			{
				image: 'fakeLink',
				title: 'game',
				price: '$55',
				id: '2',
				genres: ['Action', 'Open World'],
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
		render(<Shop games={games} gamesError={false} />);
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
				platforms: ['Mobile'],
				unitsSold: 10,
				esrbRating: ['Everyone 10+'],
			},
			{
				image: 'fakeLink',
				title: 'game2',
				price: 23,
				id: '2',
				genres: ['Action', 'Open World'],
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
		render(<Shop games={games} gamesError={false} />);
		const priceRangeControllerMock = screen.queryByText('Price Range Controller');
		await user.click(priceRangeControllerMock);

		const gameThatFitsThePriceRange = screen.queryAllByTitle('game-title')[0];
		expect(gameThatFitsThePriceRange.textContent).toEqual('game3');
	});
});
