import Sidebar from './Sidebar';
import Home from './Home';
import Account from './Account';
import About from './About';
import Shop from './Shop';
import Error from './Error';
import Cart from './Cart';
import TopBar from './TopBar';
import { useParams } from 'react-router-dom';

export default function App() {
	const { content } = useParams();

	return (
		<>
			<Sidebar></Sidebar>
			<TopBar></TopBar>
			<main>
				{!content ? (
					<Home />
				) : content === 'account' ? (
					<Account />
				) : content === 'shop' ? (
					<Shop />
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
