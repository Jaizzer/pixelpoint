import { describe, it, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import TopBar from './TopBar';

vi.mock('./CartIcon', () => ({
	default: ({cartContentCount}) => <button>{cartContentCount}</button>,
}));

describe('TopBar component', () => {
	it('has a search bar', () => {
		render(<TopBar />);
		const searchBar = screen.queryByRole('textbox');
		expect(searchBar).not.toBeNull();
	});

	it('has 3 buttons for notification, shopping, cart', () => {
		render(<TopBar />);
		const buttons = screen.queryAllByRole('button');
		expect(buttons.length).toEqual(3);
	});

	it('passes the right order count to the Cart icon', () => {
		render(<TopBar cartContentCount={6} />);
		const cart = screen.queryByText('6');
		screen.debug();
		expect(cart).not.toBeNull();
	});
});
