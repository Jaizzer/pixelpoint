import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import blankImage from './assets/images/blank-image.jpg';

const Container = styled.div`
	box-sizing: border-box;
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
	}
`;

const ProductInfo = styled.div`
	box-sizing: border-box;
	margin: 0px;

	grid-column: 2 / 3;
	display: grid;
	grid-template-rows: auto auto;

	font-size: 15px;
`;

const Image = styled.img`
	box-sizing: border-box;
	margin: 0px;
    
	width: 50px;
	object-fit: cover;
	border-radius: 3px;
`;

function SearchProductCard({ image, name, price, onClickCallback, id }) {
	return (
		<Link to={`/gameDetails/${id}`}>
			<Container role="search-product-card" onClick={onClickCallback}>
				<Image src={image ? image : blankImage} alt={name} />
				<ProductInfo>
					<div>{name}</div>
					<div>${price}</div>
				</ProductInfo>
			</Container>
		</Link>
	);
}

SearchProductCard.propTypes = {
	image: PropTypes.string,
	name: PropTypes.string,
	price: PropTypes.number,
	onClickCallback: PropTypes.func,
	id: PropTypes.number,
};

export default SearchProductCard;
