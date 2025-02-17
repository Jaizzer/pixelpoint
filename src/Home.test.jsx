import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Home from './Home.jsx';

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

vi.mock('./FeaturedGames', () => ({
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

describe('Home Component', () => {
	it('displays an error message if the latest or featured games encountered an error', () => {
		render(
			<MemoryRouter>
				<Home latestGamesError={true} featuredGames={false} />
			</MemoryRouter>
		);
		expect(screen.queryByTitle('error-message')).not.toBeNull();
	});

	it('performs refetch if the latest games encountered an error', async () => {
		const user = userEvent.setup();
		const refetchLatestGamesMock = vi.fn();
		const refetchFeaturedGamesMock = vi.fn();
		render(
			<MemoryRouter>
				<Home
					latestGames={[]}
					latestGamesError={true}
					isLatestGamesLoading={false}
					refetchLatestGames={refetchLatestGamesMock}
					featuredGames={[]}
					featuredGamesError={false}
					refetchFeaturedGames={refetchFeaturedGamesMock}
				/>
			</MemoryRouter>
		);
		const tryAgainButton = screen.queryByText('Try Again');
		await user.click(tryAgainButton);
		expect(refetchLatestGamesMock).toHaveBeenCalled();
	});

	it('performs refetch if the featured games encountered an error', async () => {
		const user = userEvent.setup();
		const refetchLatestGamesMock = vi.fn();
		const refetchFeaturedGamesMock = vi.fn();
		render(
			<MemoryRouter>
				<Home
					latestGames={[]}
					latestGamesError={true}
					isLatestGamesLoading={false}
					refetchLatestGames={refetchLatestGamesMock}
					featuredGames={[]}
					featuredGamesError={true}
					refetchFeaturedGames={refetchFeaturedGamesMock}
				/>
			</MemoryRouter>
		);
		const tryAgainButton = screen.queryByText('Try Again');
		await user.click(tryAgainButton);
		expect(refetchFeaturedGamesMock).toHaveBeenCalled();
	});
});
