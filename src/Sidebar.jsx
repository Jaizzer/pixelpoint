import { Link } from 'react-router-dom';
import { HomeIcon, AccountIcon, ShopIcon, AboutIcon } from './Icons';
import styled from 'styled-components';

const Nav = styled.nav`
	box-sizing: border-box;
	margin: 0px;

	width: 250px;
	background-color: #121519;
	padding-top: 100px;
	font-family: 'Poppins';
`;

const StyledLink = styled(Link)`
	box-sizing: border-box;
	margin: 0px;

	text-decoration: none;
	display: grid;
	grid-template-columns: auto 1fr;
	align-items: center;
	gap: 10px;

	color: white;
	stroke: white;

	&:hover {
		stroke: #099ea6;
		color: #099ea6;
	}
`;

const List = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 40px;
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
					<StyledLink to="/account">
						<AccountIcon />
						Account
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
