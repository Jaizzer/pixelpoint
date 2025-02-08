import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchGameCard from './SearchGameCard';
import { MemoryRouter } from 'react-router-dom';

describe('Search Game Component', () => {
	it('renders the image using the provided link', () => {
		const game = {
			image: 'fakeLink',
			title: 'gameA',
			price: 56,
		};
		render(
			<MemoryRouter>
				<SearchGameCard image={game.image} title={game.title} price={game.price} />
			</MemoryRouter>
		);
		const image = screen.queryByRole('img');

		expect(image).not.toBeNull();
	});

	it('renders the provided title of the game', () => {
		const game = {
			image: 'fakeLink',
			title: 'gameA',
			price: 56,
		};
		render(
			<MemoryRouter>
				<SearchGameCard image={game.image} title={game.title} price={game.price} />
			</MemoryRouter>
		);
		const gameName = screen.queryByText(game.title);

		expect(gameName).not.toBeNull();
	});

	it('renders the provided price of the game', () => {
		const game = {
			image: 'fakeLink',
			title: 'gameA',
			price: 56,
		};
		render(
			<MemoryRouter>
				<SearchGameCard image={game.image} title={game.title} price={game.price} />
			</MemoryRouter>
		);
		const gamePrice = screen.queryByText(/56/);

		expect(gamePrice).not.toBeNull();
	});

	it('calls the callback function when clicked', async () => {
		const user = userEvent.setup();
		const game = {
			image: 'fakeLink',
			title: 'gameA',
			price: 56,
		};
		const doSomething = vi.fn();
		render(
			<MemoryRouter>
				<SearchGameCard image={game.image} title={game.title} price={game.price} onClickCallback={doSomething} />
			</MemoryRouter>
		);

		const gameCard = screen.queryByRole('search-game-card');

		await user.click(gameCard);

		expect(doSomething).toHaveBeenCalled();
	});
});
