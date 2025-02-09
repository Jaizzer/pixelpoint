import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Shop from './Shop';
import { userEvent } from '@testing-library/user-event';

vi.mock('./DropdownFilter', () => ({
	default: ({ items, title, onDropdownItemClick }) => {
		const dropdownItems = items.map((item) => {
			return (
				<div key={item.title} className="dropdownItem">
					<input
						type="checkbox"
						id={item.title}
						name={item.title}
						onChange={() => {
							onDropdownItemClick(item.title);
						}}
					/>
					<label htmlFor={item.title}>{item.title}</label>
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

vi.mock('./Sorter', () => ({
	default: ({ onSortItemClick }) => {
		return (
			<div className="sorter">
				<button>Sort</button>
				<div
					title="sort-option"
					onClick={() => {
						onSortItemClick('Popularity: High to Low');
					}}
				>
					Popularity: High to Low
				</div>
				<div
					title="sort-option"
					onClick={() => {
						onSortItemClick('Popularity: Low to High');
					}}
				>
					Popularity: Low to High
				</div>
				<div
					title="sort-option"
					onClick={() => {
						onSortItemClick('Release Date: Newest First');
					}}
				>
					Release Date: Newest First
				</div>
				<div
					title="sort-option"
					onClick={() => {
						onSortItemClick('Release Date: Oldest First');
					}}
				>
					Release Date: Oldest First
				</div>
				<div
					title="sort-option"
					onClick={() => {
						onSortItemClick('Name: A to Z');
					}}
				>
					Name: A to Z
				</div>
				<div
					title="sort-option"
					onClick={() => {
						onSortItemClick('Name: Z to A');
					}}
				>
					Name: Z to A
				</div>
				<div
					title="sort-option"
					onClick={() => {
						onSortItemClick('Price: Low to High');
					}}
				>
					Price: Low to High
				</div>
				<div
					title="sort-option"
					onClick={() => {
						onSortItemClick('Price: High to Low');
					}}
				>
					Price: High to Low
				</div>
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
			},
			{
				image: 'fakeLink',
				title: 'game',
				price: '$55',
				id: '2',
				genres: ['Action', 'Open World'],
				platforms: ['PC'],
			},
			{ image: 'fakeLink', title: 'game', price: '$65', id: '3', genres: ['Mystery', 'Puzzle'], platforms: ['PC'] },
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
			},
			{
				image: 'fakeLink',
				title: 'game',
				price: '$55',
				id: '2',
				genres: ['Action', 'Open World'],
				platforms: ['PC'],
			},
			{ image: 'fakeLink', title: 'game', price: '$65', id: '3', genres: ['Mystery', 'Puzzle'], platforms: ['PC'] },
		];
		render(<Shop loading={false} games={games} error={false} />);

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
			},
			{
				image: 'fakeLink',
				title: 'game',
				price: '$55',
				id: '2',
				genres: ['Action', 'Open World'],
				platforms: ['PC'],
			},
			{ image: 'fakeLink', title: 'game', price: '$65', id: '3', genres: ['Mystery', 'Puzzle'], platforms: ['PC'] },
		];
		render(<Shop loading={false} games={games} error={false} />);
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
				esrbRating: 'Everyone 10+',
			},
			{
				image: 'fakeLink',
				title: 'game',
				price: '$55',
				id: '2',
				genres: ['Action', 'Open World'],
				platforms: ['PC'],
				esrbRating: 'Mature',
			},
			{
				image: 'fakeLink',
				title: 'game',
				price: '$65',
				id: '3',
				genres: ['Mystery', 'Puzzle'],
				platforms: ['PC'],
				esrbRating: 'Mature',
			},
		];
		render(<Shop loading={false} games={games} error={false} />);
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
			},
			{
				image: 'fakeLink',
				title: 'game2',
				price: 23,
				id: '2',
				genres: ['Action', 'Open World'],
				platforms: ['PC'],
				unitsSold: 20,
			},
			{
				image: 'fakeLink',
				title: 'game3',
				price: 55,
				id: '3',
				genres: ['Mystery', 'Puzzle'],
				platforms: ['PC'],
				unitsSold: 30,
			},
		];
		render(<Shop loading={false} games={games} error={false} />);
		const priceRangeControllerMock = screen.queryByText('Price Range Controller');
		await user.click(priceRangeControllerMock);

		const gameThatFitsThePriceRange = screen.queryAllByTitle('game-name')[0];
		expect(gameThatFitsThePriceRange.textContent).toEqual('game3');
	});

	it('sorts the games by popularity from high to low', async () => {
		const user = userEvent.setup();
		const games = [
			{
				image: 'fakeLink',
				title: 'thisShouldBeThird',
				price: 65,
				id: '1',
				genres: ['Action', 'Adventure'],
				platforms: ['Mobile'],
				unitsSold: 10,
			},
			{
				image: 'fakeLink',
				title: 'thisShouldBeSecond',
				price: 45,
				id: '2',
				genres: ['Action', 'Open World'],
				platforms: ['PC'],
				unitsSold: 20,
			},
			{
				image: 'fakeLink',
				title: 'thisShouldBeFirst',
				price: 55,
				id: '3',
				genres: ['Mystery', 'Puzzle'],
				platforms: ['PC'],
				unitsSold: 30,
			},
		];
		const expectedNamesOfGamesSortedByPopularity = ['thisShouldBeFirst', 'thisShouldBeSecond', 'thisShouldBeThird'];

		render(<Shop loading={false} games={games} error={false} />);

		// Click the 'Popularity: High to Low' sort option
		const popularitySorterOption = screen.queryByText('Popularity: High to Low');
		await user.click(popularitySorterOption);

		// Get the game names
		const titles = screen.queryAllByTitle('game-name').map((title) => title.textContent);

		expect(titles).toEqual(expectedNamesOfGamesSortedByPopularity);
	});

	it('sorts the games by popularity from low to high', async () => {
		const user = userEvent.setup();
		const games = [
			{
				image: 'fakeLink',
				title: 'thisShouldBeSecond',
				price: 65,
				id: '1',
				genres: ['Action', 'Adventure'],
				platforms: ['Mobile'],
				unitsSold: 20,
			},
			{
				image: 'fakeLink',
				title: 'thisShouldBeThird',
				price: 45,
				id: '2',
				genres: ['Action', 'Open World'],
				platforms: ['PC'],
				unitsSold: 30,
			},
			{
				image: 'fakeLink',
				title: 'thisShouldBeFirst',
				price: 55,
				id: '3',
				genres: ['Mystery', 'Puzzle'],
				platforms: ['PC'],
				unitsSold: 10,
			},
		];
		const expectedNamesOfGamesSortedByPopularity = ['thisShouldBeFirst', 'thisShouldBeSecond', 'thisShouldBeThird'];

		render(<Shop loading={false} games={games} error={false} />);

		// Click the 'Popularity: Low to High' sort option
		const popularitySorterOption = screen.queryByText('Popularity: Low to High');
		await user.click(popularitySorterOption);

		// Get the game names
		const titles = screen.queryAllByTitle('game-name').map((title) => title.textContent);
		expect(titles).toEqual(expectedNamesOfGamesSortedByPopularity);
	});

	it('sorts the games by price from low to high', async () => {
		const user = userEvent.setup();
		const games = [
			{
				image: 'fakeLink',
				title: 'thisShouldBeThird',
				price: 65,
				id: '1',
				genres: ['Action', 'Adventure'],
				platforms: ['Mobile'],
			},
			{
				image: 'fakeLink',
				title: 'thisShouldBeFirst',
				price: 45,
				id: '2',
				genres: ['Action', 'Open World'],
				platforms: ['PC'],
			},
			{
				image: 'fakeLink',
				title: 'thisShouldBeSecond',
				price: 55,
				id: '3',
				genres: ['Mystery', 'Puzzle'],
				platforms: ['PC'],
			},
		];
		const expectedNamesOfGamesSortedByPrice = ['thisShouldBeFirst', 'thisShouldBeSecond', 'thisShouldBeThird'];

		render(<Shop loading={false} games={games} error={false} />);

		// Click the 'Price: Low to High' sort option
		const priceSorterOption = screen.queryByText('Price: Low to High');
		await user.click(priceSorterOption);

		// Get the game names
		const titles = screen.queryAllByTitle('game-name').map((title) => title.textContent);

		expect(titles).toEqual(expectedNamesOfGamesSortedByPrice);
	});

	it('sorts the games by price from high to low', async () => {
		const user = userEvent.setup();
		const games = [
			{
				image: 'fakeLink',
				title: 'thisShouldBeFirst',
				price: 65,
				id: '1',
				genres: ['Action', 'Adventure'],
				platforms: ['Mobile'],
			},
			{
				image: 'fakeLink',
				title: 'thisShouldBeThird',
				price: 45,
				id: '2',
				genres: ['Action', 'Open World'],
				platforms: ['PC'],
			},
			{
				image: 'fakeLink',
				title: 'thisShouldBeSecond',
				price: 55,
				id: '3',
				genres: ['Mystery', 'Puzzle'],
				platforms: ['PC'],
			},
		];
		const expectedNamesOfGamesSortedByPrice = ['thisShouldBeFirst', 'thisShouldBeSecond', 'thisShouldBeThird'];

		render(<Shop loading={false} games={games} error={false} />);

		// Click the 'Price: High to Low' sort option
		const priceSorterOption = screen.queryByText('Price: High to Low');
		await user.click(priceSorterOption);

		// Get the game names
		const titles = screen.queryAllByTitle('game-name').map((title) => title.textContent);

		expect(titles).toEqual(expectedNamesOfGamesSortedByPrice);
	});

	it('sorts the games by name from A to Z', async () => {
		const user = userEvent.setup();
		const games = [
			{ image: 'fakeLink', title: 'C', price: 65, id: '1', genres: ['Action', 'Adventure'], platforms: ['Mobile'] },
			{ image: 'fakeLink', title: 'B', price: 45, id: '2', genres: ['Action', 'Open World'], platforms: ['PC'] },
			{ image: 'fakeLink', title: 'A', price: 55, id: '3', genres: ['Mystery', 'Puzzle'], platforms: ['PC'] },
		];
		const expectedNamesOfGamesSortedByName = ['A', 'B', 'C'];

		render(<Shop loading={false} games={games} error={false} />);

		// Click the 'Name: A to Z' sort option
		const nameSorterOption = screen.queryByText('Name: A to Z');
		await user.click(nameSorterOption);

		// Get the game names
		const titles = screen.queryAllByTitle('game-name').map((title) => title.textContent);

		expect(titles).toEqual(expectedNamesOfGamesSortedByName);
	});

	it('sorts the games by name from Z to A', async () => {
		const user = userEvent.setup();
		const games = [
			{ image: 'fakeLink', title: 'A', price: 65, id: '1', genres: ['Action', 'Adventure'], platforms: ['Mobile'] },
			{ image: 'fakeLink', title: 'B', price: 45, id: '2', genres: ['Action', 'Open World'], platforms: ['PC'] },
			{ image: 'fakeLink', title: 'C', price: 55, id: '3', genres: ['Mystery', 'Puzzle'], platforms: ['PC'] },
		];
		const expectedNamesOfGamesSortedByName = ['C', 'B', 'A'];

		render(<Shop loading={false} games={games} error={false} />);

		// Click the 'Name: Z to A' sort option
		const nameSorterOption = screen.queryByText('Name: Z to A');
		await user.click(nameSorterOption);

		// Get the game names
		const titles = screen.queryAllByTitle('game-name').map((title) => title.textContent);

		expect(titles).toEqual(expectedNamesOfGamesSortedByName);
	});

	it('sorts the games by release date, newest first', async () => {
		const user = userEvent.setup();
		const games = [
			{
				image: 'fakeLink',
				title: 'thisShouldBeFirst',
				price: 65,
				id: '1',
				genres: ['Action', 'Adventure'],
				platforms: ['Mobile'],
				releaseDate: '2024-01-03',
			},
			{
				image: 'fakeLink',
				title: 'thisShouldBeThird',
				price: 45,
				id: '2',
				genres: ['Action', 'Open World'],
				platforms: ['PC'],
				releaseDate: '2024-01-01',
			},
			{
				image: 'fakeLink',
				title: 'thisShouldBeSecond',
				price: 55,
				id: '3',
				genres: ['Mystery', 'Puzzle'],
				platforms: ['PC'],
				releaseDate: '2024-01-02',
			},
		];
		const expectedNamesOfGamesSortedByDate = ['thisShouldBeFirst', 'thisShouldBeSecond', 'thisShouldBeThird'];

		render(<Shop loading={false} games={games} error={false} />);

		// Click the 'Release Date: Newest First' sort option
		const dateSorterOption = screen.queryByText('Release Date: Newest First');
		await user.click(dateSorterOption);

		// Get the game names
		const titles = screen.queryAllByTitle('game-name').map((title) => title.textContent);

		expect(titles).toEqual(expectedNamesOfGamesSortedByDate);
	});

	it('sorts the games by release date, oldest first', async () => {
		const user = userEvent.setup();
		const games = [
			{
				image: 'fakeLink',
				title: 'thisShouldBeThird',
				price: 65,
				id: '1',
				genres: ['Action', 'Adventure'],
				platforms: ['Mobile'],
				releaseDate: '2024-01-03',
			},
			{
				image: 'fakeLink',
				title: 'thisShouldBeFirst',
				price: 45,
				id: '2',
				genres: ['Action', 'Open World'],
				platforms: ['PC'],
				releaseDate: '2024-01-01',
			},
			{
				image: 'fakeLink',
				title: 'thisShouldBeSecond',
				price: 55,
				id: '3',
				genres: ['Mystery', 'Puzzle'],
				platforms: ['PC'],
				releaseDate: '2024-01-02',
			},
		];
		const expectedNamesOfGamesSortedByDate = ['thisShouldBeFirst', 'thisShouldBeSecond', 'thisShouldBeThird'];

		render(<Shop loading={false} games={games} error={false} />);

		// Click the 'Release Date: Oldest First' sort option
		const dateSorterOption = screen.queryByText('Release Date: Oldest First');
		await user.click(dateSorterOption);

		// Get the game names
		const titles = screen.queryAllByTitle('game-name').map((title) => title.textContent);

		expect(titles).toEqual(expectedNamesOfGamesSortedByDate);
	});
});
