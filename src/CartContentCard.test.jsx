import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartContentCard from './CartContentCard';
import { MemoryRouter } from 'react-router-dom';

describe('Cart Content Card', () => {
	it('renders the product title', () => {
		render(
			<MemoryRouter>
				<CartContentCard title={'Game 1'} />
			</MemoryRouter>
		);
		const title = screen.queryByText('Game 1');
		expect(title).not.toBeNull();
	});

	it('renders the product price', () => {
		render(
			<MemoryRouter>
				<CartContentCard price={56} />
			</MemoryRouter>
		);
		const price = screen.queryByText(/56/);
		expect(price).not.toBeNull();
	});

	it('renders the image of the product', () => {
		render(
			<MemoryRouter>
				<CartContentCard image={'fakeLink'} />
			</MemoryRouter>
		);
		const image = screen.queryByRole('img');
		expect(image).not.toBeNull();
	});

	it('calls the removeItem callback function when delete button is clicked', async () => {
		const removeItemCallback = vi.fn();
		const user = userEvent.setup();
		render(
			<MemoryRouter>
				<CartContentCard removeItem={removeItemCallback} />
			</MemoryRouter>
		);
		const removeItemButton = screen.queryByTitle('remove-item');
		await user.click(removeItemButton);
		expect(removeItemCallback).toHaveBeenCalled();
	});
});
