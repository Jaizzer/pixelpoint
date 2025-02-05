import PropTypes from 'prop-types';
import { CartIcon as Icon } from './Icons';
import styled from 'styled-components';

const Container = styled.div`
	box-sizing: border-box;
	margin: 0px;

	position: relative;
	background-color: transparent;
	font-family: 'Poppins';
	font-size: 20px;
	stroke: white;
`;

const CountIndicator = styled.div`
	box-sizing: border-box;
	margin: 0px;

	position: absolute;
	top: -8px;
	right: -12px;
	width: 1.5em;
	scale: 0.5;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 100px;
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
