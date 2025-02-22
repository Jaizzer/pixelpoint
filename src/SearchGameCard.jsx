import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Image from './Image.jsx';

const Container = styled.div`
	display: grid;
	grid-template-columns: auto 1fr;
	align-items: center;
	gap: 1.25em;

	&:hover {
		background-color: #373737;
	}

	padding: 0.5em;
	border-radius: 0.5em;

	@media (max-width: ${932}px) {
		padding: 0.3em;
		border-radius: 0.3em;
	}
`;

const GameInfo = styled.div`
	grid-column: 2 / 3;
	display: grid;
	grid-template-rows: auto auto;
`;

const StyledImage = styled(Image)`
	width: 50px;
	object-fit: cover;
	border-radius: 3px;
`;

function SearchGameCard({ image, title, price, onClickCallback, id }) {
	return (
		<Link to={`/gameDetails/${id}`}>
			<Container role="search-game-card" onClick={onClickCallback}>
				<StyledImage src={image} alt={title} />
				<GameInfo>
					<div>{title}</div>
					<div>${price.toFixed(2)}</div>
				</GameInfo>
			</Container>
		</Link>
	);
}

SearchGameCard.propTypes = {
	image: PropTypes.string,
	title: PropTypes.string,
	price: PropTypes.number,
	onClickCallback: PropTypes.func,
	id: PropTypes.number,
};

export default SearchGameCard;
