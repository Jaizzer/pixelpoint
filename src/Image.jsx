import styled from 'styled-components';
import blankImage from './assets/images/blank-image.jpg';
import PropTypes from 'prop-types';

const StyledImage = styled.img`
	width: 100%;
`;

function Image({ src, title, className }) {
	return <StyledImage src={src ? src : blankImage} alt={title} className={className} loading="lazy" />;
}

Image.propTypes = {
	src: PropTypes.string,
	title: PropTypes.string,
	className: PropTypes.string,
};

export default Image;
