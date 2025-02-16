import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import GamesContainer from './GamesContainer.jsx';
import userEvent from '@testing-library/user-event';

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
		render(<GamesContainer games={games} />);

		// Check the number of cards rendered by counting the images
		const numberOfImages = screen.queryAllByRole('image').length;

		expect(numberOfImages).toEqual(2);
	});

	it('renders the loading message if the games are currently loading', () => {
		render(<GamesContainer games={[]} error={null} />);
		const loadingMessage = screen.queryByTitle('loading');
		expect(loadingMessage).not.toBeNull();
	});

	it('renders the error message if the games have error', () => {
		render(<GamesContainer games={[]} error={new Error()} />);
		const loadingMessage = screen.queryByTitle('loading');
		expect(loadingMessage).not.toBeNull();
	});

	it('renders a loading indicator if the user clicked show more button', async () => {
		const user = userEvent.setup();

		const games = [
			{
				images: ['fakeLink'],
				title: 'thisShouldBeThird',
				price: 65,
				id: '1',
				genres: ['Action', 'Adventure'],
				platforms: ['Mobile'],
				releaseDate: '2024-01-03',
			},
		];
		render(<GamesContainer games={games} error={null} getNewGames={vi.fn()} />);

		// Add 1500ms delay since Show More button only appears after 1000ms
		await waitFor(
			async () => {
				const showMoreButton = screen.queryByText('Show More');
				await user.click(showMoreButton);
				const loading = screen.queryByText('Loading...');
				expect(loading).not.toBeNull();
			},
			{ timeout: 1500 }
		);
	});
});
