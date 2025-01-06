import { Link } from 'react-router-dom';
export default function Sidebar() {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Logo</Link>
				</li>
				<li>
					<Link to="/user">User</Link>
				</li>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/shop">Shop</Link>
				</li>
				<li>
					<Link to="/account">Account</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
			</ul>
		</nav>
	);
}
