import PropTypes from 'prop-types';

function SearchProductCard({ image, name, price, onClickCallback, id }) {
	return (
		<div className="searchProductCard" role="search-product-card" onClick={onClickCallback}>
			<img src={image} alt={name} />
			<div className="productName">{name}</div>
			<div className="productPrice">${price}</div>
		</div>
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
