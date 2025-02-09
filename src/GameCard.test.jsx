import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import GameCard from './GameCard';
import { MemoryRouter } from 'react-router-dom';

describe('Game Card Component', () => {
	it('contains the game image', () => {
		render(
			<MemoryRouter>
				<GameCard title="Game 1" />
			</MemoryRouter>
		);
		const image = screen.queryByRole('img');
		expect(image).not.toBeNull();
	});

	it('contains the game title', () => {
		render(
			<MemoryRouter>
				<GameCard title="Game 1" />{' '}
			</MemoryRouter>
		);
		const title = screen.queryByText('Game 1');
		expect(title).not.toBeNull();
	});

	it('contains the game price', () => {
		render(
			<MemoryRouter>
				<GameCard price={56.0} />{' '}
			</MemoryRouter>
		);
		const price = screen.queryByText(
			/[$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]/
		);
		expect(price).not.toBeNull();
	});
});
