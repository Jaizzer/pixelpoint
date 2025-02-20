import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import AddToCartButton from './AddToCartButton.jsx';

describe('Add to Cart Button', () => {
	it('turns "Add To Cart +" to "Added ✓" when clicked', async () => {
		const user = userEvent.setup();
		render(<AddToCartButton onAddItemToCart={vi.fn()} />);
		const addToCartButton = screen.queryByTitle('add-to-cart-button');;
		await user.click(addToCartButton);
		expect(screen.queryByText('Added ✓')).not.toBeNull();
	});
});
