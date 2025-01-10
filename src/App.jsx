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
	const [cart, setCart] = useState([]);

	const [products, setProducts] = useState([
		{ imageLink: '', productName: 'product1', productPrice: '$451', productId: '1' },
		{ imageLink: '', productName: 'product2', productPrice: '$552', productId: '2' },
		{ imageLink: '', productName: 'product3', productPrice: '$653', productId: '3' },
		{ imageLink: '', productName: 'product4', productPrice: '$654', productId: '4' },
		{ imageLink: '', productName: 'product5', productPrice: '$655', productId: '5' },
	]);

	function onAddItemToCart(productId) {
		const productToBeAddedToCart = products.filter((product) => product.productId === productId);
		setCart(cart.concat(productToBeAddedToCart));
	}

	return (
		<>
			<Sidebar></Sidebar>
			<TopBar cartContentCount={cart.length}></TopBar>
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
					<Cart />
				) : (
					<Error />
				)}
			</main>
		</>
	);
}
