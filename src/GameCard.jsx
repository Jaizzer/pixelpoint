import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Image from './Image.jsx';
import GamingPlatforms from './GamingPlatforms.jsx';
import AddToCartButton from './AddToCartButton.jsx';

const OuterContainer = styled.div`
	position: relative;
`;

const Container = styled.div`
	width: auto;
	height: 300px;

	overflow: hidden;
	border-radius: 1em;

	display: grid;
	grid-auto-rows: 1fr;
	grid-template-columns: 1fr;

	color: white;

	transition: scale ease-in 150ms;
	&:hover {
		scale: 1.05;
	}
`;

const GameCardImage = styled(Image)`
	grid-row: 1 / 3;
	grid-column: 1 / 2;
`;

const GameInfo = styled.div`
	grid-row: 2 / 3;
	grid-column: 1 / 2;
	align-self: end;

	padding: 1em;

	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(3, auto);
	align-items: center;
	gap: 0.2em;

	backdrop-filter: blur(3px);
	background-color: #00000085;

	& > div:nth-child(1) {
		grid-column: 1 / 3;
	}

	& > div:nth-child(2) {
		grid-column: 1 / 3;
		display: grid;
		grid-template-columns: auto auto;
		justify-content: space-between;
		justify-items: end;
		align-items: center;
	}

	& > div:nth-child(3) {
		grid-column: 1 / 3;
	}
`;

const ModifiedAddToCartButton = styled(AddToCartButton)`
	position: absolute;
	top: 0px;
	right: 0px;
	margin: 0.8em;
	border-radius: 0.75em;
`;

const Text = styled.div`
	font-family: 'Poppins';
	font-weight: ${(props) => (props.emphasize ? 'bold' : 'normal')};
	font-size: ${(props) => (props.emphasize ? '1.2em' : '1em')};
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
	width: 1em;
	height: 1em;
	fill: #26c650;
	stroke: #26c650;
`;

const RatingSVG = styled.svg`
	width: 1em;
	height: 1em;
	stroke: #fb9417;
`;

function GameCard({ image, title, price, rating, quantitySold, parentPlatforms, isGameInCart, addToCart, id }) {
	return (
		<OuterContainer className="container">
			<Link to={`/gameDetails/${id}`}>
				<Container title="game-card">
					<GameCardImage src={image} role="image" alt={title} className={'image'} />
					<GameInfo>
						<Text data-testid="title">{title}</Text>
						<div>
							<Text emphasize={true}>{price ? '$' + price.toFixed(2) : null}</Text>

							<GamingPlatforms platforms={parentPlatforms} maximumNumberOfIconsToRender={4} />
						</div>
						<Statistics>
							<div className="rating">
								<StarIcon />
								<div className="rating-content">{rating ? rating.toFixed(1) : 'No Rating'}</div>
							</div>
							<div className="quantitySold">
								<DownloadIcon />
								<div className="quantitySoldContent">{nFormatter(quantitySold)}</div>
							</div>
						</Statistics>
					</GameInfo>
				</Container>
			</Link>
			<ModifiedAddToCartButton className={'addToCartButton'} isGameAdded={isGameInCart} onAddItemToCart={addToCart} />
		</OuterContainer>
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

GameCard.propTypes = {
	image: PropTypes.string,
	title: PropTypes.string,
	price: PropTypes.number,
	id: PropTypes.string,
	rating: PropTypes.number,
	quantitySold: PropTypes.number,
	parentPlatforms: PropTypes.array,
	isGameInCart: PropTypes.bool,
	addToCart: PropTypes.func,
};

export default GameCard;
