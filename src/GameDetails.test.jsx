import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import GameDetails from './GameDetails';

vi.mock('./ImageSlider', () => ({
	default: ({ imageLinks }) => {
		return (
			<div className="imageSlider">
				{imageLinks.map((imageLink, index) => {
					<img src={imageLink} key={index}></img>;
				})}
			</div>
		);
	},
}));

describe('Game description', () => {
	it('renders the loading indicator if the games are still being fetched', () => {
		render(<GameDetails game={null} loading={true} error={false} />);
		const loadingIndicator = screen.queryByTitle('loading-indicator');
		expect(loadingIndicator).not.toBeNull();
	});

	it('renders the error message if there is an error fetching the game', () => {
		render(<GameDetails game={null} loading={false} error={true} />);
		const errorMessage = screen.queryByTitle('error-message');
		expect(errorMessage).not.toBeNull();
	});

	it('renders the game title', () => {
		const game = {
			title: 'Witcher 3',
			description: 'This is the game description',
			rating: 4.1,
			price: 45,
			developers: ['Developer A', 'Developer B'],
			releaseDate: '2024-01-12',
			platforms: ['Windows, Xbox, PS4'],
			genres: ['Action', 'Puzzle', 'Adventure'],
			screenshots: ['fakeLink1', 'fakeLink2'],
		};
		render(<GameDetails game={game} loading={false} error={false} />);
		const gameTitle = screen.queryByText('Witcher 3');
		expect(gameTitle).not.toBeNull();
	});

	it('renders the game description', () => {
		const game = {
			title: 'Witcher 3',
			description: 'This is the game description',
			rating: 4.1,
			price: 45,
			developers: ['Developer A', 'Developer B'],
			releaseDate: '2024-01-12',
			platforms: ['Windows, Xbox, PS4'],
			genres: ['Action', 'Puzzle', 'Adventure'],
			screenshots: ['fakeLink1', 'fakeLink2'],
		};
		render(<GameDetails game={game} loading={false} error={false} />);
		const gameDescription = screen.queryByText('This is the game description');
		expect(gameDescription).not.toBeNull();
	});

	it('renders the rating', () => {
		const game = {
			title: 'Witcher 3',
			description: 'This is the game description',
			rating: 4.1,
			price: 45,
			developers: ['Developer A', 'Developer B'],
			releaseDate: '2024-01-12',
			platforms: ['Windows, Xbox, PS4'],
			genres: ['Action', 'Puzzle', 'Adventure'],
			screenshots: ['fakeLink1', 'fakeLink2'],
		};
		render(<GameDetails game={game} loading={false} error={false} />);
		const gameRating = screen.queryByText(/4.1/);
		expect(gameRating).not.toBeNull();
	});

	it('renders the price', () => {
		const game = {
			title: 'Witcher 3',
			description: 'This is the game description',
			rating: 4.1,
			price: 41,
			developers: ['Developer A', 'Developer B'],
			releaseDate: '2024-01-12',
			platforms: ['Windows, Xbox, PS4'],
			genres: ['Action', 'Puzzle', 'Adventure'],
			screenshots: ['fakeLink1', 'fakeLink2'],
		};
		render(<GameDetails game={game} loading={false} error={false} />);
		const gamePrice = screen.queryByText(/\$41/);
		expect(gamePrice).not.toBeNull();
	});

	it('renders the developer/s of the game', () => {
		const game = {
			title: 'Witcher 3',
			description: 'This is the game description',
			rating: 4.1,
			price: 45,
			developers: ['Developer A', 'Developer B'],
			releaseDate: '2024-01-12',
			platforms: ['Windows, Xbox, PS4'],
			genres: ['Action', 'Puzzle', 'Adventure'],
			screenshots: ['fakeLink1', 'fakeLink2'],
		};
		render(<GameDetails game={game} loading={false} error={false} />);
		const gameDeveloper = screen.queryByText('Developer A, Developer B');
		expect(gameDeveloper).not.toBeNull();
	});

	it('renders the release date of the game', () => {
		const game = {
			title: 'Witcher 3',
			description: 'This is the game description',
			rating: 4.1,
			price: 45,
			developers: ['Developer A', 'Developer B'],
			releaseDate: '2024-01-12',
			platforms: ['Windows, Xbox, PS4'],
			genres: ['Action', 'Puzzle', 'Adventure'],
			screenshots: ['fakeLink1', 'fakeLink2'],
		};
		render(<GameDetails game={game} loading={false} error={false} />);
		const gameReleaseDate = screen.queryByText('January 12, 2024');
		expect(gameReleaseDate).not.toBeNull();
	});

	it('renders the platforms of the game', () => {
		const game = {
			title: 'Witcher 3',
			description: 'This is the game description',
			rating: 4.1,
			price: 45,
			developers: ['Developer A', 'Developer B'],
			releaseDate: '2024-01-12',
			platforms: ['Windows, Xbox, PS4'],
			genres: ['Action', 'Puzzle', 'Adventure'],
			screenshots: ['fakeLink1', 'fakeLink2'],
		};
		render(<GameDetails game={game} loading={false} error={false} />);
		const gamePlatforms = screen.queryByText('Windows, Xbox, PS4');
		expect(gamePlatforms).not.toBeNull();
	});

	it('renders the genres of the game', () => {
		const game = {
			title: 'Witcher 3',
			description: 'This is the game description',
			rating: 4.1,
			price: 45,
			developers: ['Developer A', 'Developer B'],
			releaseDate: '2024-01-12',
			platforms: ['Windows, Xbox, PS4'],
			genres: ['Action', 'Puzzle', 'Adventure'],
			screenshots: ['fakeLink1', 'fakeLink2'],
		};
		render(<GameDetails game={game} loading={false} error={false} />);
		const gameGenres = screen.queryByText('Action, Puzzle, Adventure');
		expect(gameGenres).not.toBeNull();
	});
});
