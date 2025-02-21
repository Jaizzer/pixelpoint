import { Link } from 'react-router-dom';
import { HomeIcon, ShopIcon, AboutIcon } from './Icons.jsx';
import styled from 'styled-components';

const breakPoint = 932;
const Nav = styled.nav`
	grid-column: 1 / 2;
	grid-row: 1 / 3;
	padding: 0.75em;
	background-color: #393b42; // Temporary color

	padding-left: 2em;
	padding-right: 6em;

	@media (max-width: ${breakPoint}px) {
		padding-left: 0.5em;
		padding-right: 0.5em;

		font-size: 0.7em;
		bottom: 0px;
		width: 100%;
		position: fixed;
		z-index: 1;
	}
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	display: flex;
	flex-direction: column;
`;

const List = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 40px;
	list-style-type: none;

	& a {
		display: flex;
		flex-direction: row;
		gap: 1em;
	}

	@media (max-width: ${breakPoint}px) {
		flex-direction: row;
		justify-content: space-around;
		align-content: center;

		li:nth-child(1) {
			display: none;
		}
		li:nth-child(2) {
			display: none;
		}

		& a {
			flex-direction: column;
			align-items: center;
			gap: 0.3em;
		}
	}
`;

export default function Sidebar() {
	return (
		<Nav>
			<List>
				<li>
					<StyledLink to="/">PixelPoint</StyledLink>
				</li>
				<li>
					<div className="user">
						<img className="userProfilePicture" />
						<div className="userName">Jaizzer</div>
					</div>
				</li>
				<li>
					<StyledLink to="/">
						<HomeIcon />
						Home
					</StyledLink>
				</li>
				<li>
					<StyledLink to="/shop">
						<ShopIcon />
						Shop
					</StyledLink>
				</li>
				<li>
					<StyledLink to="/about">
						<AboutIcon />
						About
					</StyledLink>
				</li>
			</List>
		</Nav>
	);
}
