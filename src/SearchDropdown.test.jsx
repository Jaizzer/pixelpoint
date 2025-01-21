import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchDropdown from './SearchDropDown';

// Mock the Search Product Card component
vi.mock('./SearchProductCard', () => ({
	default: ({ name }) => {
		return (
			<div className="productName" title="product-name">
				{name}
			</div>
		);
	},
}));

describe('Search Dropdown Component', () => {
	it('displays the loading indicator while collecting the results', () => {
		render(<SearchDropdown loading={true} data={null} error={false} />);
		const loadingIndicator = screen.queryByRole('loading-indicator');
		expect(loadingIndicator).not.toBeNull();
	});

	it("displays the error message if there's an error while collecting the results", () => {
		render(<SearchDropdown loading={false} data={null} error={true} />);
		const errorIndicator = screen.queryByTitle('error-indicator');
		expect(errorIndicator).not.toBeNull();
	});

	it('displays the products if the results have been collected', () => {
		const data = [
			{ name: 'productA', id: 'productA' },
			{ name: 'productB', id: 'productB' },
			{ name: 'productC', id: 'productC' },
		];
		render(<SearchDropdown loading={false} data={data} error={false} />);
		const searchProductCard = screen
			.queryAllByTitle('product-name')
			.map((productCard) => ({ name: productCard.textContent, id: productCard.textContent }));
		expect(searchProductCard).toEqual(data);
	});
});
