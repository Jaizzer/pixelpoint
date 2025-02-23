import PropTypes from 'prop-types';
import ImageSlider from './ImageSlider.jsx';
import StarRating from './StarRating.jsx';
import AddToCartButton from './AddToCartButton.jsx';
import Image from './Image.jsx';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import ReadMoreArea from '@foxeian/react-read-more';

const Teaser = styled.div`
	grid-column: 1 / 2;
	grid-row: 1 / 2;
	height: 100%;

	@media (max-width: 600px) {
		grid-column: 1 / 2;
		grid-row: 3 / 4;
	}
`;

const Container = styled.div`
	height: 100%;
	overflow: scroll;
	padding: 1.75em;
	background-color: #3c4142;
	color: white;

	.descriptionContainer,
	.otherDetails,
	.mainInfo {
		padding: 2.5em;
		background-color: #2c2c2c;
		border-radius: 0.5em;
	}

	.mainInfo {
		padding: 1.25em 2em;
		background-color: #2c2c2c;
		border-radius: 0.5em;
	}

	.descriptionContainer {
		display: grid;
		gap: 0.75em;
	}
	.platforms,
	.genre,
	.developer,
	.releaseDate,
	.ageRating {
		gap: 0.25em;
		display: grid;
		align-content: start;
	}

	@media (min-width: 1334px) {
		.details {
			display: grid;
			grid-template-columns: 700px auto;
			gap: 1.5em 1.75em;
		}

		.mainInfo {
			grid-column: 2 / 3;
			grid-row: 1 / 2;

			display: grid;
			align-content: center;
			gap: 0.75em;
		}

		.descriptionContainer {
			grid-column: 1 / -1;
			grid-row: 2 / 3;
		}

		.otherDetails {
			grid-column: 1 / -1;
			grid-row: 3 / 4;
		}

		.actions {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(150px, 0.8fr));
			gap: 1em;

			& > * {
				font-size: 1.25em;
			}
		}
	}

	h1 {
		font-size: 2em;
	}

	h2 {
		font-size: 1.15em;
	}

	.price {
		font-size: 1.5em;
		font-weight: 600;
		justify-self: start;
		color: #0ba9c2;
	}

	.ratingContent {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.5em;
		align-items: center;
	}

	.otherDetails {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1em 2em;
	}

	& .descriptionContent {
		display: grid;
		gap: 1.25em;

		p {
			text-align: justify;
		}
		button {
			justify-self: start;
			padding: 0em !important;
			text-decoration: none !important;
			background-color: #0ba9c2 !important;
			font-family: 'Poppins' !important;
			padding: 0.4em !important;
			color: white !important;
			border-radius: 0.3em !important;
		}
	}

	@media (max-width: 1334px) {
		.details {
			display: grid;
			gap: 1em;
			grid-template-columns: 1fr;
		}

		.teaser {
			grid-row: 2 / 3;
			grid-column: 1 / -1;
		}

		.mainInfo {
			display: grid;
			align-content: center;
			gap: 0.25em;
			grid-row: 1 /2;
			grid-column: 1 / -1;
		}

		.descriptionContainer {
			grid-column: 1 / -1;
			grid-row: 3 / 4;
		}

		padding: 1.25em;

		.descriptionContent,
		.ratingContent,
		.genreContent,
		.platformsContent,
		.releaseDateContent,
		.developerContent,
		.ageRatingContent {
			font-size: 0.9em;
		}

		h1 {
			font-size: 1.5em;
		}

		h2 {
			font-size: 1em;
		}

		.price {
			font-size: 1.5em;
		}
	}

	@media (max-width: 932px) {
		.details {
			padding-bottom: 120px;
		}

		h1 {
			font-size: 1.25em;
		}

		.descriptionContent,
		.ratingContent,
		.genreContent,
		.platformsContent,
		.releaseDateContent,
		.developerContent,
		.ageRatingContent {
			font-size: 0.7em;
		}

		h2 {
			font-size: 0.9em;
		}
	}
`;

const Actions = styled.div`
	width: 100%;

	display: flex;
	flex-direction: row;
	gap: 1em;

	& button,
	div,
	a {
		width: 100%;
		border-radius: 0.5em;
		font-size: 0.9em;
		padding: 0.25em;
		text-align: center;
	}

	& a {
		background-color: transparent;
		border: 1px solid white;
		display: flex;
		justify-content: center;
		align-content: center;
	}

	@media (max-width: 932px) {
		bottom: 54px;
		left: 0px;
		width: 100%;

		position: fixed;
		background-color: #453e3e;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5em;
		padding: 0.75em 1.5em;
	}
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
		<Container>
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
					<div className="mainInfo">
						<h1 className="title">{game.title}</h1>
						<div className="rating">
							<div className="ratingContent">
								{game.rating ? (
									<>
										<StarRating rating={game.rating} />
										<div className="numberRating">({game.rating})</div>
									</>
								) : (
									'No Rating'
								)}
							</div>
						</div>
						<div className="price">{game.price ? `$${game.price.toFixed(2)}` : 'Price Unavailable'}</div>
						<Actions className="actions">
							<AddToCartButton
								isGameAdded={game.isAddedToCart}
								onAddItemToCart={() => {
									onAddItemToCart(game);
								}}
								caption={'Add to Cart'}
							/>
							<a href="https://store.steampowered.com/">
								<div className="buyNowButton">{`Buy`}</div>
							</a>
						</Actions>
					</div>

					<Teaser className="teaser">
						{game.images.length > 1 ? <ImageSlider imageLinks={game.images}></ImageSlider> : <Image src={null} />}
					</Teaser>

					<div className="descriptionContainer">
						<h2 className="descriptionHeading">Description</h2>
						<ReadMoreArea className="descriptionContent" lettersLimit={400}>
							{game.description ? game.description : 'No available description.'}
						</ReadMoreArea>
					</div>

					<div className="otherDetails">
						<div className="platforms">
							<h2 className="platformsHeading">Platforms</h2>
							<div className="platformsContent">{game.platforms.length > 0 ? game.platforms.join(', ') : 'Unknown'}</div>
						</div>
						<div className="genre">
							<h2 className="genreHeading">Genre</h2>
							<div className="genreContent">{game.genres.length > 0 ? game.genres.join(', ') : 'Unknown'}</div>
						</div>
						<div className="developer">
							<h2 className="developerHeading">Developer</h2>
							<div className="developerContent">{game.developers.length > 0 ? game.developers.join(', ') : 'Unknown'}</div>
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

						<div className="ageRating">
							<h2 className="ageRatingHeading">Age Rating</h2>
							<div className="ageRatingContent">{game.esrbRating ? game.esrbRating.join(', ') : 'Unknown'}</div>
						</div>
					</div>
				</div>
			)}
		</Container>
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
