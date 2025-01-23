import PropTypes from 'prop-types';
import OrderCountController from './OrderCountController';
import { Link } from 'react-router-dom';

function ProductCard({ imageLink, productName, productPrice, productId, onAddItemToCart, productCartQuantity = 0 }) {
	return (
		<div className="ProductCard" title="product-card">
			<Link to={`/gameDetails/${productId}`}>
				<img src={imageLink} role="image" alt={productName} />
				<div className="productName" data-testid="productName">
					{productName}
				</div>
				<div className="price">{'$' + productPrice}</div>
			</Link>
			<OrderCountController
				onAddItemToCart={(productCartQuantity) => {
					onAddItemToCart(productId, productCartQuantity);
				}}
				productCartQuantity={productCartQuantity}
			/>
		</div>
	);
}

ProductCard.propTypes = {
	imageLink: PropTypes.string,
	productName: PropTypes.string,
	productPrice: PropTypes.number,
	productId: PropTypes.string,
	onAddItemToCart: PropTypes.func,
	productCartQuantity: PropTypes.number,
};

export default ProductCard;
