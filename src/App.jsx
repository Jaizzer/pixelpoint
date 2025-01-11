import Sidebar from './Sidebar';
import Home from './Home';
import Account from './Account';
import About from './About';
import Shop from './Shop';
import Error from './Error';
import Cart from './Cart';
import TopBar from './TopBar';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

export default function App() {
	const { content } = useParams();

	const [products, setProducts] = useState([
		{ imageLink: '', productName: 'product1', productPrice: '$451', productId: '1', productCartQuantity: 0 },
		{ imageLink: '', productName: 'product2', productPrice: '$552', productId: '2', productCartQuantity: 0 },
		{ imageLink: '', productName: 'product3', productPrice: '$653', productId: '3', productCartQuantity: 0 },
		{ imageLink: '', productName: 'product4', productPrice: '$654', productId: '4', productCartQuantity: 0 },
		{ imageLink: '', productName: 'product5', productPrice: '$655', productId: '5', productCartQuantity: 0 },
	]);

	// Cart is composed of products that have product cart quantity greater than zero
	const cart = products.filter((product) => product.productCartQuantity > 0);

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
					<Shop onAddItemToCart={onAddItemToCart} products={products} />
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
