import { describe, it, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import TopBar from './TopBar';
import { MemoryRouter } from 'react-router-dom';

vi.mock('./CartIconWithCount', () => ({
	default: ({ cartContentCount }) => <button>{cartContentCount}</button>,
}));

describe('TopBar component', () => {
	it('has a search bar', () => {
		render(
			<MemoryRouter>
				<TopBar />
			</MemoryRouter>
		);
		const searchBar = screen.queryByRole('textbox');
		expect(searchBar).not.toBeNull();
	});

	it('has 3 buttons for notification, shopping car, and logout', () => {
		render(
			<MemoryRouter>
				<TopBar />
			</MemoryRouter>
		);
		const buttons = screen.queryAllByRole('topbar-actions');
		expect(buttons.length).toEqual(3);
	});

	it('passes the right order count to the Cart icon', () => {
		render(
			<MemoryRouter>
				<TopBar cartContentCount={6} />
			</MemoryRouter>
		);
		const cart = screen.queryByText('6');
		expect(cart).not.toBeNull();
	});
});
