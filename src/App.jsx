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
		{ imageLink: '', productName: 'product1', productPrice: '$451', productId: '1', productCartQuantity: null },
		{ imageLink: '', productName: 'product2', productPrice: '$552', productId: '2', productCartQuantity: null },
		{ imageLink: '', productName: 'product3', productPrice: '$653', productId: '3', productCartQuantity: null },
		{ imageLink: '', productName: 'product4', productPrice: '$654', productId: '4', productCartQuantity: null },
		{ imageLink: '', productName: 'product5', productPrice: '$655', productId: '5', productCartQuantity: null },
	]);

	function onAddItemToCart(productId, productCartQuantity) {
		// Update the products
		const updatedProducts = products.map((existingCartItem) =>
			existingCartItem.productId === productId ? { ...existingCartItem, productCartQuantity: productCartQuantity } : existingCartItem
		);
		setProducts(updatedProducts);

		const productIsNotYetInTheCart = cart.filter((cartProduct) => cartProduct.productId === productId).length === 0;
		if (productIsNotYetInTheCart) {
			// Add the product to the cart if it's not yet in the cart
			const [productToBeAddedToCart] = updatedProducts.filter((updatedProduct) => updatedProduct.productId === productId);
			setCart([...cart, productToBeAddedToCart]);
		} else {
			// Modify the product quantity if it's already in the cart
			const updatedCart = cart.map((existingCartItem) =>
				existingCartItem.productId === productId ? { ...existingCartItem, productCartQuantity: productCartQuantity } : existingCartItem
			);
			setCart(updatedCart);
		}
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
