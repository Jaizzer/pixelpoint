import PropTypes from 'prop-types';
import SearchGameCard from './SearchGameCard.jsx';
import styled from 'styled-components';

const PopOver = styled.div`
	max-height: 356px;
	overflow: scroll;
	width: 100%;
	padding: 1em 1.5em;

	border-radius: 0px 0px 0.75em 0.75em;

	display: grid;
	gap: 1em;

	background-color: #242629;
	color: white;

	@media (max-width: ${932}px) {
		div {
			font-size: 0.9em;
		}
	}
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
