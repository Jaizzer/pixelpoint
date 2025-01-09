import PropTypes from 'prop-types';

function CartIcon({ cartContentCount }) {
	return (
		<button className="cart" title="cart">
			<div className="cartIcon">Cart</div>
			{cartContentCount === 0 ? null : <div className="cartContentCount">{cartContentCount}</div>}
		</button>
	);
}

CartIcon.propTypes = {
	cartContentCount: PropTypes.number,
};

export default CartIcon;
