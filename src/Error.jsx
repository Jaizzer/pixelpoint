import astrobotPng from './assets/images/astrobot-2.png';

import { Link } from 'react-router-dom';
export default function Error() {
	return (
		<div className="errorPage" title="error">
			<div className="errorCard">
				<img src={astrobotPng} className="error" />
				<h1>404</h1>
				<div className="message">Page not found</div>
				<Link to="/shop">
					<button>← Back To Shop</button>
				</Link>
			</div>
		</div>
	);
}
