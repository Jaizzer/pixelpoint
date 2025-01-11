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

	it('renders Error page if the path does not exist', async () => {
		render(
			<MemoryRouter initialEntries={['/nonExistentPath']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		const errorPageContent = screen.queryByTitle('error');
		expect(errorPageContent).not.toBeNull();
	});

	it('renders Cart content in main content when "Cart" icon is clicked', async () => {
		const user = userEvent.setup();

		render(
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		const cartNavItem = screen.queryByTitle('cart-icon');

		await user.click(cartNavItem);

		const cartPageContent = screen.queryByTitle('cart');

		expect(cartPageContent).not.toBeNull();
	});

	it('increments the cart icon count indicator by 1 when an "Add to Cart" button is pressed in a product card', async () => {
		const user = userEvent.setup();

		render(
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		// Go to the Shop page content
		const shopNavItem = screen.queryByText('Shop');
		await user.click(shopNavItem);

		// Get all available 'Add to Cart' buttons
		const addToCartButtons = screen.queryAllByText(/Add to Cart/i);
		const numberOfAddToCartButtons = addToCartButtons.length;

		// Click all obtained 'Add to Cart' buttons
		for (let index = 0; index < addToCartButtons.length; index++) {
			await user.click(addToCartButtons[index]);
		}

		// Access the cart icon order count
		const orderCount = screen.queryByTitle('cart-content-count');

		expect(orderCount.textContent).toEqual(`${numberOfAddToCartButtons}`);
	});

	it('enables the incrementation of a product added to the cart when the corresponding "+" is clicked', async () => {
		const user = userEvent.setup();

		render(
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		// Go to the Shop page content
		const shopNavItem = screen.queryByText('Shop');
		await user.click(shopNavItem);

		// Get the first Add to Cart button
		const addToCartButton = screen.queryAllByText(/Add to Cart/i)[0];

		// Click the obtained add to cart button
		await user.click(addToCartButton);

		// Access the '+' icon
		const addButton = screen.queryByText('+');

		// Click the add button twice
		await user.click(addButton);
		await user.click(addButton);

		// Access the cart icon order count
		const orderCount = screen.queryByTitle('cart-content-count');

		expect(orderCount.textContent).toEqual('3');
	});
});
