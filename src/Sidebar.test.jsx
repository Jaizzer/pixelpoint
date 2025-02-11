import { describe, it, expect } from 'vitest';
import { getAllByRole, render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';
import { MemoryRouter } from 'react-router-dom';

describe('Sidebar component', () => {
	it('contains all navigation items of the page', () => {
		render(
			<MemoryRouter>
				<Sidebar />
			</MemoryRouter>
		);
		const sidebar = screen.getByRole('navigation');
		const navigationItems = getAllByRole(sidebar, 'listitem');
		expect(navigationItems.length).toEqual(5);
	});
});
