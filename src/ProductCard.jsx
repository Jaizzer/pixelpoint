import PropTypes from 'prop-types';
import OrderCountController from './OrderCountController';

function ProductCard({ imageLink, productName, productPrice, productId, onAddItemToCart }) {
	return (
		<div className="ProductCard">
			<img src={imageLink} role="image" alt={productName} />
			<div className="productName" data-testid="productName">
				{productName}
			</div>
			<div className="price">{productPrice}</div>
			<OrderCountController
				onAddItemToCart={() => {
					onAddItemToCart(productId);
				}}
			/>
		</div>
	);
}

ProductCard.propTypes = {
	imageLink: PropTypes.string,
	productName: PropTypes.string,
	productPrice: PropTypes.string,
	productId: PropTypes.string,
	onAddItemToCart: PropTypes.func,
};

export default ProductCard;
