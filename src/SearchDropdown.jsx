import PropTypes from 'prop-types';
import SearchProductCard from './SearchProductCard';
import styled from 'styled-components';

const PopOver = styled.div`
	box-sizing: border-box;
	margin: 0px;

	width: 100%;
	max-height: 356px;
	padding: 15px 25px;
	border-radius: 0px;
	overflow: scroll;
	border-top: 3px solid #099ea6;
	color: var(--color);

	display: grid;
	gap: 10px;
`;

function SearchDropdown({ loading, data, error, onSearchResultItemClick }) {
	//Create the product cards to be rendered inside the search drop down
	let searchProductCards;
	if (data != null) {
		searchProductCards = data.map((product) => (
			<SearchProductCard
				key={product.id}
				id={product.id}
				image={product.image}
				name={product.name}
				price={product.price}
				onClickCallback={onSearchResultItemClick}
			/>
		));
	}

	return (
		<PopOver>
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
		</PopOver>
	);
}

SearchDropdown.propTypes = {
	loading: PropTypes.bool,
	data: PropTypes.array,
	error: PropTypes.bool,
	onSearchResultItemClick: PropTypes.func,
};

export default SearchDropdown;
