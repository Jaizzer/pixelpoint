import { Link } from 'react-router-dom';
import fantastic4Png from './assets/images/fantastic-4.png';
import astroBot from './assets/images/astrobot.png';
import valorantPng from './assets/images/valorant.png';
import dotaPng from './assets/images/dota.png';
import leagueOFLegendsPng from './assets/images/league-of-legends.png';
import styled from 'styled-components';

const Container = styled.section`
	height: 100%;
	overflow: scroll;
`;

export default function About() {
	return (
		<Container className="aboutPage" title="about">
			<header className="aboutHeader">
				<h1 className="aboutTitle">Welcome to PixelPoint</h1>
				<p className="aboutSubtitle">Your ultimate destination for discovering and purchasing digital games.</p>
			</header>

			<section className="aboutContent">
				<div className="aboutSection">
					<img src={leagueOFLegendsPng} alt="Who We Are" className="sectionImage" />
					<h2 className="sectionTitle">Who We Are</h2>
					<p className="sectionText">
						PixelPoint is a digital game store dedicated to providing gamers with the latest and greatest titles across various platforms.
						Whether you're looking for indie gems or blockbuster hits, we have something for everyone.
					</p>
				</div>

				<div className="aboutSection">
					<img src={astroBot} alt="What We Offer" className="sectionImage" />
					<h2 className="sectionTitle">What We Offer</h2>
					<p className="sectionText">
						PixelPoint offers a vast collection of games from top developers and indie studios. Enjoy exclusive discounts and seasonal
						sales, ensuring you get the best deals on your favorite titles. With instant digital downloads and secure transactions,
						purchasing games has never been easier. Plus, our personalized recommendations help you discover new games tailored to your
						gaming preferences.
					</p>
				</div>

				<div className="aboutSection">
					<img src={valorantPng} alt="Why Choose PixelPoint?" className="sectionImage" />
					<h2 className="sectionTitle">Why Choose PixelPoint?</h2>
					<p className="sectionText">
						At PixelPoint, we believe in delivering a seamless gaming experience. Our platform is designed to be user-friendly, with a
						curated selection of games and easy navigation to help you find your next favorite title.
					</p>
				</div>
			</section>

			<section className="aboutCta">
				<div className="ctaCard">
					<img src={dotaPng} alt="Start Exploring" className="ctaImage" />
					<h2 className="ctaTitle">Start Exploring</h2>
					<p className="ctaText">
						Browse our collection and find your next favorite game. Enjoy endless adventures across various game genres.
					</p>
					<Link to="/shop" className="ctaButton">
						Shop Games
					</Link>
				</div>

				<div className="ctaCard">
					<img src={fantastic4Png} alt="Stay Updated" className="ctaImage" />
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
