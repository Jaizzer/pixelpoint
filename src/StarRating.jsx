import PropTypes from 'prop-types';
import styled from 'styled-components';

const Star = styled.span`
    height: fit-content;
	font-size: calc(${(props) => (props.pixelSize ? props.pixelSize : 20)} * 1px);
	color: transparent;
	background-clip: text;
	background-color: grey;
	background-image: linear-gradient(to right, orange ${(props) => props.amount}%, rgba(0, 0, 0, 0) ${(props) => props.amount}%);
`;

const StarsContainer = styled.div`
	display: flex;
	gap: 0.3em;
`;

function StarRating({ rating, pixelSize }) {
	let numOfFullyColoredStars = Math.floor(rating);
	let decimalPartOfTheRating = rating - numOfFullyColoredStars;
	let numberOfStarsToCreate = 5;

	// Start creating the stars
	let stars = [];
	for (let i = 0; i < numberOfStarsToCreate; i++) {
		if (numOfFullyColoredStars !== 0) {
			// Create the fully colored stars first
			stars.push(
				<Star key={i} amount={100} className="star" pixelSize={pixelSize}>
					★
				</Star>
			);
			numOfFullyColoredStars -= 1;
		} else {
			// Create the uncolored or partially uncolored stars
			stars.push(
				<Star key={i} amount={decimalPartOfTheRating * 100} className="star" pixelSize={pixelSize}>
					★
				</Star>
			);
			decimalPartOfTheRating = 0;
		}
	}
	return <StarsContainer>{stars}</StarsContainer>;
}
StarRating.propTypes = {
	rating: PropTypes.number,
	pixelSize: PropTypes.number,
};
export default StarRating;
