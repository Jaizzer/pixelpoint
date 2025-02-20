import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import DropdownFilter from './DropdownFilter.jsx';

describe('Dropdown filter', () => {
	it('enables user to show more items by clicking show more', async () => {
		const items = [
			{ name: 'Item1', isChecked: true },
			{ name: 'Item2', isChecked: false },
			{ name: 'Item3', isChecked: false },
			{ name: 'Item4', isChecked: false },
			{ name: 'Item5', isChecked: false },
		];
		const user = userEvent.setup();
		render(<DropdownFilter onDropdownButtonClick={vi.fn()} items={items} title="Filter" isExpanded={true} numberOfShowLessItems={3} />);

		// Click 'Show more'
		const showMoreButton = screen.queryByText('Show more');
		await user.click(showMoreButton);

		// Check the number of visible dropdown items
		const visibleDropdownItems = screen.queryAllByRole('checkbox');
		const numberOfVisibleDropdownItems = visibleDropdownItems.length;

		expect(numberOfVisibleDropdownItems).toEqual(5);
	});

	it('shows the number of clicked filter', async () => {
		const items = [
			{ name: 'Price', isChecked: true },
			{ name: 'Name', isChecked: false },
		];
		const user = userEvent.setup();
		render(<DropdownFilter onDropdownButtonClick={vi.fn()} items={items} title="Filter" />);
		const dropDownFilterButton = screen.queryByText('Filter');
		// Show the drop down
		await user.click(dropDownFilterButton);

		const checkedFilterCount = screen.queryByTitle('checked-filter-count-indicator');

		expect(checkedFilterCount.textContent).toEqual('1');
	});

	it('does not render the checked filter count if there is no clicked filter', async () => {
		const items = [
			{ name: 'Price', isChecked: false },
			{ name: 'Name', isChecked: false },
		];
		const user = userEvent.setup();
		render(<DropdownFilter onDropdownButtonClick={vi.fn()} items={items} title="Filter" />);
		const dropDownFilterButton = screen.queryByText('Filter');
		// Show the drop down
		await user.click(dropDownFilterButton);

		const checkedFilterCount = screen.queryByTitle('checked-filter-count-indicator');

		expect(checkedFilterCount).toBeNull();
	});
});
