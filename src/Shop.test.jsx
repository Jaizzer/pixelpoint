import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Shop from './Shop';

vi.mock('./ProductCard', () => ({
	default: ({ imageLink, productName, productPrice }) => {
		return (
			<div>
				<img src={imageLink} alt={productName} />
				<div>{productName}</div>
				<div>{productPrice}</div>
			</div>
		);
	},
}));

describe('Shop component', () => {
	it('converts all array of products into shopping cards', () => {
		const products = [
			{ imageLink: 'fakeLink', productName: 'product', productPrice: '$45', productId: '1' },
			{ imageLink: 'fakeLink', productName: 'product', productPrice: '$55', productId: '2' },
			{ imageLink: 'fakeLink', productName: 'product', productPrice: '$65', productId: '3' },
		];
		render(<Shop products={products} />);

		// Existence of an image guarantess the existence of a product card
		const images = screen.queryAllByAltText('product');

		expect(images.length).toBe(products.length);
	});
});
