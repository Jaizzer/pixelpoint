import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import DropdownFilter from './DropdownFilter';

describe('Dropdown flter', () => {
	it('shows the list of the drop down items provided when clicked', async () => {
		const items = [
			{ name: 'Price', isChecked: true },
			{ name: 'Name', isChecked: false },
		];
		const user = userEvent.setup();
		render(<DropdownFilter items={items} title="Filter" />);
		const dropDownFilterButton = screen.queryByText('Filter');
		// Show the drop down
		await user.click(dropDownFilterButton);

		const renderedDropDownItems = items.map((item) => {
			return screen.queryByText(item);
		});

		const dropDownIsVisible = !renderedDropDownItems.includes(undefined);

		expect(dropDownIsVisible).toBeTruthy();
	});

	it('hides the list of the drop down items provided when clicked again', async () => {
		const items = [
			{ name: 'Price', isChecked: true },
			{ name: 'Name', isChecked: false },
		];
		const user = userEvent.setup();
		render(<DropdownFilter items={items} title="Filter" />);
		const dropDownFilterButton = screen.queryByText('Filter');

		// Show the drop down
		await user.click(dropDownFilterButton);

		// Hide the drop down
		await user.click(dropDownFilterButton);

		const renderedDropDownItems = items.map((item) => {
			screen.queryByText(item);
		});

		const dropDownIsHidden = renderedDropDownItems.includes(undefined);

		expect(dropDownIsHidden).toBeTruthy();
	});

	it('enables user to show more items by clicking show more', async () => {
		const items = [
			{ name: 'Item1', isChecked: true },
			{ name: 'Item2', isChecked: false },
			{ name: 'Item3', isChecked: false },
			{ name: 'Item4', isChecked: false },
			{ name: 'Item5', isChecked: false },
		];
		const user = userEvent.setup();
		render(<DropdownFilter items={items} title="Filter" numberOfShowLessItems={3} />);
		const dropDownFilterButton = screen.queryByText('Filter');

		// Show the drop down
		await user.click(dropDownFilterButton);

		// Click 'Show less'
		const showMoreButton = screen.queryByText('Show more');
		await user.click(showMoreButton);

		// Check the number of visible dropdown items
		const visibleDropdownItems = screen.queryAllByRole('checkbox');
		const numberOfVisibleDropdownItems = visibleDropdownItems.length;

		expect(numberOfVisibleDropdownItems).toEqual(5);
	});
});
