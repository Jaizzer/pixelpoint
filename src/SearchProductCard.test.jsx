import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchProductCard from './SearchProductCard';
import { MemoryRouter } from 'react-router-dom';

describe('Search Product Component', () => {
	it('renders the image using the provided link', () => {
		const product = {
			image: 'fakeLink',
			name: 'productA',
			price: 56,
		};
		render(
			<MemoryRouter>
				<SearchProductCard image={product.image} name={product.name} price={product.price} />
			</MemoryRouter>
		);
		const image = screen.queryByRole('img');

		expect(image).not.toBeNull();
	});

	it('renders the provided name of the product', () => {
		const product = {
			image: 'fakeLink',
			name: 'productA',
			price: 56,
		};
		render(
			<MemoryRouter>
				<SearchProductCard image={product.image} name={product.name} price={product.price} />
			</MemoryRouter>
		);
		const productName = screen.queryByText(product.name);

		expect(productName).not.toBeNull();
	});

	it('renders the provided price of the product', () => {
		const product = {
			image: 'fakeLink',
			name: 'productA',
			price: 56,
		};
		render(
			<MemoryRouter>
				<SearchProductCard image={product.image} name={product.name} price={product.price} />
			</MemoryRouter>
		);
		const productPrice = screen.queryByText(/56/);

		expect(productPrice).not.toBeNull();
	});

	it('calls the callback function when clicked', async () => {
		const user = userEvent.setup();
		const product = {
			image: 'fakeLink',
			name: 'productA',
			price: 56,
		};
		const doSomething = vi.fn();
		render(
			<MemoryRouter>
				<SearchProductCard image={product.image} name={product.name} price={product.price} onClickCallback={doSomething} />
			</MemoryRouter>
		);

		const productCard = screen.queryByRole('search-product-card');

		await user.click(productCard);

		expect(doSomething).toHaveBeenCalled();
	});
});
