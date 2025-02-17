import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import FeaturedGames from './FeaturedGames.jsx';

describe('Featured Games Component', () => {
	it('displays the Loading indicator while loading the games', () => {
		render(
			<MemoryRouter>
				<FeaturedGames games={[]} gamesError={null} isGamesLoading={true} />
			</MemoryRouter>
		);
		const loadingIndicator = screen.queryByTitle('loading-indicator');
		expect(loadingIndicator).not.toBeNull();
	});

	it('displays error indicator if there is an error encountered', () => {
		render(
			<MemoryRouter>
				<FeaturedGames games={[]} gamesError={new Error()} />
			</MemoryRouter>
		);
		const errorIndicator = screen.queryByTitle('error-indicator');
		expect(errorIndicator).not.toBeNull();
	});

	it('displays the featured games', () => {
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
			<MemoryRouter>
				<FeaturedGames games={games} gamesError={null} />
			</MemoryRouter>
		);
		const featuredGames = screen.queryAllByText(/Game/);
		expect(featuredGames.length).toEqual(games.length);
	});

	it('renders the first game as the selected featured game by default', () => {
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
			<MemoryRouter>
				<FeaturedGames games={games} gamesError={null} />
			</MemoryRouter>
		);
		const selectedFeaturedGame = screen.queryByTitle('selected-featured-game');
		expect(selectedFeaturedGame.textContent).toMatch(/Game 1/);
	});

	it('changes the selected featured game when an unselected featured game is clicked', async () => {
		const user = userEvent.setup();
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
			<MemoryRouter>
				<FeaturedGames games={games} gamesError={null} />
			</MemoryRouter>
		);
		const unselectedFeaturedGame = screen.queryByTitle('unselected-featured-game');
		await user.click(unselectedFeaturedGame);
		const selectedFeaturedGame = screen.queryByTitle('selected-featured-game');
		expect(selectedFeaturedGame.textContent).toMatch(/Game 2/);
	});
});
