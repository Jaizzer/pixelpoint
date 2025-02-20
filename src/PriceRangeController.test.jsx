import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import PriceRangeController from './PriceRangeController.jsx';

describe('Price Range Controller Component', () => {
	it('calls the onDropdownButtonClick when the price range dropdown button is clicked', async () => {
		const user = userEvent.setup();
		const mockFunction = vi.fn();
		render(<PriceRangeController onDropdownButtonClick={mockFunction} />);
		const priceRangeControllerButton = screen.queryByText('Price');
		await user.click(priceRangeControllerButton);
		expect(mockFunction).toHaveBeenCalled();
	});
});
