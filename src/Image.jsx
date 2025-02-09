import blankImage from './assets/images/blank-image.jpg';
import PropTypes from 'prop-types';

function Image({ src, title, className }) {
	return <img src={src ? src : blankImage} alt={title} className={className} />;
}

Image.propTypes = {
	src: PropTypes.string,
	title: PropTypes.string,
	className: PropTypes.string,
};

export default Image;
