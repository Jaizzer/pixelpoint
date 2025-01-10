import ProductCard from './ProductCard';
import PropTypes from 'prop-types';
function Shop({ products }) {
	const productCards = products.map((product) => {
		return (
			<ProductCard
				key={product.productId}
				imageLink={product.imageLink}
				productName={product.productName}
				productPrice={product.productPrice}
			/>
		);
	});

	return <div title="shop">{productCards}</div>;
}

Shop.propTypes = {
	products: PropTypes.array,
};

export default Shop;
