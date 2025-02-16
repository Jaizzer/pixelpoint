import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import ConfirmationMessage from './ConfirmationMessage.jsx';

describe('Confirmation Message', () => {
	it('renders the message', () => {
		render(<ConfirmationMessage message={'Message'} />);
		const message = screen.queryByText('Message');
		expect(message).not.toBeNull();
	});

	it('calls the function when "Yes" is clicked', async () => {
		const user = userEvent.setup();
		const onClickYes = vi.fn();
		render(<ConfirmationMessage message={'Message'} onClickYes={onClickYes} />);
		await user.click(screen.queryByText('Yes'));
		expect(onClickYes).toHaveBeenCalled();
	});

	it('calls the function when "Cancel" is clicked', async () => {
		const user = userEvent.setup();
		const onClickCancel = vi.fn();
		render(<ConfirmationMessage message={'Message'} onClickCancel={onClickCancel} />);
		await user.click(screen.queryByText('Cancel'));
		expect(onClickCancel).toHaveBeenCalled();
	});
});
