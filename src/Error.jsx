import styled from 'styled-components';
import astrobotPng from './assets/images/astrobot-2.png';

import { Link } from 'react-router-dom';

const Container = styled.div`
	height: 100%;
	overflow: scroll;

	background-color: #34343d;
	color: white;

	display: grid;
	justify-content: center;
	align-items: center;
	align-content: center;
	padding: 1.5em;

	@media (max-width: 950px) {
		font-size: 0.9em;
	}

	.errorCard {
		border-radius: 1em;
		background-color: #2c2c2c;
		border-radius: 0.5em;
		padding: 1.5em;
		padding-bottom: 4em;

		max-width: 400px;
		display: flex;
		flex-direction: column;

		justify-content: center;
		align-items: center;
		gap: 1em;
	}

	img {
		width: clamp(400px, 80%, 00px);
	}

	a {
		font-size: 1em;

		border-radius: 0.25em;
		border: 0;
		padding: 0.5em 2em;
		background-color: #0ba9c2;
		color: white;
	}
`;

export default function Error() {
	return (
		<Container className="errorPage" title="error">
			<div className="errorCard">
				<img src={astrobotPng} className="error" />
				<h1>404</h1>
				<div className="message">Page not found</div>
				<Link to="/shop">← Go To Shop</Link>
			</div>
		</Container>
	);
}
