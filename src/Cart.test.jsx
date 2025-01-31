import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Cart from './Cart';
import userEvent from '@testing-library/user-event';

vi.mock('./CartContentCard', () => ({
	default: ({ title, price, id, image, removeItem }) => {
		return (
			<div title="cart-content-card" key={id}>
				<div className="title">{title}</div>
				<div className="price">{price}</div>
				<img src={image} />
				<button onClick={removeItem} title="remove-item">
					Remove Item
				</button>
			</div>
		);
	},
}));

describe('Cart component', () => {
	it('renders cart', () => {
		render(<Cart />);
		const cart = screen.queryByTitle('cart');
		expect(cart).not.toBeNull();
	});

	it('render cart content', () => {
		const cartContent = [
			{ title: 'Game 1', id: 1, price: 45, screenshots: ['fakeLink1', 'fakeLink2'] },
			{ title: 'Game 2', id: 2, price: 45, screenshots: ['fakeLink1', 'fakeLink2'] },
		];
		render(<Cart content={cartContent} />);
		const cartContentCards = screen.queryAllByTitle('cart-content-card');
		expect(cartContentCards.length).toEqual(cartContent.length);
	});

	it('calls the callback function clearCart when "Clear" button is clicked', async () => {
		const user = userEvent.setup();
		const clearCart = vi.fn();
		render(<Cart clearCart={clearCart} />);
		const clearButton = screen.queryByTitle('clear-cart');
		await user.click(clearButton);
		expect(clearCart).toHaveBeenCalled();
	});

	it('calls the callback function removeItem when "Remove Item" button is clicked', async () => {
		const user = userEvent.setup();
		const removeItem = vi.fn();
		const cartContent = [{ title: 'Game 1', id: 1, price: 45, screenshots: ['fakeLink1', 'fakeLink2'] }];
		render(<Cart removeItem={removeItem} content={cartContent} />);
		const removeItemButton = screen.queryByTitle('remove-item');
		await user.click(removeItemButton);
		expect(removeItem).toHaveBeenCalled();
	});
});
