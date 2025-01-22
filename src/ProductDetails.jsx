import PropTypes from 'prop-types';

function ProductDetails({ title, description, rating, price, developer, releaseDate, platforms }) {
	return (
		<div className="productDetails">
			<h1 className="productTitle">{title}</h1>
			<div className="productRating">{rating ? rating : 'No Rating'}</div>
			<div className="productDescriptionContainer">
				<h2 className="productDescriptionHeading">Description</h2>
				<div className="productDescriptionContent">{description ? description : 'No available description.'}</div>
			</div>
			<div className="productPrice">{price ? `$${price}` : 'Price Unavailable'}</div>
			<div className="otherDetails">
				<div className="productDeveloper">
					<h2 className="productDeveloperHeading">Developer</h2>
					<div className="productDeveloperContent">{developer ? developer : 'Unknown'}</div>
				</div>
				<div className="productReleaseDate">
					<h2 className="productReleaseDateHeading">Release Date</h2>
					<div className="productReleaseDateContent">
						{releaseDate
							? new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(releaseDate))
							: 'Unknown'}
					</div>
				</div>
				<div className="productPlatforms">
					<h2 className="productPlatformsHeading">Platforms</h2>
					<div className="productPlatformsContent">{platforms ? platforms.join(', ') : 'Unknown'}</div>
				</div>
			</div>
		</div>
	);
}

ProductDetails.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	rating: PropTypes.number,
	price: PropTypes.number,
	developer: PropTypes.string,
	releaseDate: PropTypes.string,
	platforms: PropTypes.array,
};

export default ProductDetails;
