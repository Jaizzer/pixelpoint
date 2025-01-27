import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Shop from './Shop';
import { userEvent } from '@testing-library/user-event';

vi.mock('./ProductCard', () => ({
	default: ({ imageLink, productName, productPrice }) => {
		return (
			<div>
				<img src={imageLink} alt={productName} role="image" />
				<div title="product-name">{productName}</div>
				<div>{productPrice}</div>
			</div>
		);
	},
}));

vi.mock('./DropdownFilter', () => ({
	default: ({ items, title, onDropdownItemClick }) => {
		const dropdownItems = items.map((item) => {
			return (
				<div key={item.name} className="dropdownItem">
					<input
						type="checkbox"
						id={item.name}
						name={item.name}
						onChange={() => {
							onDropdownItemClick(item.name);
						}}
					/>
					<label htmlFor={item.name}>{item.name}</label>
				</div>
			);
		});

		return (
			<div>
				<div className="filterButton">{title}</div>
				<div className="dropdown">{dropdownItems}</div>
			</div>
		);
	},
}));

vi.mock('./PriceRangeController', () => ({
	default: ({ onPriceRangeSet }) => {
		return (
			<div
				className="priceRangeController"
				onClick={() => {
					onPriceRangeSet({ min: 50, max: 100 });
				}}
			>
				Price Range Controller
			</div>
		);
	},
}));

vi.mock('./Sorter', () => ({
	default: ({ onSortItemClick }) => {
		return (
			<div className="sorter">
				<button>Sort</button>
				<div
					title="sort-option"
					onClick={() => {
						onSortItemClick('Popularity: High to Low');
					}}
				>
					Popularity: High to Low
				</div>
				<div
					title="sort-option"
					onClick={() => {
						onSortItemClick('Popularity: Low to High');
					}}
				>
					Popularity: Low to High
				</div>
				<div
					title="sort-option"
					onClick={() => {
						onSortItemClick('Release Date: Newest First');
					}}
				>
					Release Date: Newest First
				</div>
				<div
					title="sort-option"
					onClick={() => {
						onSortItemClick('Release Date: Oldest First');
					}}
				>
					Release Date: Oldest First
				</div>
				<div
					title="sort-option"
					onClick={() => {
						onSortItemClick('Name: A to Z');
					}}
				>
					Name: A to Z
				</div>
				<div
					title="sort-option"
					onClick={() => {
						onSortItemClick('Name: Z to A');
					}}
				>
					Name: Z to A
				</div>
				<div
					title="sort-option"
					onClick={() => {
						onSortItemClick('Price: Low to High');
					}}
				>
					Price: Low to High
				</div>
				<div
					title="sort-option"
					onClick={() => {
						onSortItemClick('Price: High to Low');
					}}
				>
					Price: High to Low
				</div>
			</div>
		);
	},
}));

describe('Shop component', () => {
	it('renders the entire products if no filter is applied', () => {
		const products = [
			{
				imageLink: 'fakeLink',
				productName: 'product',
				productPrice: '$45',
				productId: '1',
				genre: ['Action', 'Adventure'],
				platforms: ['Mobile'],
			},
			{
				imageLink: 'fakeLink',
				productName: 'product',
				productPrice: '$55',
				productId: '2',
				genre: ['Action', 'Open World'],
				platforms: ['PC'],
			},
			{ imageLink: 'fakeLink', productName: 'product', productPrice: '$65', productId: '3', genre: ['Mystery', 'Puzzle'], platforms: ['PC'] },
		];
		render(<Shop products={products} />);

		// Existence of an image guarantees the existence of a product card
		const images = screen.queryAllByAltText('product');

		expect(images.length).toBe(products.length);
	});

	it('renders the loading message if the products are currently loading', () => {
		render(<Shop loading={true} products={[]} error={false} />);
		const loadingMessage = screen.queryByTitle('loading');
		expect(loadingMessage).not.toBeNull();
	});

	it('renders the error message if there is an error', () => {
		render(<Shop loading={false} products={[]} error={true} />);
		const errorMessage = screen.queryByTitle('error');
		expect(errorMessage).not.toBeNull();
	});

	it('filters the product when a dropdown filter is clicked', async () => {
		const user = userEvent.setup();
		const products = [
			{
				imageLink: 'fakeLink',
				productName: 'product',
				productPrice: '$45',
				productId: '1',
				genre: ['Action', 'Adventure'],
				platforms: ['Mobile'],
			},
			{
				imageLink: 'fakeLink',
				productName: 'product',
				productPrice: '$55',
				productId: '2',
				genre: ['Action', 'Open World'],
				platforms: ['PC'],
			},
			{ imageLink: 'fakeLink', productName: 'product', productPrice: '$65', productId: '3', genre: ['Mystery', 'Puzzle'], platforms: ['PC'] },
		];
		render(<Shop loading={false} products={products} error={false} />);

		// Filter all 'Action'
		const actionDropdownFilter = screen.queryByText('Action');
		await user.click(actionDropdownFilter);

		// Check if the products that are 'Action' genre the only products that remained
		// by checking if the number of images corresponds to the number of Action products provided which is 2
		const isActionGenresRemained = screen.queryAllByRole('image');

		expect(isActionGenresRemained.length).toEqual(2);
	});

	it('filters the products by platform', async () => {
		const user = userEvent.setup();
		const products = [
			{
				imageLink: 'fakeLink',
				productName: 'product',
				productPrice: '$45',
				productId: '1',
				genre: ['Action', 'Adventure'],
				platforms: ['Mobile'],
			},
			{
				imageLink: 'fakeLink',
				productName: 'product',
				productPrice: '$55',
				productId: '2',
				genre: ['Action', 'Open World'],
				platforms: ['PC'],
			},
			{ imageLink: 'fakeLink', productName: 'product', productPrice: '$65', productId: '3', genre: ['Mystery', 'Puzzle'], platforms: ['PC'] },
		];
		render(<Shop loading={false} products={products} error={false} />);
		// Filter all products available for 'PC' platform
		const pcDropdownFilter = screen.queryByText('PC');
		await user.click(pcDropdownFilter);

		const isProductsForPCRemained = screen.queryAllByRole('image').length === 2;
		expect(isProductsForPCRemained).toBeTruthy();
	});

	it('filters the products by age rating', async () => {
		const user = userEvent.setup();
		const products = [
			{
				imageLink: 'fakeLink',
				productName: 'product',
				productPrice: '$45',
				productId: '1',
				genre: ['Action', 'Adventure'],
				platforms: ['Mobile'],
				esrbRating: 'Everyone 10+',
			},
			{
				imageLink: 'fakeLink',
				productName: 'product',
				productPrice: '$55',
				productId: '2',
				genre: ['Action', 'Open World'],
				platforms: ['PC'],
				esrbRating: 'Mature',
			},
			{
				imageLink: 'fakeLink',
				productName: 'product',
				productPrice: '$65',
				productId: '3',
				genre: ['Mystery', 'Puzzle'],
				platforms: ['PC'],
				esrbRating: 'Mature',
			},
		];
		render(<Shop loading={false} products={products} error={false} />);
		// Filter all products that are age rated as 'Mature'
		const ageRatingDropdownFilter = screen.queryByText('Mature');
		await user.click(ageRatingDropdownFilter);

		const isMatureRatedProductsRemained = screen.queryAllByRole('image').length === 2;
		expect(isMatureRatedProductsRemained).toBeTruthy();
	});

	it('filters the products base on the price range', async () => {
		const user = userEvent.setup();
		const products = [
			{
				imageLink: 'fakeLink',
				productName: 'product1',
				productPrice: 650,
				productId: '1',
				genre: ['Action', 'Adventure'],
				platforms: ['Mobile'],
				unitsSold: 10,
			},
			{
				imageLink: 'fakeLink',
				productName: 'product2',
				productPrice: 23,
				productId: '2',
				genre: ['Action', 'Open World'],
				platforms: ['PC'],
				unitsSold: 20,
			},
			{
				imageLink: 'fakeLink',
				productName: 'product3',
				productPrice: 55,
				productId: '3',
				genre: ['Mystery', 'Puzzle'],
				platforms: ['PC'],
				unitsSold: 30,
			},
		];
		render(<Shop loading={false} products={products} error={false} />);
		const priceRangeControllerMock = screen.queryByText('Price Range Controller');
		await user.click(priceRangeControllerMock);

		const productThatFitsThePriceRange = screen.queryAllByTitle('product-name')[0];
		expect(productThatFitsThePriceRange.textContent).toEqual('product3');
	});

	it('sorts the products by popularity from high to low', async () => {
		const user = userEvent.setup();
		const products = [
			{
				imageLink: 'fakeLink',
				productName: 'thisShouldBeThird',
				productPrice: 65,
				productId: '1',
				genre: ['Action', 'Adventure'],
				platforms: ['Mobile'],
				unitsSold: 10,
			},
			{
				imageLink: 'fakeLink',
				productName: 'thisShouldBeSecond',
				productPrice: 45,
				productId: '2',
				genre: ['Action', 'Open World'],
				platforms: ['PC'],
				unitsSold: 20,
			},
			{
				imageLink: 'fakeLink',
				productName: 'thisShouldBeFirst',
				productPrice: 55,
				productId: '3',
				genre: ['Mystery', 'Puzzle'],
				platforms: ['PC'],
				unitsSold: 30,
			},
		];
		const expectedNamesOfProductsSortedByPopularity = ['thisShouldBeFirst', 'thisShouldBeSecond', 'thisShouldBeThird'];

		render(<Shop loading={false} products={products} error={false} />);

		// Click the 'Popularity: High to Low' sort option
		const popularitySorterOption = screen.queryByText('Popularity: High to Low');
		await user.click(popularitySorterOption);

		// Get the product names
		const productNames = screen.queryAllByTitle('product-name').map((productName) => productName.textContent);

		expect(productNames).toEqual(expectedNamesOfProductsSortedByPopularity);
	});

	it('sorts the products by popularity from low to high', async () => {
		const user = userEvent.setup();
		const products = [
			{
				imageLink: 'fakeLink',
				productName: 'thisShouldBeSecond',
				productPrice: 65,
				productId: '1',
				genre: ['Action', 'Adventure'],
				platforms: ['Mobile'],
				unitsSold: 20,
			},
			{
				imageLink: 'fakeLink',
				productName: 'thisShouldBeThird',
				productPrice: 45,
				productId: '2',
				genre: ['Action', 'Open World'],
				platforms: ['PC'],
				unitsSold: 30,
			},
			{
				imageLink: 'fakeLink',
				productName: 'thisShouldBeFirst',
				productPrice: 55,
				productId: '3',
				genre: ['Mystery', 'Puzzle'],
				platforms: ['PC'],
				unitsSold: 10,
			},
		];
		const expectedNamesOfProductsSortedByPopularity = ['thisShouldBeFirst', 'thisShouldBeSecond', 'thisShouldBeThird'];

		render(<Shop loading={false} products={products} error={false} />);

		// Click the 'Popularity: Low to High' sort option
		const popularitySorterOption = screen.queryByText('Popularity: Low to High');
		await user.click(popularitySorterOption);

		// Get the product names
		const productNames = screen.queryAllByTitle('product-name').map((productName) => productName.textContent);
		expect(productNames).toEqual(expectedNamesOfProductsSortedByPopularity);
	});

	it('sorts the products by price from low to high', async () => {
		const user = userEvent.setup();
		const products = [
			{
				imageLink: 'fakeLink',
				productName: 'thisShouldBeThird',
				productPrice: 65,
				productId: '1',
				genre: ['Action', 'Adventure'],
				platforms: ['Mobile'],
			},
			{
				imageLink: 'fakeLink',
				productName: 'thisShouldBeFirst',
				productPrice: 45,
				productId: '2',
				genre: ['Action', 'Open World'],
				platforms: ['PC'],
			},
			{
				imageLink: 'fakeLink',
				productName: 'thisShouldBeSecond',
				productPrice: 55,
				productId: '3',
				genre: ['Mystery', 'Puzzle'],
				platforms: ['PC'],
			},
		];
		const expectedNamesOfProductsSortedByPrice = ['thisShouldBeFirst', 'thisShouldBeSecond', 'thisShouldBeThird'];

		render(<Shop loading={false} products={products} error={false} />);

		// Click the 'Price: Low to High' sort option
		const priceSorterOption = screen.queryByText('Price: Low to High');
		await user.click(priceSorterOption);

		// Get the product names
		const productNames = screen.queryAllByTitle('product-name').map((productName) => productName.textContent);

		expect(productNames).toEqual(expectedNamesOfProductsSortedByPrice);
	});

	it('sorts the products by price from high to low', async () => {
		const user = userEvent.setup();
		const products = [
			{
				imageLink: 'fakeLink',
				productName: 'thisShouldBeFirst',
				productPrice: 65,
				productId: '1',
				genre: ['Action', 'Adventure'],
				platforms: ['Mobile'],
			},
			{
				imageLink: 'fakeLink',
				productName: 'thisShouldBeThird',
				productPrice: 45,
				productId: '2',
				genre: ['Action', 'Open World'],
				platforms: ['PC'],
			},
			{
				imageLink: 'fakeLink',
				productName: 'thisShouldBeSecond',
				productPrice: 55,
				productId: '3',
				genre: ['Mystery', 'Puzzle'],
				platforms: ['PC'],
			},
		];
		const expectedNamesOfProductsSortedByPrice = ['thisShouldBeFirst', 'thisShouldBeSecond', 'thisShouldBeThird'];

		render(<Shop loading={false} products={products} error={false} />);

		// Click the 'Price: High to Low' sort option
		const priceSorterOption = screen.queryByText('Price: High to Low');
		await user.click(priceSorterOption);

		// Get the product names
		const productNames = screen.queryAllByTitle('product-name').map((productName) => productName.textContent);

		expect(productNames).toEqual(expectedNamesOfProductsSortedByPrice);
	});

	it('sorts the products by name from A to Z', async () => {
		const user = userEvent.setup();
		const products = [
			{ imageLink: 'fakeLink', productName: 'C', productPrice: 65, productId: '1', genre: ['Action', 'Adventure'], platforms: ['Mobile'] },
			{ imageLink: 'fakeLink', productName: 'B', productPrice: 45, productId: '2', genre: ['Action', 'Open World'], platforms: ['PC'] },
			{ imageLink: 'fakeLink', productName: 'A', productPrice: 55, productId: '3', genre: ['Mystery', 'Puzzle'], platforms: ['PC'] },
		];
		const expectedNamesOfProductsSortedByName = ['A', 'B', 'C'];

		render(<Shop loading={false} products={products} error={false} />);

		// Click the 'Name: A to Z' sort option
		const nameSorterOption = screen.queryByText('Name: A to Z');
		await user.click(nameSorterOption);

		// Get the product names
		const productNames = screen.queryAllByTitle('product-name').map((productName) => productName.textContent);

		expect(productNames).toEqual(expectedNamesOfProductsSortedByName);
	});

	it('sorts the products by name from Z to A', async () => {
		const user = userEvent.setup();
		const products = [
			{ imageLink: 'fakeLink', productName: 'A', productPrice: 65, productId: '1', genre: ['Action', 'Adventure'], platforms: ['Mobile'] },
			{ imageLink: 'fakeLink', productName: 'B', productPrice: 45, productId: '2', genre: ['Action', 'Open World'], platforms: ['PC'] },
			{ imageLink: 'fakeLink', productName: 'C', productPrice: 55, productId: '3', genre: ['Mystery', 'Puzzle'], platforms: ['PC'] },
		];
		const expectedNamesOfProductsSortedByName = ['C', 'B', 'A'];

		render(<Shop loading={false} products={products} error={false} />);

		// Click the 'Name: Z to A' sort option
		const nameSorterOption = screen.queryByText('Name: Z to A');
		await user.click(nameSorterOption);

		// Get the product names
		const productNames = screen.queryAllByTitle('product-name').map((productName) => productName.textContent);

		expect(productNames).toEqual(expectedNamesOfProductsSortedByName);
	});

	it('sorts the products by release date, newest first', async () => {
		const user = userEvent.setup();
		const products = [
			{
				imageLink: 'fakeLink',
				productName: 'thisShouldBeFirst',
				productPrice: 65,
				productId: '1',
				genre: ['Action', 'Adventure'],
				platforms: ['Mobile'],
				releaseDate: '2024-01-03',
			},
			{
				imageLink: 'fakeLink',
				productName: 'thisShouldBeThird',
				productPrice: 45,
				productId: '2',
				genre: ['Action', 'Open World'],
				platforms: ['PC'],
				releaseDate: '2024-01-01',
			},
			{
				imageLink: 'fakeLink',
				productName: 'thisShouldBeSecond',
				productPrice: 55,
				productId: '3',
				genre: ['Mystery', 'Puzzle'],
				platforms: ['PC'],
				releaseDate: '2024-01-02',
			},
		];
		const expectedNamesOfProductsSortedByDate = ['thisShouldBeFirst', 'thisShouldBeSecond', 'thisShouldBeThird'];

		render(<Shop loading={false} products={products} error={false} />);

		// Click the 'Release Date: Newest First' sort option
		const dateSorterOption = screen.queryByText('Release Date: Newest First');
		await user.click(dateSorterOption);

		// Get the product names
		const productNames = screen.queryAllByTitle('product-name').map((productName) => productName.textContent);

		expect(productNames).toEqual(expectedNamesOfProductsSortedByDate);
	});

	it('sorts the products by release date, oldest first', async () => {
		const user = userEvent.setup();
		const products = [
			{
				imageLink: 'fakeLink',
				productName: 'thisShouldBeThird',
				productPrice: 65,
				productId: '1',
				genre: ['Action', 'Adventure'],
				platforms: ['Mobile'],
				releaseDate: '2024-01-03',
			},
			{
				imageLink: 'fakeLink',
				productName: 'thisShouldBeFirst',
				productPrice: 45,
				productId: '2',
				genre: ['Action', 'Open World'],
				platforms: ['PC'],
				releaseDate: '2024-01-01',
			},
			{
				imageLink: 'fakeLink',
				productName: 'thisShouldBeSecond',
				productPrice: 55,
				productId: '3',
				genre: ['Mystery', 'Puzzle'],
				platforms: ['PC'],
				releaseDate: '2024-01-02',
			},
		];
		const expectedNamesOfProductsSortedByDate = ['thisShouldBeFirst', 'thisShouldBeSecond', 'thisShouldBeThird'];

		render(<Shop loading={false} products={products} error={false} />);

		// Click the 'Release Date: Oldest First' sort option
		const dateSorterOption = screen.queryByText('Release Date: Oldest First');
		await user.click(dateSorterOption);

		// Get the product names
		const productNames = screen.queryAllByTitle('product-name').map((productName) => productName.textContent);

		expect(productNames).toEqual(expectedNamesOfProductsSortedByDate);
	});

	it('renders a loading indicator if the user has scrolled all the way to the bottom of the product card container', async () => {
		const products = [
			{
				imageLink: 'fakeLink',
				productName: 'thisShouldBeThird',
				productPrice: 65,
				productId: '1',
				genre: ['Action', 'Adventure'],
				platforms: ['Mobile'],
				releaseDate: '2024-01-03',
			},
			// Add more products here...
		];

		render(<Shop loading={false} products={products} error={false} />);

		const productCardsContainer = screen.getByTitle('product-cards-container');

		// Mock scrollHeight, clientHeight, and scroll top to simulate user going on the bottom of the container
		Object.defineProperty(productCardsContainer, 'scrollHeight', { value: 1000 });
		Object.defineProperty(productCardsContainer, 'clientHeight', { value: 300 });
		Object.defineProperty(productCardsContainer, 'scrollTop', { value: 700 });

		// Simulate scroll to the bottom
		fireEvent.scroll(productCardsContainer);

		// Wait for loading indicator
		await waitFor(() => {
			const loading = screen.queryByText('Loading...');
			expect(loading).not.toBeNull();
		});
	});
});
