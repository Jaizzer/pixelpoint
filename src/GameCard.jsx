import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Image from './Image';

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

function GameCard({ image, title, price, id }) {
	return (
		<Link to={`/gameDetails/${id}`}>
			<Container title="game-card">
				<GameCardImage src={image} role="image" alt={title} className={'image'} />
				<GameInfo>
					<Text data-testid="title">{title}</Text>
					<Text emphasize={true}>{price ? '$' + price.toFixed(2) : null}</Text>
				</GameInfo>
			</Container>
		</Link>
	);
}

GameCard.propTypes = {
	image: PropTypes.string,
	title: PropTypes.string,
	price: PropTypes.number,
	id: PropTypes.string,
};

export default GameCard;
