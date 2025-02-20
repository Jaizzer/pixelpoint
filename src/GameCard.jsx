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

	padding: 1em;

	align-self: end;

	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(3, auto);
	align-items: center;
	gap: 0.2em;

	backdrop-filter: blur(3px);
	background-color: #00000085;

	div:nth-child(1) {
		grid-column: 1 / 3;
	}

	div:nth-child(2) {
		grid-column: 1 / 2;
	}

	div:nth-child(3) {
		grid-column: 2 / 3;
		display: flex;
		justify-content: end;
	}

	div:nth-child(4) {
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
	font-size: ${(props) => (props.emphasize ? '1.5em' : '1em')};
`;

const Statistics = styled.div`
	display: flex;
	gap: 1em;
`;

function GameCard({ image, title, price, rating, quantitySold, parentPlatforms, isGameInCart, addToCart, id }) {
	return (
		<OuterContainer className="container">
			<Link to={`/gameDetails/${id}`}>
				<Container title="game-card">
					<GameCardImage src={image} role="image" alt={title} className={'image'} />
					<GameInfo>
						<Text data-testid="title">{title}</Text>
						<Text emphasize={true}>{price ? '$' + price.toFixed(2) : null}</Text>
						<div>
							<GamingPlatforms platforms={parentPlatforms} maximumNumberOfIconsToRender={4} />
						</div>
						<Statistics>
							<div className="rating">
								<div className="rating-content">{rating}</div>
							</div>
							<div className="quantitySold">
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
