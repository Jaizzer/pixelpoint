import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductDetails from './ProductDetails';

describe('Product description', () => {
	it('renders the game title', () => {
		render(<ProductDetails title={'Witcher 3'} />);
		const productTitle = screen.queryByText('Witcher 3');
		expect(productTitle).not.toBeNull();
	});

	it('renders the product gameplay description', () => {
		render(<ProductDetails title={'Witcher 3'} description={'This is the game description'} />);
		const productDescription = screen.queryByText('This is the game description');
		expect(productDescription).not.toBeNull();
	});

	it('renders the rating', () => {
		render(<ProductDetails title={'Witcher 3'} rating={4.1} />);
		const productRating = screen.queryByText('4.1');
		expect(productRating).not.toBeNull();
	});

	it('renders the price', () => {
		render(<ProductDetails title={'Witcher 3'} price={41} />);
		const productPrice = screen.queryByText(/\$41/);
		expect(productPrice).not.toBeNull();
	});

	it('renders the developer of the product', () => {
		render(<ProductDetails title={'Product A'} developer={'Developer A'} />);
		const productDeveloper = screen.queryByText('Developer A');
		expect(productDeveloper).not.toBeNull();
	});

	it('renders the release date of the product', () => {
		render(<ProductDetails title={'Product A'} releaseDate={'2024-01-12'} />);
		const productReleaseDate = screen.queryByText('January 12, 2024');
		expect(productReleaseDate).not.toBeNull();
	});

	it('renders the platforms of the product', () => {
		render(<ProductDetails title={'Product A'} platforms={['Windows', 'Xbox', 'PS4']} />);
		const productPlatforms = screen.queryByText('Windows, Xbox, PS4');
		expect(productPlatforms).not.toBeNull();
	});
});
