import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Sorter from './Sorter';

describe('Sorter Component', () => {
	it('has a dropdown that can be expanded to see the sort options', async () => {
		const user = userEvent.setup();
		render(<Sorter />);
		const sorterDropdown = screen.queryByText('Sort');
		await user.click(sorterDropdown);

		const expectedSortOptions = ['Popularity: High to Low', 'Popularity: Low to High', 'Release Date: Newest First', 'Release Date: Oldest First', 'Name: A to Z', 'Name: Z to A', 'Price: Low to High', 'Price: High to Low'];
		const sortOptions = screen.queryAllByTitle('sort-option').map((sortItem) => sortItem.textContent);
		expect(sortOptions).toEqual(expectedSortOptions);
	});

	it('has a dropdown that can be collapsed to hide the sort options', async () => {
		const user = userEvent.setup();
		render(<Sorter />);
		const sorterDropdown = screen.queryByText('Sort');
		await user.click(sorterDropdown);
		await user.click(sorterDropdown);

		const sortOptions = screen.queryAllByTitle('sort-option').map((sortItem) => sortItem.textContent);
		expect(sortOptions.length).toEqual(0);
	});
});
