import Sidebar from './Sidebar';
import Home from './Home';
import Account from './Account';
import About from './About';
import Shop from './Shop';
import Error from './Error';
import Cart from './Cart';
import TopBar from './TopBar';
import { useParams } from 'react-router-dom';
import ProductDetails from './ProductDetails';
import useFetchProduct from './useFetchProduct';
import useFetchProducts from './useFetchProducts';
import { useState } from 'react';

export default function App() {
	const { content } = useParams();
	const { id } = useParams();
	const { product, isProductHaveError, isProductLoading } = useFetchProduct(id);
	const [products, isProductsHaveError, isProductsLoading, getNewProducts] = useFetchProducts();
	const [cart, setCart] = useState([]);

	function addToCart(productToAdd) {
		// Add the product to the cart
		setCart(cart.concat({ ...productToAdd }));
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
					<Shop products={products} error={isProductsHaveError} loading={isProductsLoading} getNewProducts={getNewProducts} />
				) : content === 'about' ? (
					<About />
				) : content === 'cart' ? (
					<Cart />
				) : content === 'gameDetails' && id !== undefined ? (
					<ProductDetails key={id} product={product} loading={isProductLoading} error={isProductHaveError} onAddItemToCart={addToCart} />
				) : (
					<Error />
				)}
			</main>
		</>
	);
}
