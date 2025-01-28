import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import App from './App';

describe('App component', () => {
	it('contains the sidebar', async () => {
		render(
			<MemoryRouter initialEntries={['/about']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		await waitFor(() => {
			const sidebar = screen.queryByRole('navigation');
			expect(sidebar).not.toBeNull();
		});
	});

	it('contains main content', async () => {
		render(
			<MemoryRouter initialEntries={['/about']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		await waitFor(() => {
			const mainContent = screen.queryByRole('main');
			expect(mainContent).not.toBeNull();
		});
	});

	it("renders Home content in '/' route", async () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
				</Routes>
			</MemoryRouter>
		);
		await waitFor(() => {
			const homePageContent = screen.queryByTitle('home');
			expect(homePageContent).not.toBeNull();
		});
	});

	it("renders Account content in '/account' route", async () => {
		render(
			<MemoryRouter initialEntries={['/account']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
				</Routes>
			</MemoryRouter>
		);
		await waitFor(() => {
			const accountPageContent = screen.queryByTitle('account');
			expect(accountPageContent).not.toBeNull();
		});
	});

	it("renders Shop content in '/shop' route", async () => {
		render(
			<MemoryRouter initialEntries={['/shop']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
				</Routes>
			</MemoryRouter>
		);
		await waitFor(() => {
			const shopPageContent = screen.queryByTitle('shop');
			expect(shopPageContent).not.toBeNull();
		});
	});

	it("renders About content in '/about' route", async () => {
		render(
			<MemoryRouter initialEntries={['/about']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
				</Routes>
			</MemoryRouter>
		);
		await waitFor(() => {
			const aboutPageContent = screen.queryByTitle('about');
			expect(aboutPageContent).not.toBeNull();
		});
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
		await waitFor(() => {
			const errorPageContent = screen.queryByTitle('error');
			expect(errorPageContent).not.toBeNull();
		});
	});

	it("renders Cart content in '/cart' route", async () => {
		render(
			<MemoryRouter initialEntries={['/cart']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		await waitFor(() => {
			const cartPageContent = screen.queryByTitle('cart');
			expect(cartPageContent).not.toBeNull();
		});
	});

	it('increments the cart icon count indicator by 1 when an "Add to Cart" button is pressed in a product card', async () => {
		window.fetch = vi
			.fn()
			// Mock the fetch for getting the products
			.mockResolvedValueOnce(
				Promise.resolve({
					json: () =>
						Promise.resolve({
							results: [
								{
									background_image: 'imageLink',
									name: 'product1',
									id: 1,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product2',
									id: 2,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product3',
									id: 3,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product4',
									id: 4,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product5',
									id: 5,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
							],
						}),
				})
			);

		const user = userEvent.setup();
		render(
			<MemoryRouter initialEntries={['/shop']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		// Wait for the shop to fetch all products
		await waitFor(async () => {
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
	});

	it('enables the incrementation of a product added to the cart when the corresponding "+" is clicked', async () => {
		window.fetch = vi
			.fn()
			// Mock the fetch for getting the products
			.mockResolvedValueOnce(
				Promise.resolve({
					json: () =>
						Promise.resolve({
							results: [
								{
									background_image: 'imageLink',
									name: 'product1',
									id: 1,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product2',
									id: 2,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product3',
									id: 3,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product4',
									id: 4,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product5',
									id: 5,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
							],
						}),
				})
			);
		const user = userEvent.setup();
		render(
			<MemoryRouter initialEntries={['/shop']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		await waitFor(async () => {
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

	it('enables the decrementation of a product added to the cart when the corresponding "-" is clicked', async () => {
		window.fetch = vi
			.fn()
			// Mock the fetch for getting the products
			.mockResolvedValueOnce(
				Promise.resolve({
					json: () =>
						Promise.resolve({
							results: [
								{
									background_image: 'imageLink',
									name: 'product1',
									id: 1,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product2',
									id: 2,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product3',
									id: 3,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product4',
									id: 4,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product5',
									id: 5,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
							],
						}),
				})
			);

		const user = userEvent.setup();
		render(
			<MemoryRouter initialEntries={['/shop']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		await waitFor(async () => {
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

			// Access the '-' icon
			const subtractButton = screen.queryByText('-');

			// Click the subtract button once
			await user.click(subtractButton);

			// Access the cart icon order count
			const orderCount = screen.queryByTitle('cart-content-count');

			expect(orderCount.textContent).toEqual('2');
		});
	});

	it('enables the changes in the order quantity input box to reflect on the cart contents', async () => {
		window.fetch = vi
			.fn()
			// Mock the fetch for getting the products
			.mockResolvedValueOnce(
				Promise.resolve({
					json: () =>
						Promise.resolve({
							results: [
								{
									background_image: 'imageLink',
									name: 'product1',
									id: 1,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product2',
									id: 2,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product3',
									id: 3,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product4',
									id: 4,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product5',
									id: 5,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
							],
						}),
				})
			);

		const user = userEvent.setup();
		render(
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		await waitFor(async () => {
			// Get the first Add to Cart button
			const addToCartButton = screen.queryAllByText(/Add to Cart/i)[0];

			// Click the obtained add to cart button
			await user.click(addToCartButton);

			// Access the input box
			const inputInShopPage = screen.queryByRole('textbox');

			// Modify the input value
			await user.type(inputInShopPage, '8');

			// Go to the Cart page content
			const cartNavItem = screen.queryByText('Cart');
			await user.click(cartNavItem);

			// Check if the input textbox of the added item in the cart matches
			const inputInCartPage = screen.queryByRole('textbox');
			expect(inputInCartPage.value).toEqual(inputInShopPage.value);
		});
	});

	it("renders the details page of the game when a game's image is clicked", async () => {
		window.fetch = vi
			.fn()
			// Mock the fetch for getting the products
			.mockResolvedValueOnce(
				Promise.resolve({
					json: () =>
						Promise.resolve({
							results: [
								{
									background_image: 'imageLink',
									name: 'product1',
									id: 1,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product2',
									id: 2,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product3',
									id: 3,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product4',
									id: 4,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product5',
									id: 5,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
							],
						}),
				})
			)
			// Mock the fetch for getting the details of the clicked product
			.mockResolvedValueOnce(
				Promise.resolve({
					json: () =>
						Promise.resolve({
							id: 1,
							name: 'Witcher 3',
							description_raw: 'This is the product description',
							esrb_rating: 4.1,
							developers: [{ name: 'Developer A' }, { name: 'Developer B' }],
							released: '2024-01-12',
							platforms: [{ platform: { name: 'Windows' } }, { platform: { name: 'Xbox' } }, { platform: { name: 'PS5' } }],
							genres: [{ name: 'Action' }, { name: 'Puzzle' }, { name: 'Adventure' }],
							background_image: 'fakeImageLink',
						}),
				})
			)
			// Mock the fetch for getting the screenshots of the clicked product
			.mockResolvedValueOnce(
				Promise.resolve({
					json: () =>
						Promise.resolve({
							results: [
								{
									image: 'fakeImageLink1',
								},
								{
									image: 'fakeImageLink2',
								},
								{
									image: 'fakeImageLink3',
								},
							],
						}),
				})
			);

		// Render the app with initial route pointing to game details
		render(
			<MemoryRouter initialEntries={['/gameDetails/1']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
					<Route path="/:content/:id" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		// Wait for the loading state to finish and the description to appear
		await waitFor(() => {
			const description = screen.queryByText('Description');
			expect(description).not.toBeNull();
		});
	});

	it('renders the new products when the user scroll to the bottom', async () => {
		// Create new fetch mock for getting a second wave of products
		window.fetch = vi
			.fn()
			// Mock the fetch for getting the first wave of products
			.mockResolvedValueOnce(
				Promise.resolve({
					json: () =>
						Promise.resolve({
							results: [
								{
									background_image: 'imageLink',
									name: 'product1',
									id: 1,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product2',
									id: 2,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product3',
									id: 3,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product4',
									id: 4,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product5',
									id: 5,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
							],
						}),
				})
			)
			// Mock the fetch for getting the second wave of products
			.mockResolvedValueOnce(
				Promise.resolve({
					json: () =>
						Promise.resolve({
							results: [
								{
									background_image: 'imageLink',
									name: 'product6',
									id: 6,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product7',
									id: 7,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product8',
									id: 8,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product9',
									id: 9,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
								{
									background_image: 'imageLink',
									name: 'product10',
									id: 10,
									genres: [{ name: 'Action' }],
									platforms: [{ name: 'Windows' }],
									released: '2024-01-24',
									esrb_rating: { name: 'Everyone' },
								},
							],
						}),
				})
			);

		render(
			<MemoryRouter initialEntries={['/shop']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		await waitFor(async () => {
			// The number of product cards before scrolling to the bottom
			const productCardCountBeforeBottomScroll = screen.queryAllByTitle('product-card').length;

			if (screen.queryAllByTitle('product-card').length > 0) {
				// Mock the user's action of scrolling to the bottom
				const productCardsContainer = screen.getByTitle('product-cards-container');
				Object.defineProperty(productCardsContainer, 'scrollHeight', { value: 1000 });
				Object.defineProperty(productCardsContainer, 'clientHeight', { value: 300 });
				Object.defineProperty(productCardsContainer, 'scrollTop', { value: 700 });
				fireEvent.scroll(productCardsContainer);
			}

			// The number of product cards after scrolling to the bottom
			const productCardCountAfterBottomScroll = screen.queryAllByTitle('product-card').length;

			// The product cards should have doubled after the scroll
			expect(productCardCountAfterBottomScroll).toEqual(productCardCountBeforeBottomScroll * 2);
		});
	});
});
