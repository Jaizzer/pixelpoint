import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import GamesContainer from './GamesContainer.jsx';

vi.mock('./ProductCard', () => ({
	default: ({ imageLink, productName, productPrice }) => {
		return (
			<div>
				<img src={imageLink} alt={productName} role="image" />
				<div title="product-name">{productName}</div>
				<div>{productPrice}</div>
			</div>
		);
	},
}));

describe('Games Container Component', () => {
	it('renders the games', () => {
		const games = [
			{
				imageLink: 'fakeLink',
				productName: 'Game 1',
				productPrice: 45,
				productId: '1',
				genre: ['Action', 'Adventure'],
				platforms: ['Mobile'],
			},
			{
				imageLink: 'fakeLink',
				productName: 'Game 2',
				productPrice: 55,
				productId: '2',
				genre: ['Action', 'Open World'],
				platforms: ['PC'],
			},
		];
		render(<GamesContainer games={games} />);

		// Check the number of cards rendered by counting the images
		const numberOfImages = screen.queryAllByRole('image').length;

		expect(numberOfImages).toEqual(2);
	});
});
