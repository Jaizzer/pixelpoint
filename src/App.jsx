import Sidebar from './Sidebar';
import Home from './Home';
import Account from './Account';
import About from './About';
import Shop from './Shop';
import Error from './Error';
import Cart from './Cart';
import TopBar from './TopBar';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductDetails from './ProductDetails';
import useFetchProduct from './useFetchProduct';

export default function App() {
	const { content } = useParams();
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	const { product, isProductHaveError, isProductLoading } = useFetchProduct(id);
	const [pageToRequestFromAPI, setPageToRequestFromAPI] = useState(1);

	function getNewProducts() {
		setPageToRequestFromAPI((prev) => prev + 1);
	}

	// Fetch the products using the RAWG GAMES API
	useEffect(() => {
		(async function () {
			try {
				const response = await fetch(
					`https://api.rawg.io/api/games?key=99ef179fc1ee4d77a91ccee7e1bb59e6&page=${pageToRequestFromAPI}&page_size=100`
				);
				const jsonData = await response.json();
				const modifiedProducts = jsonData.results.map((product) => {
					return {
						imageLink: product.background_image,
						productName: product.name,
						productPrice: Math.floor(Math.random() * (100 - 50) + 50),
						productId: `${product.id}`,
						genre: product.genres.map((genre) => genre.name),
						platforms: product.platforms.map((platform) => platform.name),
						unitsSold: Math.floor(Math.random() * 1000000),
						releaseDate: product.released,
						esrbRating: product.esrb_rating ? product.esrb_rating.name : 'Unrated',
					};
				});

				setProducts(products.concat(modifiedProducts));
			} catch (error) {
				setError(error ? true : false);
			} finally {
				setLoading(false);
			}
		})();
	}, [pageToRequestFromAPI]);

	return (
		<>
			<Sidebar></Sidebar>
			<TopBar cartContentCount={0}></TopBar>
			<main>
				{!content ? (
					<Home />
				) : content === 'account' ? (
					<Account />
				) : content === 'shop' ? (
					<Shop products={products} error={error} loading={loading} getNewProducts={getNewProducts} />
				) : content === 'about' ? (
					<About />
				) : content === 'cart' ? (
					<Cart />
				) : content === 'gameDetails' && id !== undefined ? (
					<ProductDetails key={id} product={product} loading={isProductLoading} error={isProductHaveError} />
				) : (
					<Error />
				)}
			</main>
		</>
	);
}
