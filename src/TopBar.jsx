import PropTypes from 'prop-types';
import CartIconWithCount from './CartIconWithCount';
import { Link } from 'react-router-dom';
import Search from './Search';
import NotificationIconWithCount from './NotificationIconWithCount';

function TopBar({ cartContentCount }) {
	return (
		<div className="topBar">
			<Search />
			<NotificationIconWithCount notificationContentCount={2} />
			<Link to="/cart">
				<CartIconWithCount cartContentCount={cartContentCount} />
			</Link>
			<button className="logout">Logout</button>
		</div>
	);
}

TopBar.propTypes = {
	cartContentCount: PropTypes.number,
};

export default TopBar;
