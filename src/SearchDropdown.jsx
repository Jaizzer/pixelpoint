import PropTypes from 'prop-types';
import SearchProductCard from './SearchProductCard';

function SearchDropdown({ loading, data, error }) {
    // Create the product cards to be rendered inside the search drop down
	let searchProductCards;
	if (data != null) {
		searchProductCards = data.map((product) => (
			<SearchProductCard
				key={product.id}
				id={product.id}
				image={product.image}
				name={product.name}
				price={product.price}
				onClickCallback={(clickedResultID) => console.log(clickedResultID)}
			/>
		));
	}

	return (
		<div className="searchDropdown">
			{loading ? (
				// Display loading indicator if there's still no data or error message
				<div className="loadingIndicator" role="loading-indicator">
					Searching...
				</div>
			) : error ? (
				// Display error message
				<div className="errorMessage" title="error-indicator">
					Error
				</div>
			) : (
				// Render the product cards
				searchProductCards
			)}
		</div>
	);
}

SearchDropdown.propTypes = {
	loading: PropTypes.bool,
	data: PropTypes.array,
	error: PropTypes.bool,
	onSearchResultItemClick: PropTypes.func,
};

export default SearchDropdown;
