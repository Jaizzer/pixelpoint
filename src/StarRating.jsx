import PropTypes from 'prop-types';
import styled from 'styled-components';

const Star = styled.span`
	font-size: 40px;
	color: transparent;
	background-clip: text;
	background-color: grey;
	background-image: linear-gradient(to right, orange ${(props) => props.amount}%, rgba(0, 0, 0, 0) ${(props) => props.amount}%);
`;

const StarsContainer = styled.div`
	display: flex;
	gap: 10px;
`;

function StarRating({ rating }) {
	let numOfFullyColoredStars = Math.floor(rating);
	let decimalPartOfTheRating = rating - numOfFullyColoredStars;
	let numberOfStarsToCreate = 5;

	// Start creating the stars
	let stars = [];
	for (let i = 0; i < numberOfStarsToCreate; i++) {
		if (numOfFullyColoredStars !== 0) {
			// Create the fully colored stars first
			stars.push(
				<Star key={i} amount={100} className="star">
					★
				</Star>
			);
			numOfFullyColoredStars -= 1;
		} else {
			// Create the uncolored or partially uncolored stars
			stars.push(
				<Star key={i} amount={decimalPartOfTheRating * 100} className="star">
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
};
export default StarRating;
