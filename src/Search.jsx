import { useState, useEffect } from 'react';
import SearchDropdown from './SearchDropdown.jsx';
import styled from 'styled-components';
import getPrice from './getPrice.jsx';

const SearchContainer = styled.div`
	box-sizing: border-box;
	margin: 0px;

	width: clamp(245px, 80%, 400px);
	border-radius: 10px;
	background-color: #242629;
	--color: #858585;

	font-family: 'Poppins';

	position: relative;
`;

const SearchBar = styled.div`
	box-sizing: border-box;
	margin: 0px;

	width: 100%;
	padding: 15px 25px;

	display: grid;
	grid-template-columns: auto 1fr;
	gap: 10px;
`;

const Input = styled.input`
	box-sizing: border-box;
	margin: 0px;

	border: 0px;
	outline: none;
	font: inherit;
	color: var(--color);
	background-color: transparent;
`;

const Label = styled.label`
	display: grid;
	justify-content: center;
	align-items: center;
`;

const Icon = styled.svg`
	margin: 0px;
	box-sizing: border-box;

	font: inherit;
	width: 20px;
	height: 20px;

	fill: none;
	stroke: var(--color);
	stroke-width: 3;
	stroke-linecap: 'round';
	stroke-linejoin: 'round';
`;

function Search() {
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	// Wait for the user to stop typing before fetching the search result
	useEffect(() => {
		const delaySearch = setTimeout(async () => {
			try {
				// Get the search results
				const response = await fetch(`https://api.rawg.io/api/games?key=7316558e23f844788817eccdda2769a2&search=${inputValue}`);
				const jsonData = await response.json();

				// Throw error if no results found
				if (jsonData.results.length === 0) {
					throw new Error('No results found');
				}

				let searchResults = jsonData.results.map((game) => ({
					title: game.name,
					id: game.id,
					price: getPrice(game.id),
					image: game.background_image,
				}));
				setData(searchResults);
			} catch {
				setError(true);
			} finally {
				setIsLoading(false);
			}
		}, 400);

		return () => {
			// Cancel previous timers
			clearTimeout(delaySearch);

			// Display loading indicator whenever the user types again
			setIsLoading(true);
		};
	}, [inputValue]);

	return (
		<SearchContainer>
			<SearchBar>
				<Label htmlFor="search-bar">
					<SearchIcon />
				</Label>
				<Input
					type="text"
					value={inputValue}
					onChange={(e) => {
						setInputValue(e.target.value);
						if (e.target.value === '') {
							setIsDropdownVisible(false);
						} else {
							setIsDropdownVisible(true);
						}
					}}
					onFocus={(e) => {
						if (e.target.value !== '') {
							setIsDropdownVisible(true);
						}
					}}
					id="search-bar"
					placeholder="Search for games"
				/>
			</SearchBar>
			{isDropdownVisible ? (
				<SearchDropdown
					data={data}
					error={error}
					loading={isLoading}
					// Hide the dropdown when a search result item is clicked
					onSearchResultItemClick={() => {
						setIsDropdownVisible(false);
					}}
				/>
			) : null}
		</SearchContainer>
	);
}

function SearchIcon() {
	return (
		<Icon viewBox="0 0 24 24">
			<path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" />
		</Icon>
	);
}

export default Search;
