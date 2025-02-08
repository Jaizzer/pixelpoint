import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';

// Mock the Search Dropdown component
vi.mock('./SearchDropdown', () => ({
	default: ({ loading, data, error }) => {
		let content;
		if (loading) {
			content = <div>Loading....</div>;
		} else if (error) {
			content = <div>Error</div>;
		} else if (data) {
			{
				data.map((game) => <div key={game.id}>{game.title}</div>);
			}
		}
		return (
			<div className="searchDropdown" title="search-result-dropdown">
				{content}
			</div>
		);
	},
}));

describe('Search Component', () => {
	beforeEach(() => {
		// Mock the fetch function
		window.fetch = vi.fn(() =>
			Promise.resolve({
				json: () =>
					Promise.resolve([
						{ image: 'imageLink', name: 'game1', price: 451, id: 1 },
						{ image: 'imageLink', name: 'game2', price: 552, id: 2 },
						{ image: 'imageLink', name: 'game3', price: 653, id: 3 },
						{ image: 'imageLink', name: 'game4', price: 654, id: 4 },
						{ image: 'imageLink', name: 'game5', price: 655, id: 5 },
					]),
			})
		);
	});

	it('shows the search result dropdown when the user typed to the search bar', async () => {
		const user = userEvent.setup();
		render(<Search />);
		const searchBar = screen.queryByRole('textbox');
		await user.type(searchBar, 'game');
		const searchResultDropdown = screen.queryByTitle('search-result-dropdown');
		expect(searchResultDropdown).not.toBeNull();
	});
});
