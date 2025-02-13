import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Image from './Image';
import GamingPlatforms from './GamingPlatforms';

const Container = styled.div`
	min-width: 300px;
	max-width: 500px;
	border-radius: 15px;
	overflow: hidden;
	color: white;
	display: grid;
	grid-template-rows: 1fr;
	grid-template-columns: 1fr;
	justify-content: center;
	transition: scale ease-in 150ms;
	&:hover {
		scale: 1.05;
	}
`;

const GameCardImage = styled(Image)`
	height: 300px;
	width: 100%;
	grid-row: 1 / 3;
	grid-column: 1 / 2;
	object-fit: cover;
`;

const GameInfo = styled.div`
	padding: 15px;
	grid-row: 2 / 3;
	grid-column: 1 / 2;
	backdrop-filter: blur(4px);
	background-color: #00000085;
	align-self: end;
	display: grid;
	gap: 5px;
`;

const Text = styled.div`
	font-family: 'Poppins';
	font-weight: ${(props) => (props.emphasize ? 'bold' : 'normal')};
	font-size: ${(props) => (props.emphasize ? '20px' : '15px')};
`;

function GameCard({ image, title, price, rating, quantitySold, parentPlatforms, isGameInCart, id }) {
	return (
		<Link to={`/gameDetails/${id}`}>
			<Container title="game-card">
				<GameCardImage src={image} role="image" alt={title} className={'image'} />
				<GameInfo>
					<Text data-testid="title">{title}</Text>
					<Text emphasize={true}>{price ? '$' + price.toFixed(2) : null}</Text>
					<div className="rating">
						<div className="rating-content">{rating}</div>
					</div>
					<div className="quantitySold">
						<div className="quantitySoldContent">{nFormatter(quantitySold)}</div>
					</div>
					<div className="platforms">
						<GamingPlatforms platforms={parentPlatforms} maximumNumberOfIconsToRender={5} />
					</div>
				</GameInfo>
			</Container>
		</Link>
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
};

export default GameCard;
