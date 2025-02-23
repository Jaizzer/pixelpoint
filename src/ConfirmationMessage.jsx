import PropTypes from 'prop-types';
import styled from 'styled-components';

const Background = styled.div`
	left: 1.5em;
	right: 1.5em;
	top: 30%;
	margin: 0 auto;
	position: absolute;
	display: grid;
	justify-content: center;
	align-content: center;
	z-index: 1000;
`;

const Container = styled.div`
	display: grid;
	justify-content: auto auto;
	gap: 1em;
	align-items: center;

	padding: 1.5em;
	background-color: #424242;
	border-radius: 0.5em;

	.confirmationAction {
		display: flex;
		justify-content: flex-end;
		gap: 1em;
	}

	button {
		font-size: 1em;

		border-radius: 0.25em;

		border: 0;
		padding: 0.5em 2em;
		background-color: #0ba9c2;
		color: white;
	}
`;

function ConfirmationMessage({ message, onClickYes, onClickCancel }) {
	return (
		<Background className="background">
			<Container className="container">
				<div className="message">{message}</div>
				<div className="confirmationAction">
					<button onClick={onClickYes}>Yes</button>
					<button onClick={onClickCancel}>Cancel</button>
				</div>
			</Container>
		</Background>
	);
}

export default ConfirmationMessage;
ConfirmationMessage.propTypes = {
	message: PropTypes.string,
	onClickYes: PropTypes.func,
	onClickCancel: PropTypes.func,
};
