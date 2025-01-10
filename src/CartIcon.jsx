import PropTypes from 'prop-types';

function CartIcon({ cartContentCount }) {
	return (
		<button className="cart" title="cart-icon">
			<div className="cartIcon">Cart</div>
			{cartContentCount === 0 ? null : (
				<div className="cartContentCount" title="cart-content-count">
					{cartContentCount}
				</div>
			)}
		</button>
	);
}

CartIcon.propTypes = {
	cartContentCount: PropTypes.number,
};

export default CartIcon;
