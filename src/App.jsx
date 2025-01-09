import Sidebar from './Sidebar';
import Home from './Home';
import Account from './Account';
import About from './About';
import Shop from './Shop';
import { useParams } from 'react-router-dom';

export default function App() {
	const { content } = useParams();

	return (
		<>
			<Sidebar></Sidebar>
			<main>
				{content === undefined ? (
					<Home />
				) : content === 'account' ? (
					<Account />
				) : content === 'shop' ? (
					<Shop />
				) : content === 'about' ? (
					<About />
				) : (
					'Other Page'
				)}
			</main>
		</>
	);
}
