import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Cart from './Cart';

vi.mock('./ProductCard', () => ({
	default: ({ imageLink, productName, productPrice, productId, productCartQuantity }) => {
		return (
			<div>
				<img src={imageLink} alt={productName} />
				<div>{productName}</div>
				<div>{productPrice}</div>
				<div>{productId}</div>
				<div>{productCartQuantity}</div>
			</div>
		);
	},
}));

describe('Cart component', () => {
	it('converts all array of products into Cart product cards', () => {
		const products = [
			{ imageLink: 'fakeLink', productName: 'product', productPrice: '$45', productId: '1', productCartQuantity: 5 },
			{ imageLink: 'fakeLink', productName: 'product', productPrice: '$55', productId: '2', productCartQuantity: 6 },
			{ imageLink: 'fakeLink', productName: 'product', productPrice: '$65', productId: '3', productCartQuantity: 7 },
		];
		render(<Cart products={products} />);

		// Existence of an image guarantess the existence of a product card
		const images = screen.queryAllByAltText('product');

		expect(images.length).toBe(products.length);
	});
});
