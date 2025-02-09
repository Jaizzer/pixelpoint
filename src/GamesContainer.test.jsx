import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
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
				image: 'fakeLink',
				title: 'Game 1',
				price: 45,
				id: '1',
				genres: ['Action', 'Adventure'],
				platforms: ['Mobile'],
			},
			{
				image: 'fakeLink',
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
});
