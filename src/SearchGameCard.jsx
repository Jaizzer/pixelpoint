import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Image from './Image.jsx';

const Container = styled.div`
	/* box-sizing: border-box;
	margin: 0px;

	padding: 10px;
	border-radius: 10px;
	color: white;

	display: grid;
	grid-template-columns: auto 1fr;
	gap: 20px;
	align-items: center;

	&:hover {
		background-color: #373737;
	} */
`;

const GameInfo = styled.div`
	/* box-sizing: border-box;
	margin: 0px;

	grid-column: 2 / 3;
	display: grid;
	grid-template-rows: auto auto;

	font-size: 15px; */
`;

const StyledImage = styled(Image)`
	/* box-sizing: border-box;
	margin: 0px;

	width: 50px;
	object-fit: cover;
	border-radius: 3px; */
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
