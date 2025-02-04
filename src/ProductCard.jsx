import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const ProductCardImage = styled.img`
	height: 300px;
	width: 100%;
	grid-row: 1 / 3;
	grid-column: 1 / 2;
	object-fit: cover;
`;

const ProductInfo = styled.div`
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

function ProductCard({ imageLink, productName, productPrice, productId }) {
	return (
		<Link to={`/gameDetails/${productId}`}>
			<Container title="product-card">
				<ProductCardImage src={imageLink} role="image" alt={productName}></ProductCardImage>
				<ProductInfo>
					<Text data-testid="productName">{productName}</Text>
					<Text emphasize={true}>{productPrice ? '$' + productPrice.toFixed(2) : null}</Text>
				</ProductInfo>
			</Container>
		</Link>
	);
}

ProductCard.propTypes = {
	imageLink: PropTypes.string,
	productName: PropTypes.string,
	productPrice: PropTypes.number,
	productId: PropTypes.string,
};

export default ProductCard;
