import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Cart from './Cart';

describe('Cart component', () => {
	it('renders cart', () => {
		render(<Cart />);
		const cart = screen.queryByTitle('cart');
		expect(cart).not.toBeNull();
	});
});
