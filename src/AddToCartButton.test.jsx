import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import AddToCartButton from './AddToCartButton';

describe('Add to Cart Button', () => {
	it('turns "Add To Cart +" to "Added ✓" when clicked', async () => {
		const user = userEvent.setup();
		render(<AddToCartButton onAddItemToCart={vi.fn()} />);
		const addToCartButton = screen.queryByText('Add To Cart +');
		await user.click(addToCartButton);
		expect(screen.queryByText('Added ✓')).not.toBeNull();
	});
});
