import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SearchProductCard({ image, name, price, onClickCallback, id }) {
	return (
		<Link to={`/gameDetails/${id}`}>
			<div className="searchProductCard" role="search-product-card" onClick={onClickCallback}>
				<img src={image} alt={name} />
				<div className="productName">{name}</div>
				<div className="productPrice">${price}</div>
			</div>
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
