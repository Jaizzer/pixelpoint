import PropTypes from 'prop-types';
import ImageSlider from './ImageSlider.jsx';
import StarRating from './StarRating.jsx';
import AddToCartButton from './AddToCartButton.jsx';
import Image from './Image.jsx';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const Teaser = styled.div`
	width: fit-content;
`;

function GameDetails({ game, isLoading, error, onAddItemToCart, refetchGame }) {
	const [isErrorNoticeVisible, setIsErrorNoticeVisible] = useState(error ? true : false);

	// Show error notice if an error is encountered
	useEffect(() => {
		if (error) {
			setIsErrorNoticeVisible(true);
		}
	}, [error]);

	return (
		<>
			{isLoading ? (
				<div title="loading-indicator" className="loadingIndicator">
					Loading...
				</div>
			) : isErrorNoticeVisible ? (
				<div className="errorMessage" title="error-message">
					{isErrorNoticeVisible && (
						<div className="error" title="error">
							<div>PixelPoint run into a problem</div>
							<button
								onClick={() => {
									refetchGame();
									setIsErrorNoticeVisible(false);
								}}
							>
								Try Again
							</button>
						</div>
					)}
				</div>
			) : (
				<div className="details">
					<h1 className="title">{game.title}</h1>
					<div className="rating">
						<div className="ratingContent">
							{game.rating ? (
								<>
									<StarRating rating={game.rating} />({game.rating})
								</>
							) : (
								'No Rating'
							)}
						</div>
					</div>
					<Teaser>{game.images.length > 1 ? <ImageSlider imageLinks={game.images}></ImageSlider> : <Image src={null} />}</Teaser>
					<div className="descriptionContainer">
						<h2 className="descriptionHeading">Description</h2>
						<div className="descriptionContent">{game.description ? game.description : 'No available description.'}</div>
					</div>
					<div className="price">{game.price ? `$${game.price.toFixed(2)}` : 'Price Unavailable'}</div>
					<AddToCartButton
						isGameAdded={game.isAddedToCart}
						onAddItemToCart={() => {
							onAddItemToCart(game);
						}}
					/>
					<a href="https://store.steampowered.com/">
						<button>Buy Now</button>
					</a>
					<div className="otherDetails">
						<div className="genre">
							<h2 className="genreHeading">Genre</h2>
							<div className="genreContent">{game.genres ? game.genres.join(', ') : 'Unknown'}</div>
						</div>
						<div className="developer">
							<h2 className="developerHeading">Developer</h2>
							<div className="developerContent">{game.developers ? game.developers.join(', ') : 'Unknown'}</div>
						</div>
						<div className="releaseDate">
							<h2 className="releaseDateHeading">Release Date</h2>
							<div className="releaseDateContent">
								{game.releaseDate
									? new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(
											new Date(game.releaseDate)
									  )
									: 'Unknown'}
							</div>
						</div>
						<div className="platforms">
							<h2 className="platformsHeading">Platforms</h2>
							<div className="platformsContent">{game.platforms ? game.platforms.join(', ') : 'Unknown'}</div>
						</div>
						<div className="ageRating">
							<h2 className="ageRatingHeading">Age Rating</h2>
							<div className="ageRatingContent">{game.esrbRating ? game.esrbRating.join(', ') : 'Unknown'}</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

GameDetails.propTypes = {
	game: PropTypes.object,
	isLoading: PropTypes.bool,
	error: PropTypes.error,
	onAddItemToCart: PropTypes.func,
	refetchGame: PropTypes.func,
};

export default GameDetails;
