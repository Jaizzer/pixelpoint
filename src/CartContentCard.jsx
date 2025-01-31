import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CartContentCard({ title, price, image, id, removeItem }) {
	return (
		<div className="cartContentCard" title="cart-content-card">
			<Link to={`/gameDetails/${id}`}>
				<div className="cartContentCardInfo">
					<div className="cartContentCartTitle">{title ? title : 'Title Unavailable'}</div>
					<div className="cartContentCardPrice">{price ? `$${price}` : 'Price Unavailable'}</div>
					<img src={image} />
				</div>
			</Link>
			<button title="remove-item" onClick={removeItem}>
				Remove Item
			</button>
		</div>
	);
}

CartContentCard.propTypes = {
	title: PropTypes.string,
	price: PropTypes.number,
	image: PropTypes.string,
	id: PropTypes.number,
	removeItem: PropTypes.func,
};

export default CartContentCard;
