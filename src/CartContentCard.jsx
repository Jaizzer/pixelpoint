import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import blankImage from './assets/images/blank-image.jpg';
import StarRating from './StarRating.jsx';
import Image from './Image.jsx';

const StyledLink = styled(Link)`
	text-decoration: none;
`;

const Container = styled.div`
	box-sizing: border-box;
	margin: 0px;

	padding: 10px 30px;
	border-radius: 10px;
	background-color: #373e48;
	font-family: 'Poppins';

	display: grid;
	grid-template-columns: 1fr auto;
	grid-template-rows: auto;
	align-items: center;
	gap: 10px;

	&:hover {
		background-color: #373737;
	}
`;

const CardContent = styled.div`
	box-sizing: border-box;
	margin: 0px;

	padding: 10px;
	border-radius: 10px;
	color: white;

	display: grid;
	grid-template-columns: 80px 200px 175px 1fr 150px;
	align-items: center;
	grid-template-rows: 1fr;
	gap: 30px;
`;

const StyledImage = styled(Image)`
	box-sizing: border-box;
	margin: 0px;

	width: 80px;
	height: 80px;
	object-fit: cover;
	border-radius: 3px;
`;

const DeleteButton = styled.button`
	grid-template-columns: 2 / 3;
	grid-template-rows: 1 / 2;
    justify-self: center;
    width: 40px;
    height: 40px;

	background-color: #eb4747;
	border-radius: 5px;
	border: 0px;
`;

const ProductPrice = styled.div`
	justify-self: center;
	font-weight: 500;
	font-size: 18px;
`;

function CartContentCard({ title, price, image, id, rating, platform, removeItem }) {
	return (
		<Container title="cart-content-card">
			<StyledLink to={`/gameDetails/${id}`}>
				<CardContent className="cartContentCardInfo">
					<StyledImage src={image ? image : blankImage} />
					<div className="cartContentCartTitle">{title ? title : 'Title Unavailable'}</div>
					<StarRating rating={rating} pixelSize={25} />
					<div>{platform ? platform.join(', ') : null}</div>
					<ProductPrice>{price ? `$${price.toFixed(2)}` : 'Price Unavailable'}</ProductPrice>
				</CardContent>
			</StyledLink>
			<DeleteButton title="remove-item" onClick={removeItem}>
				<RemoveFromCartIcon />
			</DeleteButton>
		</Container>
	);
}

const Icon = styled.svg`
	fill: black;
	width: 20px;
	height: 20px;

	& > * {
		fill: none;
		stroke: white;
		stroke-linecap: 'round';
		stroke-linejoin: round;
		stroke-width: 2;
	}
`;

function RemoveFromCartIcon() {
	return (
		<Icon>
			<path d="M11,20.5h.1m5.9,0h.1" />
			<line x1="12" y1="9" x2="16" y2="5" />
			<line data-name="secondary" x1="16" y1="9" x2="12" y2="5" />
			<path d="M3,3H5.2a1,1,0,0,1,1,.78L8.82,15.22a1,1,0,0,0,1,.78h8.42a1,1,0,0,0,1-.76L21,8" />
		</Icon>
	);
}

CartContentCard.propTypes = {
	title: PropTypes.string,
	price: PropTypes.number,
	image: PropTypes.string,
	id: PropTypes.number,
	rating: PropTypes.number,
	platform: PropTypes.array,
	removeItem: PropTypes.func,
};

export default CartContentCard;
