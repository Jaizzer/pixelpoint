import PropTypes from 'prop-types';
import CartIconWithCount from './CartIconWithCount.jsx';
import { Link } from 'react-router-dom';
import Search from './Search.jsx';
import styled from 'styled-components';

const breakPoint = 932;

const Container = styled.div`
	grid-column: 2 / 3;
	grid-row: 1 / 2;

	display: flex;
	justify-content: space-between;
	@media (max-width: ${breakPoint}px) {
		grid-row: 1/ 2;
		grid-template-columns: -1 / 1;
	}
`;

const Actions = styled.div`
	/* box-sizing: border-box;
	margin: 0px;

	display: grid;
	grid-template-columns: repeat(3, auto);
	align-items: center;
	gap: 50px; */
`;

const StyledLink = styled(Link)`
	/* box-sizing: border-box;
	margin: 0px;

	text-decoration: none; */
`;

function TopBar({ cartContentCount }) {
	return (
		<Container>
			<Search />
			<Actions>
				<StyledLink to="/cart" role="topbar-actions">
					<CartIconWithCount cartContentCount={cartContentCount} />
				</StyledLink>
			</Actions>
		</Container>
	);
}

TopBar.propTypes = {
	cartContentCount: PropTypes.number,
};

export default TopBar;
