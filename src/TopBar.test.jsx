import { describe, it, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import TopBar from './TopBar.jsx';
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

	it('has shopping cart button', () => {
		render(
			<MemoryRouter>
				<TopBar />
			</MemoryRouter>
		);
		const buttons = screen.queryAllByRole('topbar-actions');
		expect(buttons.length).toEqual(1);
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
