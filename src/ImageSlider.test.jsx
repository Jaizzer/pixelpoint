import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import ImageSlider from './ImageSlider';
import userEvent from '@testing-library/user-event';

describe('Image Slider component', () => {
	it('renders the next image when the "next" arrow is clicked', async () => {
		const user = userEvent.setup();
		render(<ImageSlider imageLinks={['fakeLink1', 'fakeLink2', 'fakeLink3', 'fakeLink4']} />);
		const nextButton = screen.queryByTitle('next-button');
		await user.click(nextButton);
		await waitFor(() => {
			const imageAfterClickingNextButton = screen.queryByRole('image');
			expect(imageAfterClickingNextButton.src).toMatch(/fakeLink2/i);
		});
	});

	it('renders the previous image when the "previous" arrow is clicked', async () => {
		const user = userEvent.setup();
		render(<ImageSlider imageLinks={['fakeLink1', 'fakeLink2', 'fakeLink3', 'fakeLink4']} />);
		const nextButton = screen.queryByTitle('next-button');
		const previousButton = screen.queryByTitle('previous-button');
		await user.click(nextButton);
		await user.click(previousButton);
		await waitFor(() => {
			const imageAfterClickingPreviousButton = screen.queryByRole('image');
			expect(imageAfterClickingPreviousButton.src).toMatch(/fakeLink1/i);
		});
	});

	it('renders the image that corresponds to the clicked "dot" indicator', async () => {
		const user = userEvent.setup();
		render(<ImageSlider imageLinks={['fakeLink1', 'fakeLink2', 'fakeLink3', 'fakeLink4']} />);
		const thirdDot = screen.queryAllByTitle('current-image-indicator')[2];
		await user.click(thirdDot);
		await waitFor(() => {
			const imageAfterClickingTheThirdDot = screen.queryByRole('image');
			expect(imageAfterClickingTheThirdDot.src).toMatch(/fakeLink3/i);
		});
	});
});
