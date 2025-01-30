import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import ProductCard from './ProductCard';
import { MemoryRouter } from 'react-router-dom';

describe('Item Card Component', () => {
	it('contains the product image', () => {
		render(
			<MemoryRouter>
				<ProductCard productName="Ramen" />
			</MemoryRouter>
		);
		const image = screen.queryByAltText('Ramen');
		expect(image).not.toBeNull();
	});

	it('contains the product name', () => {
		render(
			<MemoryRouter>
				<ProductCard productName="Ramen" />{' '}
			</MemoryRouter>
		);
		const productName = screen.queryByText('Ramen');
		expect(productName).not.toBeNull();
	});

	it('contains the product price', () => {
		render(
			<MemoryRouter>
				<ProductCard productPrice="$56.00" />{' '}
			</MemoryRouter>
		);
		const productPrice = screen.queryByText(
			/[$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]/
		);
		expect(productPrice).not.toBeNull();
	});
});
