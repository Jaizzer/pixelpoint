import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductDetails from './ProductDetails';

describe('Product description', () => {
	it('renders the loading indicator if the products are still being fetched', () => {
		render(<ProductDetails product={null} loading={true} error={false} />);
		const loadingIndicator = screen.queryByTitle('loading-indicator');
		expect(loadingIndicator).not.toBeNull();
	});

	it('renders the error message if there is an error fetching the product', () => {
		render(<ProductDetails product={null} loading={false} error={true} />);
		const errorMessage = screen.queryByTitle('error-message');
		expect(errorMessage).not.toBeNull();
	});

	it('renders the game title', () => {
		const product = {
			title: 'Witcher 3',
			description: 'This is the product description',
			rating: 4.1,
			price: 45,
			developers: ['Developer A', 'Developer B'],
			releaseDate: '2024-01-12',
			platforms: ['Windows, Xbox, PS4'],
			genres: ['Action', 'Puzzle', 'Adventure'],
		};
		render(<ProductDetails product={product} loading={false} error={false} />);
		const productTitle = screen.queryByText('Witcher 3');
		expect(productTitle).not.toBeNull();
	});

	it('renders the product description', () => {
		const product = {
			title: 'Witcher 3',
			description: 'This is the product description',
			rating: 4.1,
			price: 45,
			developers: ['Developer A', 'Developer B'],
			releaseDate: '2024-01-12',
			platforms: ['Windows, Xbox, PS4'],
			genres: ['Action', 'Puzzle', 'Adventure'],
		};
		render(<ProductDetails product={product} loading={false} error={false} />);
		const productDescription = screen.queryByText('This is the product description');
		expect(productDescription).not.toBeNull();
	});

	it('renders the rating', () => {
		const product = {
			title: 'Witcher 3',
			description: 'This is the product description',
			rating: 4.1,
			price: 45,
			developers: ['Developer A', 'Developer B'],
			releaseDate: '2024-01-12',
			platforms: ['Windows, Xbox, PS4'],
			genres: ['Action', 'Puzzle', 'Adventure'],
		};
		render(<ProductDetails product={product} loading={false} error={false} />);
		const productRating = screen.queryByText('4.1');
		expect(productRating).not.toBeNull();
	});

	it('renders the price', () => {
		const product = {
			title: 'Witcher 3',
			description: 'This is the product description',
			rating: 4.1,
			price: 41,
			developers: ['Developer A', 'Developer B'],
			releaseDate: '2024-01-12',
			platforms: ['Windows, Xbox, PS4'],
			genres: ['Action', 'Puzzle', 'Adventure'],
		};
		render(<ProductDetails product={product} loading={false} error={false} />);
		const productPrice = screen.queryByText(/\$41/);
		expect(productPrice).not.toBeNull();
	});

	it('renders the developer/s of the product', () => {
		const product = {
			title: 'Witcher 3',
			description: 'This is the product description',
			rating: 4.1,
			price: 45,
			developers: ['Developer A', 'Developer B'],
			releaseDate: '2024-01-12',
			platforms: ['Windows, Xbox, PS4'],
			genres: ['Action', 'Puzzle', 'Adventure'],
		};
		render(<ProductDetails product={product} loading={false} error={false} />);
		const productDeveloper = screen.queryByText('Developer A, Developer B');
		expect(productDeveloper).not.toBeNull();
	});

	it('renders the release date of the product', () => {
		const product = {
			title: 'Witcher 3',
			description: 'This is the product description',
			rating: 4.1,
			price: 45,
			developers: ['Developer A', 'Developer B'],
			releaseDate: '2024-01-12',
			platforms: ['Windows, Xbox, PS4'],
			genres: ['Action', 'Puzzle', 'Adventure'],
		};
		render(<ProductDetails product={product} loading={false} error={false} />);
		const productReleaseDate = screen.queryByText('January 12, 2024');
		expect(productReleaseDate).not.toBeNull();
	});

	it('renders the platforms of the product', () => {
		const product = {
			title: 'Witcher 3',
			description: 'This is the product description',
			rating: 4.1,
			price: 45,
			developers: ['Developer A', 'Developer B'],
			releaseDate: '2024-01-12',
			platforms: ['Windows, Xbox, PS4'],
			genres: ['Action', 'Puzzle', 'Adventure'],
		};
		render(<ProductDetails product={product} loading={false} error={false} />);
		const productPlatforms = screen.queryByText('Windows, Xbox, PS4');
		expect(productPlatforms).not.toBeNull();
	});

	it('renders the genres of the product', () => {
		const product = {
			title: 'Witcher 3',
			description: 'This is the product description',
			rating: 4.1,
			price: 45,
			developers: ['Developer A', 'Developer B'],
			releaseDate: '2024-01-12',
			platforms: ['Windows, Xbox, PS4'],
			genres: ['Action', 'Puzzle', 'Adventure'],
		};
		render(<ProductDetails product={product} loading={false} error={false} />);
		const productGenres = screen.queryByText('Action, Puzzle, Adventure');
		expect(productGenres).not.toBeNull();
	});
});
