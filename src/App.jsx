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

export default function App() {
	const { content } = useParams();
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	// Cart is composed of products that have product cart quantity greater than zero
	const cart = products.filter((product) => product.productCartQuantity > 0);

	// Fetch the products from the Fake Store API
	useEffect(() => {
		(async function () {
			try {
				const response = await fetch('https://fakestoreapi.com/products');
				const jsondata = await response.json();
				const modifiedProducts = jsondata.map((product) => {
					return {
						imageLink: product.image,
						productName: product.title,
						productPrice: '$' + product.price,
						productId: `${product.id}`,
						productCartQuantity: 0,
					};
				});
				setProducts(modifiedProducts);
			} catch (error) {
				setError(error ? true : false);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	function onAddItemToCart(productId, productCartQuantity) {
		// Update the products
		const updatedProducts = products.map((existingCartItem) =>
			existingCartItem.productId === productId ? { ...existingCartItem, productCartQuantity: productCartQuantity } : existingCartItem
		);
		setProducts(updatedProducts);
	}

	function getCartLength() {
		const cartItemsQuantity = cart.map((item) => item.productCartQuantity).reduce((acc, curr) => acc + curr, 0);
		return cartItemsQuantity;
	}

	return (
		<>
			<Sidebar></Sidebar>
			<TopBar cartContentCount={getCartLength()}></TopBar>
			<main>
				{!content ? (
					<Home />
				) : content === 'account' ? (
					<Account />
				) : content === 'shop' ? (
					<Shop onAddItemToCart={onAddItemToCart} products={products} error={error} loading={loading} />
				) : content === 'about' ? (
					<About />
				) : content === 'cart' ? (
					<Cart onAddItemToCart={onAddItemToCart} products={cart} />
				) : (
					<Error />
				)}
			</main>
		</>
	);
}
