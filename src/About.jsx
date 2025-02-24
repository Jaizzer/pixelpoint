import { Link } from 'react-router-dom';
import fantastic4Png from './assets/images/fantastic-4.png';
import gtaPng from './assets/images/gta.png';
import valorantPng from './assets/images/valorant.png';
import dotaPng from './assets/images/dota.png';
import genshinPng from './assets/images/genshin.png';
import styled from 'styled-components';

const Container = styled.section`
	height: 100%;
	overflow: scroll;
	background-color: #34343d;
	color: white;
	padding: 1.75em;
    padding-bottom: 7em;

	@media (max-width: 1000px) {
		font-size: 0.8em;
	}

	.aboutHeader {
		text-align: center;
		margin-bottom: 2em;
	}

	.aboutTitle {
		font-size: 2.25em;
		font-weight: bold;
	}

	.aboutSubtitle {
		font-size: 1em;
		color: white;
	}

	a {
		font-size: 1em;

		border-radius: 0.25em;
		border: 0;
		padding: 0.5em 2em;
		background-color: #0ba9c2;
		color: white;
	}

	img {
		height: 100%;
		width: 600px;

		object-fit: cover;
		justify-self: end;
	}

	.aboutContent {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.text {
		display: flex;
		flex-direction: column;
		gap: 1em;
		padding: 2em;
		font-size: 1em;
	}

	.aboutSection {
		border-radius: 1em;
		background-color: #2c2c2c;
		border-radius: 0.5em;

		display: flex;
		justify-content: space-around;

		gap: 1em;
		align-items: center;
	}

	h2 {
		font-size: 2em;
	}

	p {
		font-size: 1em;
	}

	.aboutSection {
		display: flex;
		flex-direction: row-reverse;
		flex-wrap: wrap;
		align-items: center;

		.text {
			max-width: 800px;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}

		img {
			width: clamp(300px, 50%, 700px);
		}

		@media (max-width: 1775px) {
			justify-items: center;
			gap: 2em;
			padding: 3em;
			padding-bottom: 5em;

			.text {
				padding: 0;
			}

			img {
				justify-self: flex-end;
			}
		}
	}

	.aboutSection:nth-child(2) {
		padding-bottom: 0em;
		justify-content: center;
		gap: 4em;

		.text {
			padding: 4em 0em;
		}

		img {
			align-self: end;
			width: clamp(300px, 60%, 600px);
		}

		@media (max-width: 1775px) {
			gap: 2em;
		}

		@media (max-width: 1775px) {
			.text {
				padding: 0;
			}
		}
	}

	.aboutSection:nth-child(3) {
		justify-content: center;
		gap: 4em;

		.text {
			padding: 8em 0;
			max-width: 950px;
		}

		img {
			align-self: center;
			width: clamp(300px, 80%, 450px);
		}

		@media (max-width: 1775px) {
			gap: 1em;
			.text {
				padding: 0;
			}
		}
	}

	.aboutCta {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5em;
		margin-top: 1em;

		img {
			align-self: center;
			width: clamp(300px, 60%, 600px);
			object-fit: contain;
		}
	}

	.ctaCard {
		background-color: #2c2c2c;
		border-radius: 0.5em;
		text-align: center;
		display: grid;
		grid-template-rows: auto auto 1fr 1fr;
		padding: 3em;
		gap: 0.75em;
		align-items: center;

		img {
			height: 200px;
			width: 100%;
			object-fit: contain;
			object-position: 50% 100%;
		}
	}

	.ctaTitle {
		font-size: 1.5em;
	}

	.ctaText {
		font-size: 1em;
		color: white;
	}

	.ctaButton {
		justify-self: center;
		font-size: 1em;
		border-radius: 0.25em;
		border: 0;
		padding: 0.5em 2em;
		background-color: #0ba9c2;
		color: white;
	}
`;

export default function About() {
	return (
		<Container className="aboutPage" title="about">
			<header className="aboutHeader">
				<h1 className="aboutTitle">PixelPoint</h1>
				<p className="aboutSubtitle">Your ultimate destination for discovering and purchasing digital games.</p>
			</header>

			<section className="aboutContent">
				<div className="aboutSection">
					<img src={genshinPng} alt="Who We Are" className="sectionImage" loading="lazy" />

					<div className="text">
						<h2 className="sectionTitle">Who We Are</h2>
						<p className="sectionText">
							PixelPoint is a digital game store dedicated to providing gamers with the latest and greatest titles across various
							platforms. Whether you're looking for indie gems or blockbuster hits, we have something for everyone.
						</p>
						<Link to="/shop" className="ctaButton">
							Shop Games
						</Link>
					</div>
				</div>

				<div className="aboutSection">
					<div className="text">
						<h2 className="sectionTitle">What We Offer</h2>
						<p className="sectionText">
							PixelPoint offers a vast collection of games from top developers and indie studios. Enjoy exclusive discounts and seasonal
							sales, ensuring you get the best deals on your favorite titles. With instant digital downloads and secure transactions,
							purchasing games has never been easier. Plus, our personalized recommendations help you discover new games tailored to
							your gaming preferences.
						</p>
						<Link to="/about" className="ctaButton">
							Explore more
						</Link>
					</div>
					<img src={fantastic4Png} alt="What We Offer" className="sectionImage" loading="lazy" />
				</div>

				<div className="aboutSection">
					<img src={valorantPng} alt="Why Choose PixelPoint?" className="sectionImage" loading="lazy" />

					<div className="text">
						<h2 className="sectionTitle">Why Choose PixelPoint?</h2>
						<p className="sectionText">
							At PixelPoint, we believe in delivering a seamless gaming experience. Our platform is designed to be user-friendly, with a
							curated selection of games and easy navigation to help you find your next favorite title.
						</p>
						<Link to="/cart" className="ctaButton">
							View Cart
						</Link>
					</div>
				</div>
			</section>

			<section className="aboutCta">
				<div className="ctaCard">
					<img src={dotaPng} alt="Start Exploring" className="ctaImage" loading="lazy" />
					<h2 className="ctaTitle">Start Exploring</h2>
					<p className="ctaText">
						Browse our collection and find your next favorite game. Enjoy endless adventures across various game genres.
					</p>
					<Link to="/shop" className="ctaButton">
						Shop Games
					</Link>
				</div>

				<div className="ctaCard">
					<img src={gtaPng} alt="Stay Updated" className="ctaImage" loading="lazy" />
					<h2 className="ctaTitle">Stay Updated</h2>
					<p className="ctaText">
						Get the latest updates on new releases and trending titles. Stay ahead with our hand-picked gaming highlights.
					</p>
					<Link to="/" className="ctaButton">
						Discover Games
					</Link>
				</div>
			</section>
		</Container>
	);
}
