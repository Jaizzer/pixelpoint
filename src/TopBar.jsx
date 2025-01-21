import PropTypes from 'prop-types';
import CartIcon from './CartIcon';
import { Link } from 'react-router-dom';
import Search from './Search';

function TopBar({ cartContentCount }) {
	return (
		<div className="topBar">
			<Search />
			<button className="notification">Notification</button>
			<Link to="/cart">
				<CartIcon cartContentCount={cartContentCount}></CartIcon>
			</Link>
			<button className="logout">Logout</button>
		</div>
	);
}

TopBar.propTypes = {
	cartContentCount: PropTypes.number,
};

export default TopBar;
