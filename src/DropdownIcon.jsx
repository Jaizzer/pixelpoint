import PropTypes from 'prop-types';
import styled from 'styled-components';

const Icon = styled.svg`
	font: inherit;
	width: 1.2em;
	height: 1.2em;
	fill: white;

	// Flip the icon vertically
	transform: scaleY(${(props) => (props.isDropdownCollapsed ? 1 : -1)});
`;

export default function DropdownIcon({ isDropdownCollapsed }) {
	return (
		<Icon viewBox="0 0 24 24" isDropdownCollapsed={isDropdownCollapsed}>
			<path
				d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 
                   9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 
                   7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 
                   17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 
                   9.70711L12.7071 14.7071Z"
			/>
		</Icon>
	);
}

DropdownIcon.propTypes = {
	isDropdownCollapsed: PropTypes.bool,
};
