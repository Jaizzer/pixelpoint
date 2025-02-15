import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Cart from './Cart.jsx';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

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
		render(
			<MemoryRouter>
				<Cart content={[]} />
			</MemoryRouter>
		);
		const cart = screen.queryByTitle('cart');
		expect(cart).not.toBeNull();
	});

	it('render cart content', () => {
		const cartContent = [
			{ title: 'Game 1', id: 1, price: 45, images: ['fakeLink1', 'fakeLink2'] },
			{ title: 'Game 2', id: 2, price: 45, images: ['fakeLink1', 'fakeLink2'] },
		];
		render(
			<MemoryRouter>
				<Cart content={cartContent} />
			</MemoryRouter>
		);
		const cartContentCards = screen.queryAllByTitle('cart-content-card');
		expect(cartContentCards.length).toEqual(cartContent.length);
	});

	it('calls the callback function clearCart when "Clear" button is clicked', async () => {
		const user = userEvent.setup();
		const clearCart = vi.fn();
		const cartContent = [
			{ title: 'Game 1', id: 1, price: 45, images: ['fakeLink1', 'fakeLink2'] },
			{ title: 'Game 2', id: 2, price: 45, images: ['fakeLink1', 'fakeLink2'] },
		];
		render(
			<MemoryRouter>
				<Cart content={cartContent} clearCart={clearCart} />
			</MemoryRouter>
		);
		const clearButton = screen.queryByTitle('clear-cart');
		await user.click(clearButton);
		expect(clearCart).toHaveBeenCalled();
	});

	it('calls the callback function removeItem when "Remove Item" button is clicked', async () => {
		const user = userEvent.setup();
		const removeItem = vi.fn();
		const cartContent = [{ title: 'Game 1', id: 1, price: 45, images: ['fakeLink1', 'fakeLink2'] }];
		render(
			<MemoryRouter>
				<Cart removeItem={removeItem} content={cartContent} />
			</MemoryRouter>
		);
		const removeItemButton = screen.queryByTitle('remove-item');
		await user.click(removeItemButton);
		expect(removeItem).toHaveBeenCalledWith(1);
	});

	it('calculates the total price of all the cart contents', () => {
		const cartContent = [
			{ title: 'Game 1', id: 1, price: 45, images: ['fakeLink1', 'fakeLink2'] },
			{ title: 'Game 2', id: 2, price: 55, images: ['fakeLink1', 'fakeLink2'] },
		];
		render(
			<MemoryRouter>
				<Cart content={cartContent} />
			</MemoryRouter>
		);
		const totalPrice = screen.queryAllByText(/100/i)[0];
		expect(totalPrice).not.toBeNull();
	});
});
