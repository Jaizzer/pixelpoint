import PropTypes from 'prop-types';

function ConfirmationMessage({ message, onClickYes, onClickCancel }) {
	return (
		<div className="container">
			<div className="message">{message}</div>
			<div className="actions">
				<button onClick={onClickYes}>Yes</button>
				<button onClick={onClickCancel}>Cancel</button>
			</div>
		</div>
	);
}

export default ConfirmationMessage;
ConfirmationMessage.propTypes = {
	message: PropTypes.string,
	onClickYes: PropTypes.func,
	onClickCancel: PropTypes.func,
};
