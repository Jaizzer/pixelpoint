import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

function ImageSlider({ imageLinks }) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	// Auto slide the image slide every 4 seconds if the user did not press the 'next' and 'previous' buttons
	useEffect(() => {
		const autoSlideImage = setTimeout(moveToNextImage, 4000);
		return () => {
			clearTimeout(autoSlideImage);
		};
	}, [currentImageIndex]);

	function moveToPreviousImage() {
		setCurrentImageIndex((prev) => (imageLinks.length + (prev - 1)) % imageLinks.length);
	}

	function moveToNextImage() {
		setCurrentImageIndex((prev) => (prev + 1) % imageLinks.length);
	}

	const imageIndicatorDots = imageLinks.map((imageLink, index) => {
		return (
			<div
				key={imageLink}
				title="current-image-indicator"
				onClick={() => {
					setCurrentImageIndex(index);
				}}
				className={`imageIndicatorDot ${index === currentImageIndex ? 'active' : 'inactive'}`}
			></div>
		);
	});

	return (
		<div className="imageSlider">
			<button className="imageSliderButton previous" title="previous-button" onClick={moveToPreviousImage}>
				Previous
			</button>
			<img src={imageLinks[currentImageIndex]} alt={`Product Screenshot ${currentImageIndex + 1}`} role="image" loading="eager" />
			<div className="imageIndicatorDotsContainer">{imageIndicatorDots}</div>
			<button className="imageSliderButton next" title="next-button" onClick={moveToNextImage}>
				Next
			</button>
		</div>
	);
}

ImageSlider.propTypes = {
	imageLinks: PropTypes.array,
};

export default ImageSlider;
