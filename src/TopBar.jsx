import PropTypes from 'prop-types';
import CartIconWithCount from './CartIconWithCount.jsx';
import { Link } from 'react-router-dom';
import Search from './Search.jsx';
import styled from 'styled-components';

const Container = styled.div`
	box-sizing: border-box;
	margin: 0px;

	display: flex;
	justify-content: space-between;
	gap: 10px;
	background-color: #1b1e22;
	padding: 20px 30px;
`;

const Actions = styled.div`
	box-sizing: border-box;
	margin: 0px;

	display: grid;
	grid-template-columns: repeat(3, auto);
	align-items: center;
	gap: 50px;
`;

const StyledLink = styled(Link)`
	box-sizing: border-box;
	margin: 0px;

	text-decoration: none;
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
