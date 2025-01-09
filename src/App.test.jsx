import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import App from './App';

describe('App component', () => {
	it('contains the sidebar', () => {
		render(
			<MemoryRouter initialEntries={['/about']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
				</Routes>
			</MemoryRouter>
		);
		const sidebar = screen.queryByRole('navigation');
		expect(sidebar).not.toBeNull();
	});

	it('contains main content', () => {
		render(
			<MemoryRouter initialEntries={['/about']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		const mainContent = screen.queryByRole('main');
		expect(mainContent).not.toBeNull();
	});

	it('renders Home content in main content when "Home" nav item is clicked', async () => {
		const user = userEvent.setup();
		render(
			<MemoryRouter initialEntries={['/about']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		const homeNavItem = screen.queryByText('Home');

		await user.click(homeNavItem);

		const homePageContent = screen.queryByTitle('home');

		expect(homePageContent).not.toBeNull();
	});

	it('renders Account content in main content when "Account" nav item is clicked', async () => {
		const user = userEvent.setup();

		render(
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		const accountNavItem = screen.queryByText('Account');

		await user.click(accountNavItem);

		const accountPageContent = screen.queryByTitle('account');

		expect(accountPageContent).not.toBeNull();
	});

	it('renders Shop content in main content when "Shop" nav item is clicked', async () => {
		const user = userEvent.setup();

		render(
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		const shopNavItem = screen.queryByText('Shop');

		await user.click(shopNavItem);

		const shopPageContent = screen.queryByTitle('shop');

		expect(shopPageContent).not.toBeNull();
	});

	it('renders About content in main content when "About" nav item is clicked', async () => {
		const user = userEvent.setup();

		render(
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		const aboutNavItem = screen.queryByText('About');

		await user.click(aboutNavItem);

		const aboutPageContent = screen.queryByTitle('about');

		expect(aboutPageContent).not.toBeNull();
	});

	it('renders Home content in main content when "Logo" nav item is clicked', async () => {
		const user = userEvent.setup();

		render(
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		const logoNavItem = screen.queryByText('Logo');

		await user.click(logoNavItem);

		const logoPageContent = screen.queryByTitle('home');

		expect(logoPageContent).not.toBeNull();
	});
});
