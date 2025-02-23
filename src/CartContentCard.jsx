import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import blankImage from './assets/images/blank-image.jpg';
import Image from './Image.jsx';
import GamingPlatforms from './GamingPlatforms.jsx';

const StyledLink = styled(Link)`
	text-decoration: none;
`;

const Container = styled.div`
	border-radius: 0.5em;
	overflow: hidden;
	background-color: #2c2c2c;
	font-family: 'Poppins';

	display: grid;
	grid-template-columns: 1fr auto;
	grid-template-rows: auto;
	align-items: center;
	gap: 1em;

	&:hover {
		background-color: #2e2b40;
	}

	.cartContentCardInfo {
		padding: 0px;
	}

	.rating {
		display: flex;
		gap: 0.25em;
		font-size: 1.1em;
		align-items: center;
	}

	.mainInfo {
		font-size: 0.8em;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		padding: 0.75em;
	}
`;

const CardContent = styled.div`
	padding: 10px;
	border-radius: 10px;
	color: white;

	display: grid;
	grid-template-columns: 100px 1fr;
	align-items: center;
	grid-template-rows: 1fr;
	gap: 0.5em;
`;

const StyledImage = styled(Image)`
	height: 100%;
	object-fit: cover;
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

const RatingSVG = styled.svg`
	width: 1.5em;
	height: 1.5em;
	stroke: #fb9417;
`;

function CartContentCard({ title, price, image, id, rating, parentPlatforms, removeItem }) {
	return (
		<Container title="cart-content-card">
			<StyledLink to={`/gameDetails/${id}`}>
				<CardContent className="cartContentCardInfo">
					<StyledImage src={image ? image : blankImage} />
					<div className="mainInfo">
						<div className="cartContentCartTitle">{title ? title : 'Title Unavailable'}</div>
						<ProductPrice>{price ? `$${price.toFixed(2)}` : 'Price Unavailable'}</ProductPrice>
						{rating && (
							<div className="rating">
								<StarIcon />
								<div className="ratingNumber">{rating.toFixed(1)}</div>
							</div>
						)}
						<GamingPlatforms platforms={parentPlatforms} maximumNumberOfIconsToRender={6} />
					</div>
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

function StarIcon() {
	return (
		<RatingSVG viewBox="0 0 24 24" fill="none">
			<path
				xmlns="http://www.w3.org/2000/svg"
				d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</RatingSVG>
	);
}

CartContentCard.propTypes = {
	title: PropTypes.string,
	price: PropTypes.number,
	image: PropTypes.string,
	id: PropTypes.number,
	rating: PropTypes.number,
	parentPlatforms: PropTypes.array,
	removeItem: PropTypes.func,
};

export default CartContentCard;
