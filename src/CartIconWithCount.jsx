import PropTypes from 'prop-types';
import { CartIcon as Icon } from './Icons.jsx';
import styled from 'styled-components';

const breakPoint = 932;

const Container = styled.div`
	position: relative;
	height: 1.25em;

	background-color: transparent;
	font-size: 1.25em;
	stroke: white;

	@media (max-width: ${breakPoint}px) {
		font-size: 1em;
	}
`;

const CountIndicator = styled.div`
	position: absolute;
	top: -0.4em;
	right: -0.6em;
	width: 1.5em;

	scale: 0.5;

	display: flex;
	justify-content: center;
	align-items: center;

	border-radius: 1em;
	background-color: #099ea6;
`;

function CartIcon({ cartContentCount }) {
	return (
		<Container title="cart-icon">
			<Icon />
			{cartContentCount === 0 ? null : <CountIndicator title="cart-content-count">{cartContentCount}</CountIndicator>}
		</Container>
	);
}

CartIcon.propTypes = {
	cartContentCount: PropTypes.number,
};

export default CartIcon;
