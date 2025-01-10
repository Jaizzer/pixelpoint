import PropTypes from 'prop-types';
import CartIcon from './CartIcon';
import { Link } from 'react-router-dom';

function TopBar({ cartContentCount }) {
	return (
		<div className="topBar">
			<div className="searchBar">
				<div className="searchLogoContainer"></div>
				<input type="text" />
			</div>
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
