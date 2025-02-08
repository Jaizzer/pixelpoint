import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchDropdown from './SearchDropDown';

// Mock the Search Game Card component
vi.mock('./SearchGameCard', () => ({
	default: ({ title }) => {
		return (
			<div className="gameName" title="game-title">
				{title}
			</div>
		);
	},
}));

describe('Search Dropdown Component', () => {
	it('displays the loading indicator while collecting the results', () => {
		render(<SearchDropdown loading={true} data={null} error={false} />);
		const loadingIndicator = screen.queryByRole('loading-indicator');
		expect(loadingIndicator).not.toBeNull();
	});

	it("displays the error message if there's an error while collecting the results", () => {
		render(<SearchDropdown loading={false} data={null} error={true} />);
		const errorIndicator = screen.queryByTitle('error-indicator');
		expect(errorIndicator).not.toBeNull();
	});

	it('displays the games if the results have been collected', () => {
		const data = [
			{ title: 'gameA', id: 'gameA' },
			{ title: 'gameB', id: 'gameB' },
			{ title: 'gameC', id: 'gameC' },
		];
		render(<SearchDropdown loading={false} data={data} error={false} />);
		const searchGameCard = screen
			.queryAllByTitle('game-title')
			.map((gameCard) => ({ title: gameCard.textContent, id: gameCard.textContent }));
		expect(searchGameCard).toEqual(data);
	});
});
