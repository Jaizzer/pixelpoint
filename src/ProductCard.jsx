import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ProductCard({ imageLink, productName, productPrice, productId }) {
	return (
		<div className="ProductCard" title="product-card">
			<Link to={`/gameDetails/${productId}`}>
				<img src={imageLink} role="image" alt={productName} />
				<div className="productName" data-testid="productName">
					{productName}
				</div>
				<div className="price">{'$' + productPrice}</div>
			</Link>
		</div>
	);
}

ProductCard.propTypes = {
	imageLink: PropTypes.string,
	productName: PropTypes.string,
	productPrice: PropTypes.number,
	productId: PropTypes.string,
};

export default ProductCard;
