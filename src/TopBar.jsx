import PropTypes from 'prop-types';
import CartIconWithCount from './CartIconWithCount';
import { Link } from 'react-router-dom';
import Search from './Search';
import NotificationIconWithCount from './NotificationIconWithCount';
import LogOutIcon from './LogOutIcon';

function TopBar({ cartContentCount }) {
	return (
		<div className="topBar">
			<Search />
			<Link to={'/notifications'} role="topbar-actions">
				<NotificationIconWithCount notificationContentCount={2} />
			</Link>
			<Link to="/cart" role="topbar-actions">
				<CartIconWithCount cartContentCount={cartContentCount} />
			</Link>
			<Link to="/logout" role="topbar-actions">
				<LogOutIcon />
			</Link>
		</div>
	);
}

TopBar.propTypes = {
	cartContentCount: PropTypes.number,
};

export default TopBar;
