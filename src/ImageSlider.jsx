import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 400px;
	overflow: hidden;
	border-radius: 0.5em;

	@media (max-width: 500px) {
		height: 300px;
	}
`;

const DotsContainer = styled.div`
	position: absolute;
	margin-left: auto;
	margin-right: auto;
	right: 0;
	left: 0;

	width: fit-content;
	padding: 0.5em;
	bottom: 0.8em;

	display: flex;
	gap: 0.75em;
`;

const Dot = styled.div`
	width: 0.5em;
	height: 0.5em;
	border-radius: 1em;
	background-color: ${(props) => (props.isActive ? ' #099ea6' : '#ffffff5e;')};
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
`;

const Previous = styled.button`
	position: absolute;
	left: 1px;
	top: 0;
	bottom: 0;
	margin-top: auto;
	margin-left: auto;
	background-color: transparent;
	border: 0px;
	color: #ffffff7c;
	font-size: 50px;
`;

const Next = styled.button`
	position: absolute;
	right: 1px;
	top: 0;
	bottom: 0;
	margin-top: auto;
	margin-left: auto;
	background-color: transparent;
	border: 0px;
	color: #ffffff7c;
	font-size: 50px;
`;

const Icon = styled.svg`
	width: 30px;
	height: 30px;
	transform: rotate(${(props) => (props.isPointingLeft ? '180deg' : '0deg')});
	fill: #ffffff5e;
`;

const HiddenImagesContainer = styled.div`
	display: none;
`;

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
			<Dot
				key={imageLink}
				title="current-image-indicator"
				onClick={() => {
					setCurrentImageIndex(index);
				}}
				isActive={index === currentImageIndex}
			></Dot>
		);
	});

	return (
		<Container>
			<Previous title="previous-button" onClick={moveToPreviousImage}>
				<Arrow isPointingLeft={true} />
			</Previous>
			<Image
				src={imageLinks[currentImageIndex]}
				alt={`Product Screenshot ${currentImageIndex + 1}`}
				role="image"
				loading="eager"
				title="visible-image"
			/>
			<HiddenImagesContainer>
				{/* Force mount invisible images to the DOM to download all images in one go which allows the image slider to avoid redownloading images */}
				{imageLinks.map((imageLink) => (
					<Image key={imageLink} src={imageLink} role="image" loading="eager" />
				))}
			</HiddenImagesContainer>
			<DotsContainer>{imageIndicatorDots}</DotsContainer>
			<Next title="next-button" onClick={moveToNextImage}>
				<Arrow isPointingLeft={false} />
			</Next>
		</Container>
	);
}

ImageSlider.propTypes = {
	imageLinks: PropTypes.array,
};

function Arrow({ isPointingLeft }) {
	return (
		<Icon viewBox="0 0 330 330" isPointingLeft={isPointingLeft}>
			<path
				d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
                    c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
                    C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
                    C255,161.018,253.42,157.202,250.606,154.389z"
			/>
		</Icon>
	);
}

Arrow.propTypes = {
	isPointingLeft: PropTypes.bool,
};

export default ImageSlider;
