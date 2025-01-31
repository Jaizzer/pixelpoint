import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import App from './App';
import { useState } from 'react';

vi.mock('./useFetchProduct.jsx', () => ({
	default: () => {
		const product = {
			id: '1',
			title: 'Product',
			description: 'This is the product',
			rating: 4.47,
			price: 45,
			developers: ['Developer A', 'Developer B'],
			genres: ['Action'],
			releaseDate: '2012-12-12',
			platforms: ['platform1', 'platform2'],
			screenshots: ['fakeLink1', 'fakeLink2', 'fakeLink3'],
		};
		const isProductHaveError = false;
		const isProductLoading = false;
		return { product, isProductHaveError, isProductLoading };
	},
}));

vi.mock('./useFetchProducts.jsx', () => {
	return {
		default: () => {
			const [products, setProducts] = useState([
				{
					productName: 'product1',
					productPrice: 50,
					productId: '1',
					genre: ['Genre 1', 'Genre 2', 'Genre 3'],
					platforms: ['Platform 1', 'Platform 2', 'Platform 3'],
					unitsSold: 300,
					releaseDate: '2024-01-24',
					esrbRating: 'Everyone',
				},
			]);
			const isProductsLoading = false;
			const isProductsHaveError = false;
			const getNewProducts = vi.fn(() => {
				setProducts((products) =>
					products.concat([
						{
							productName: 'product2',
							productPrice: 50,
							productId: '2',
							genre: ['Genre 1', 'Genre 2', 'Genre 3'],
							platforms: ['Platform 1', 'Platform 2', 'Platform 3'],
							unitsSold: 300,
							releaseDate: '2024-01-24',
							esrbRating: 'Everyone',
						},
					])
				);
			});
			return [products, isProductsHaveError, isProductsLoading, getNewProducts];
		},
	};
});

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

	it("renders the details page of the game when a game's image is clicked", async () => {
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
		render(
			<MemoryRouter initialEntries={['/shop']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

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

		await waitFor(() => {
			// The number of product cards after scrolling to the bottom
			const productCardCountAfterBottomScroll = screen.queryAllByTitle('product-card').length;

			// The product cards should have doubled after the scroll
			expect(productCardCountAfterBottomScroll).toEqual(productCardCountBeforeBottomScroll * 2);
		});
	});

	it('allows user to add products to card when inside the product details page', async () => {
		const user = userEvent.setup();
		render(
			<MemoryRouter initialEntries={['/gameDetails/1']}>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/:content" element={<App />} />
					<Route path="/:content/:id" element={<App />} />
				</Routes>
			</MemoryRouter>
		);

		// Click the add to cart button
		const addToCarButton = screen.queryByText(/Add to Cart/i);
		await user.click(addToCarButton);

		// Check the cart content count indicator
		const cartContentCountIndicator = screen.queryByTitle('cart-content-count');

		expect(cartContentCountIndicator.textContent).toEqual('1');
	});
});
