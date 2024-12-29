import { describe, it, expect } from 'vitest';
import { getAllByRole, render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';

describe('Sidebar component', () => {
	it('contains all navigation items of the page', () => {
		render(<Sidebar />);
		const sidebar = screen.getByRole('navigation');
		const navigationItems = getAllByRole(sidebar, 'listitem');
		expect(navigationItems.length).toEqual(6);
	});
});
