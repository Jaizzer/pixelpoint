import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Shop from './Shop';
import { userEvent } from '@testing-library/user-event';

vi.mock('./ProductCard', () => ({
	default: ({ imageLink, productName, productPrice }) => {
		return (
			<div>
				<img src={imageLink} alt={productName} role="image" />
				<div title='product-name'>{productName}</div>
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

vi.mock('./Sorter', () => ({
	default: ({ onSortItemClick }) => {
		return (
			<div className="sorter">
				<button>Sort</button>
				<div
					title="sort-option"
					onClick={() => {
						onSortItemClick('Popularity');
					}}
				>
					Popularity
				</div>
				<div
					title="sort-option"
					onClick={() => {
						onSortItemClick('Release Date');
					}}
				>
					Release Date
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
	it('converts all array of products into shopping cards', () => {
		const products = [
			{ imageLink: 'fakeLink', productName: 'product', productPrice: '$45', productId: '1', genre: ['Action', 'Adventure'], platforms: ['Mobile'] },
			{ imageLink: 'fakeLink', productName: 'product', productPrice: '$55', productId: '2', genre: ['Action', 'Open World'], platforms: ['PC'] },
			{ imageLink: 'fakeLink', productName: 'product', productPrice: '$65', productId: '3', genre: ['Mystery', 'Puzzle'], platforms: ['PC'] },
		];
		render(<Shop products={products} />);

		// Existence of an image guarantees the existence of a product card
		const images = screen.queryAllByAltText('product');

		expect(images.length).toBe(products.length);
	});

	it('renders loading message if the products are currently loading', () => {
		render(<Shop loading={true} products={[]} error={false} />);
		const loadingMessage = screen.queryByTitle('loading');
		expect(loadingMessage).not.toBeNull();
	});

	it('renders error message if there is an error', () => {
		render(<Shop loading={false} products={[]} error={true} />);
		const errorMessage = screen.queryByTitle('error');
		expect(errorMessage).not.toBeNull();
	});

	it('filters the product when a dropdown filter is clicked', async () => {
		const user = userEvent.setup();
		const products = [
			{ imageLink: 'fakeLink', productName: 'product', productPrice: '$45', productId: '1', genre: ['Action', 'Adventure'], platforms: ['Mobile'] },
			{ imageLink: 'fakeLink', productName: 'product', productPrice: '$55', productId: '2', genre: ['Action', 'Open World'], platforms: ['PC'] },
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
			{ imageLink: 'fakeLink', productName: 'product', productPrice: '$45', productId: '1', genre: ['Action', 'Adventure'], platforms: ['Mobile'] },
			{ imageLink: 'fakeLink', productName: 'product', productPrice: '$55', productId: '2', genre: ['Action', 'Open World'], platforms: ['PC'] },
			{ imageLink: 'fakeLink', productName: 'product', productPrice: '$65', productId: '3', genre: ['Mystery', 'Puzzle'], platforms: ['PC'] },
		];
		render(<Shop loading={false} products={products} error={false} />);
		// Filter all products available for 'PC' platform
		const pcDropdownFilter = screen.queryByText('PC');
		await user.click(pcDropdownFilter);

		const isProductsForPCRemained = screen.queryAllByRole('image').length === 2;
		expect(isProductsForPCRemained).toBeTruthy();
	});

    it('sorts the item by price from low to high', async() => {
        const user = userEvent.setup();
		const products = [
			{ imageLink: 'fakeLink', productName: 'thisShouldBeThird', productPrice: 65, productId: '1', genre: ['Action', 'Adventure'], platforms: ['Mobile'] },
			{ imageLink: 'fakeLink', productName: 'thisShouldBeFirst', productPrice: 45, productId: '2', genre: ['Action', 'Open World'], platforms: ['PC'] },
			{ imageLink: 'fakeLink', productName: 'thisShouldBeSecond', productPrice: 55, productId: '3', genre: ['Mystery', 'Puzzle'], platforms: ['PC'] },
		];
        const expectedNamesOfProductsSortedByPrice = ['thisShouldBeFirst', 'thisShouldBeSecond', 'thisShouldBeThird'];

		render(<Shop loading={false} products={products} error={false} />);

        // Click the 'Price: Low to High' sort option
        const priceSorterOption = screen.queryByText('Price: Low to High');
        await user.click(priceSorterOption);

        // Get the product names
        const productNames = screen.queryAllByTitle('product-name').map(productName => productName.textContent)

        expect(productNames).toEqual(expectedNamesOfProductsSortedByPrice)
    });

    it('sorts the item by price from high to low', async() => {
        const user = userEvent.setup();
		const products = [
			{ imageLink: 'fakeLink', productName: 'thisShouldBeFirst', productPrice: 65, productId: '1', genre: ['Action', 'Adventure'], platforms: ['Mobile'] },
			{ imageLink: 'fakeLink', productName: 'thisShouldBeThird', productPrice: 45, productId: '2', genre: ['Action', 'Open World'], platforms: ['PC'] },
			{ imageLink: 'fakeLink', productName: 'thisShouldBeSecond', productPrice: 55, productId: '3', genre: ['Mystery', 'Puzzle'], platforms: ['PC'] },
		];
        const expectedNamesOfProductsSortedByPrice = ['thisShouldBeFirst', 'thisShouldBeSecond', 'thisShouldBeThird'];

		render(<Shop loading={false} products={products} error={false} />);

        // Click the 'Price: High to Low' sort option
        const priceSorterOption = screen.queryByText('Price: High to Low');
        await user.click(priceSorterOption);

        // Get the product names
        const productNames = screen.queryAllByTitle('product-name').map(productName => productName.textContent)

        expect(productNames).toEqual(expectedNamesOfProductsSortedByPrice)
    })

    it('sorts the item by name from A to Z', async() => {
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
        const productNames = screen.queryAllByTitle('product-name').map(productName => productName.textContent)

        expect(productNames).toEqual(expectedNamesOfProductsSortedByName)
    })

    it('sorts the item by name from Z to A', async() => {
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
        const productNames = screen.queryAllByTitle('product-name').map(productName => productName.textContent)

        expect(productNames).toEqual(expectedNamesOfProductsSortedByName)
    })
});
