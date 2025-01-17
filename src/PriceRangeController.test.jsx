import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import PriceRangeController from './PriceRangeController';

describe('Price Range Controller Component', () => {
	it('expands the price range controller when clicked', async () => {
		const user = userEvent.setup();
		render(<PriceRangeController />);
		const priceRangeController = screen.queryByText('Price');
		await user.click(priceRangeController);
		const range = screen.queryByTitle('price-range-controller-dropdown');
		expect(range).not.toBeNull();
	});

    it('collapses the price range controller when clicked', async () => {
		const user = userEvent.setup();
		render(<PriceRangeController />);
		const priceRangeController = screen.queryByText('Price');
		await user.click(priceRangeController);
		await user.click(priceRangeController);
		const range = screen.queryByTitle('price-range-controller-dropdown');
		expect(range).toBeNull();
	});
});
