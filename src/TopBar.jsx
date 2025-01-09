import PropTypes from 'prop-types';
import CartIcon from './CartIcon';

function TopBar({ cartContentCount }) {
	return (
		<div className="topBar">
			<div className="searchBar">
				<div className="searchLogoContainer"></div>
				<input type="text" />
			</div>
			<button className="notification">Notification</button>
			<CartIcon cartContentCount={cartContentCount}></CartIcon>
			<button className="logout">Logout</button>
		</div>
	);
}

TopBar.propTypes = {
	cartContentCount: PropTypes.number,
};

export default TopBar;
