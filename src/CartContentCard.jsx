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

	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1em;

	padding-right: 1em;

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
		align-items: flex-start;
		flex-direction: column;
		gap: 0.5em;
		padding: 1em;
	}
`;

const CardContent = styled.div`
	color: white;

	display: grid;
	grid-template-columns: 120px 1fr;
	align-items: center;
	grid-template-rows: 120px;
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
	padding: 0.55em 0.3em;

	background-color: #eb4747;
	border-radius: 0.2em;
	border: 0px;
`;

const ProductPrice = styled.div`
	justify-self: center;
	font-weight: 500;
	font-size: 1.5em;
`;

const Statistics = styled.div`
	display: flex;
	gap: 1em;

	font-size: 0.8em;
	& > div {
		display: grid;
		grid-template-columns: auto 1fr;
		justify-content: start;
		align-content: center;
		align-items: center;
		gap: 0.1em;

		div {
			margin-top: 2px;
		}
	}
`;

const DownloadSVG = styled.svg`
	width: 1.5em;
	height: 1.5em;
	fill: #26c650;
	stroke: #26c650;
`;

const RatingSVG = styled.svg`
	width: 1.5em;
	height: 1.5em;
	stroke: #fb9417;
`;

function CartContentCard({ title, price, image, id, rating, parentPlatforms, ownerCount, removeItem }) {
	return (
		<Container title="cart-content-card">
			<StyledLink to={`/gameDetails/${id}`}>
				<CardContent className="cartContentCardInfo">
					<StyledImage src={image ? image : blankImage} />
					<div className="mainInfo">
						<div className="cartContentCartTitle">{title ? title : 'Title Unavailable'}</div>
						<ProductPrice>{price ? `$${price.toFixed(2)}` : 'Price Unavailable'}</ProductPrice>
						<Statistics>
							<div className="rating">
								<StarIcon />
								<div className="rating-content">{rating ? rating.toFixed(1) : 'No Rating'}</div>
							</div>
							<div className="quantitySold">
								<DownloadIcon />
								<div className="quantitySoldContent">{nFormatter(ownerCount)}</div>
							</div>
						</Statistics>
						<GamingPlatforms platforms={parentPlatforms} maximumNumberOfIconsToRender={5} />
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
	width: 1.5;
	height: 1.5em;

	& > * {
		fill: #ffffff;
		stroke: white;
		stroke-width: 1;
	}
`;

function RemoveFromCartIcon() {
	return (
		<Icon viewBox="0 0 24 24" fill="none">
			<path
				d="M21.0002 6.72998C20.9802 6.72998 20.9502 6.72998 20.9202 6.72998C15.6302 6.19998 10.3502 5.99998 5.12016 6.52998L3.08016 6.72998C2.66016 6.76998 2.29016 6.46998 2.25016 6.04998C2.21016 5.62998 2.51016 5.26998 2.92016 5.22998L4.96016 5.02998C10.2802 4.48998 15.6702 4.69998 21.0702 5.22998C21.4802 5.26998 21.7802 5.63998 21.7402 6.04998C21.7102 6.43998 21.3802 6.72998 21.0002 6.72998Z"
				fill="#171717"
			/>
			<path
				d="M8.49977 5.72C8.45977 5.72 8.41977 5.72 8.36977 5.71C7.96977 5.64 7.68977 5.25 7.75977 4.85L7.97977 3.54C8.13977 2.58 8.35977 1.25 10.6898 1.25H13.3098C15.6498 1.25 15.8698 2.63 16.0198 3.55L16.2398 4.85C16.3098 5.26 16.0298 5.65 15.6298 5.71C15.2198 5.78 14.8298 5.5 14.7698 5.1L14.5498 3.8C14.4098 2.93 14.3798 2.76 13.3198 2.76H10.6998C9.63977 2.76 9.61977 2.9 9.46977 3.79L9.23977 5.09C9.17977 5.46 8.85977 5.72 8.49977 5.72Z"
				fill="#171717"
			/>
			<path
				d="M15.2099 22.7501H8.7899C5.2999 22.7501 5.1599 20.8201 5.0499 19.2601L4.3999 9.19007C4.3699 8.78007 4.6899 8.42008 5.0999 8.39008C5.5199 8.37008 5.8699 8.68008 5.8999 9.09008L6.5499 19.1601C6.6599 20.6801 6.6999 21.2501 8.7899 21.2501H15.2099C17.3099 21.2501 17.3499 20.6801 17.4499 19.1601L18.0999 9.09008C18.1299 8.68008 18.4899 8.37008 18.8999 8.39008C19.3099 8.42008 19.6299 8.77007 19.5999 9.19007L18.9499 19.2601C18.8399 20.8201 18.6999 22.7501 15.2099 22.7501Z"
				fill="#171717"
			/>
			<path
				d="M13.6601 17.25H10.3301C9.92008 17.25 9.58008 16.91 9.58008 16.5C9.58008 16.09 9.92008 15.75 10.3301 15.75H13.6601C14.0701 15.75 14.4101 16.09 14.4101 16.5C14.4101 16.91 14.0701 17.25 13.6601 17.25Z"
				fill="#171717"
			/>
			<path
				d="M14.5 13.25H9.5C9.09 13.25 8.75 12.91 8.75 12.5C8.75 12.09 9.09 11.75 9.5 11.75H14.5C14.91 11.75 15.25 12.09 15.25 12.5C15.25 12.91 14.91 13.25 14.5 13.25Z"
				fill="#171717"
			/>
		</Icon>
	);
}

function DownloadIcon() {
	return (
		<DownloadSVG viewBox="0 0 24 24" fill="none">
			<path d="M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z" />
			<path d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z" />
		</DownloadSVG>
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

function nFormatter(num) {
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
	}
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
	}
	return num;
}

CartContentCard.propTypes = {
	title: PropTypes.string,
	price: PropTypes.number,
	image: PropTypes.string,
	id: PropTypes.number,
	rating: PropTypes.number,
	parentPlatforms: PropTypes.array,
	removeItem: PropTypes.func,
	ownerCount: PropTypes.number,
};

export default CartContentCard;
