import PropTypes from 'prop-types';
import CartIconWithCount from './CartIconWithCount.jsx';
import { Link } from 'react-router-dom';
import Search from './Search.jsx';
import styled from 'styled-components';

const breakPoint = 932;

const Container = styled.div`
	position: relative;

	grid-column: 2 / 3;
	grid-row: 1 / 2;

	display: grid;
	grid-template-columns: 1fr auto;
	grid-template-rows: 1fr;
	justify-content: space-between;
	align-items: center;

	padding: 0.9em 1.5em;

	background-color: #1f1e26;

	// Search
	& > div {
		grid-column: 1 / 2;
		grid-row: 1 / 2;
		padding: 0.5em 0.75em;
	}

	// Cart
	& > a {
		grid-row: 1 / 2;
		grid-column: 2 / 3;
		padding: 0.5em 0.75em;
	}

	@media (max-width: ${breakPoint}px) {
		grid-row: 1/ 2;
		grid-template-columns: -1 / 1;
		padding: 0.7em 1.5em;
	}
`;

const StyledLink = styled(Link)`
	text-decoration: none;
`;

function TopBar({ cartContentCount }) {
	return (
		<Container>
			<Search />
			<StyledLink to="/cart" role="topbar-actions">
				<CartIconWithCount cartContentCount={cartContentCount} />
			</StyledLink>
		</Container>
	);
}

TopBar.propTypes = {
	cartContentCount: PropTypes.number,
};

export default TopBar;
