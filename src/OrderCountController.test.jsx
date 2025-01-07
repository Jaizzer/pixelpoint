import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import OrderCountController from './OrderCountController';

describe('Order Count Controller', () => {
	it('has an "Add to Cart" button that dissapears when clicked', async () => {
		const user = userEvent.setup();
		render(<OrderCountController />);
		let addToCart = screen.queryByText('Add to Cart');
		await user.click(addToCart);
		addToCart = screen.queryByText('Add to Cart');
		expect(addToCart).toBeNull();
	});

	it('has an "Add to Cart" button that is replaced by a number input initialized to 1 when clicked', async () => {
		const user = userEvent.setup();
		render(<OrderCountController />);
		let addToCart = screen.queryByRole('button');
		await user.click(addToCart);
		let input = screen.queryByRole('input');
		expect(input).not.toBeNull();
	});

	it('has a subtract button that appears when the "Add to Cart" button is clicked', async () => {
		const user = userEvent.setup();
		render(<OrderCountController />);
		let addToCart = screen.queryByRole('button');
		await user.click(addToCart);
		let subtractButton = screen.queryByText('-');
		expect(subtractButton).not.toBeNull();
	});

	it('has an add button that appears when the "Add to Cart" button is clicked', async () => {
		const user = userEvent.setup();
		render(<OrderCountController />);
		let addToCart = screen.queryByRole('button');
		await user.click(addToCart);
		let addButton = screen.queryByText('+');
		expect(addButton).not.toBeNull();
	});

	it('has an add button that increments the order input when clicked', async () => {
		const user = userEvent.setup();
		render(<OrderCountController />);
		let addToCart = screen.queryByRole('button');
		await user.click(addToCart);
        let addButton = screen.queryByText('+');

        await user.click(addButton);
		await user.click(addButton);
		await user.click(addButton);

		let input = screen.queryByRole('input');
		expect(input.value).toEqual("4");
	});

    it('has an "Add to Cart" button that reappears when order count reaches zero', async () => {
		const user = userEvent.setup();
		render(<OrderCountController />);
		let addToCart = screen.queryByRole('button');
		await user.click(addToCart);
        let subtractButton = screen.queryByText('-');

        await user.click(subtractButton);

        addToCart = screen.queryByText('Add to Cart');
		expect(addToCart).not.toBeNull();
	});
});
