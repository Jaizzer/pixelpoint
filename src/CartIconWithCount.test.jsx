import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CartIconWithCount from './CartIconWithCount.jsx';

describe('Cart Icon component', () => {
	it('renders a number base on the cart content count', () => {
		render(<CartIconWithCount cartContentCount={5} />);
		const cartContentCount = screen.queryByText('5');
		expect(cartContentCount).not.toBeNull();
	});

	it('does not render zero if the cart content count is zero', () => {
		render(<CartIconWithCount cartContentCount={0} />);
		const cartContentCount = screen.queryByText('0');
		expect(cartContentCount).toBeNull();
	});
});
