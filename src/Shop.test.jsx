import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Shop from './Shop';
import { userEvent } from '@testing-library/user-event';

vi.mock('./ProductCard', () => ({
	default: ({ imageLink, productName, productPrice }) => {
		return (
			<div>
				<img src={imageLink} alt={productName} role="image" />
				<div>{productName}</div>
				<div>{productPrice}</div>
			</div>
		);
	},
}));

vi.mock('./DropdownFilter', () => ({
	default: ({ items, title, onDropdownItemClick, numberOfShowLessItems, onClearClick }) => {
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

describe('Shop component', () => {
	it('converts all array of products into shopping cards', () => {
		const products = [
			{ imageLink: 'fakeLink', productName: 'product', productPrice: '$45', productId: '1', genre: 'Action', platforms: ['PC', 'Mobile'] },
			{ imageLink: 'fakeLink', productName: 'product', productPrice: '$55', productId: '2', genre: 'Action', platforms: ['PC', 'Mobile'] },
			{ imageLink: 'fakeLink', productName: 'product', productPrice: '$65', productId: '3', genre: 'Mystery', platforms: ['PC', 'Mobile'] },
		];
		render(<Shop products={products} />);

		// Existence of an image guarantess the existence of a product card
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
			{ imageLink: 'fakeLink', productName: 'product', productPrice: '$45', productId: '1', genre: 'Action', platforms: ['PC', 'Mobile'] },
			{ imageLink: 'fakeLink', productName: 'product', productPrice: '$55', productId: '2', genre: 'Action', platforms: ['PC', 'Mobile'] },
			{ imageLink: 'fakeLink', productName: 'product', productPrice: '$65', productId: '3', genre: 'Mystery', platforms: ['PC', 'Mobile'] },
		];
		render(<Shop loading={false} products={products} error={false} />);

		// Filter by price
		const actionDropdownFilter = screen.queryByText('Action');
		await user.click(actionDropdownFilter);

		// Check if the products that are 'Action' genre the only products that remained
		// by checking if the number of images corresponds to the number of Action products provided which is 2
		const isActionGenresRemained = screen.queryAllByRole('image');

		expect(isActionGenresRemained.length).toEqual(2);
	});
});
