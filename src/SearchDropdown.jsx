import PropTypes from 'prop-types';
import SearchGameCard from './SearchGameCard.jsx';
import styled from 'styled-components';

const PopOver = styled.div`
	/* box-sizing: border-box;
	margin: 0px;

	width: 100%;
	max-height: 356px;
	padding: 15px 25px;
	border-radius: 0px 0px 10px 10px;
	overflow: scroll;
	color: var(--color);

	display: grid;
	gap: 10px;
	top: 47px;
	position: absolute;
	z-index: 1000;

	background-color: #242629; */
`;

function SearchDropdown({ loading, data, error, onSearchResultItemClick }) {
	//Create the game cards to be rendered inside the search drop down
	let searchGameCards;
	if (data != null) {
		searchGameCards = data.map((game) => (
			<SearchGameCard
				key={game.id}
				id={game.id}
				image={game.image}
				title={game.title}
				price={game.price}
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
					No results found. Try a different keyword.
				</div>
			) : (
				// Render the game cards
				searchGameCards
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
