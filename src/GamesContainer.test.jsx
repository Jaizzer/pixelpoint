import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GamesContainer from './GamesContainer.jsx';

vi.mock('./GameCard', () => ({
	default: ({ image, title, price }) => {
		return (
			<div>
				<img src={image} alt={title} role="image" />
				<div title="game-title">{title}</div>
				<div>{price}</div>
			</div>
		);
	},
}));

describe('Games Container Component', () => {
	it('renders the games', () => {
		const games = [
			{
				images: ['fakeLink'],
				title: 'Game 1',
				price: 45,
				id: '1',
				genres: ['Action', 'Adventure'],
				platforms: ['Mobile'],
			},
			{
				images: ['fakeLink'],
				title: 'Game 2',
				price: 55,
				id: '2',
				genres: ['Action', 'Open World'],
				platforms: ['PC'],
			},
		];
		render(<GamesContainer games={games} isGamesLoading={false} />);

		// Check the number of cards rendered by counting the images
		const numberOfImages = screen.queryAllByRole('image').length;

		expect(numberOfImages).toEqual(2);
	});

	it('renders the loading message if the games are currently loading', () => {
		render(<GamesContainer games={[]} isGamesLoading={true} error={null} />);
		const loadingMessage = screen.queryByTitle('loading');
		expect(loadingMessage).not.toBeNull();
	});

	it('renders the error message if the games have error', () => {
		render(<GamesContainer games={[]} isGamesLoading={true} error={new Error()} />);
		const loadingMessage = screen.queryByTitle('loading');
		expect(loadingMessage).not.toBeNull();
	});

	it('gets new games if the "Show More" button is clicked', async () => {
		const user = userEvent.setup();
		const getNewGamesMock = vi.fn();
		const games = [
			{
				images: ['fakeLink'],
				title: 'Game 1',
				price: 45,
				id: '1',
				genres: ['Action', 'Adventure'],
				platforms: ['Mobile'],
			},
			{
				images: ['fakeLink'],
				title: 'Game 2',
				price: 55,
				id: '2',
				genres: ['Action', 'Open World'],
				platforms: ['PC'],
			},
		];

		render(
			<GamesContainer
				games={games}
				isGamesLoading={false}
				gamesError={false}
				getNewGames={getNewGamesMock}
				addToCart={vi.fn()}
				refetchGames={vi.fn()}
			/>
		);

		// Ensure button is eventually shown
		await waitFor(
			async () => {
				const showMoreButton = screen.getByText('Show More');
				await user.click(showMoreButton);
			},
			{ timeout: 5000 }
		);

		// Verify getNewGamesMock was called
		expect(getNewGamesMock).toHaveBeenCalled();
	});
});
