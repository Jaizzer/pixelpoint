import { useState, useEffect } from 'react';
import SearchDropdown from './SearchDropdown.jsx';
import styled from 'styled-components';
import getPrice from './getPrice.jsx';

const SearchContainer = styled.div`
	background-color: #242629;
	--color: #858585;
	padding: 0.75em 1em;
	border-radius: 0.5em;
	top: 0px;
	width: clamp(150px, 95%, 400px);
    min-height: 100%;

	position: absolute;
	z-index: 1000;

	display: grid;
	gap: 1em;


	@media (max-width: ${932}px) {
        padding: 0.2em 0.5em;
	}
`;

const SearchBar = styled.div`
	display: grid;
	grid-template-columns: auto 1fr;
	gap: 0.75em;
	align-items: center;
`;

const Input = styled.input`
	outline: none;
	font-size: 1em;
	color: var(--color);
	background-color: transparent;
	border: 0px;

	@media (max-width: ${932}px) {
		font-size: 0.9em;
	}
`;

const Label = styled.label`
	display: grid;
	justify-content: center;
	align-items: center;
`;

const Icon = styled.svg`
	font: inherit;
	width: 20px;
	height: 20px;
	fill: none;
	stroke: var(--color);
	stroke-width: 3;
	stroke-linecap: round;
	stroke-linejoin: round;
`;

function Search() {
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	// Wait for the user to stop typing before fetching the search result
	useEffect(() => {
		// Reset the error every time the input changes
		setError(false);
		const delaySearch = setTimeout(async () => {
			try {
				// Get the search results
				const response = await fetch(`https://api.rawg.io/api/games?key=c651b80b372d4bc595fa3ba01886bc17&search=${inputValue}`);
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
