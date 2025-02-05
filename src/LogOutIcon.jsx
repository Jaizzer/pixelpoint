import { LogOutIcon as Icon } from './Icons';
import styled from 'styled-components';

const Container = styled.div`
	box-sizing: border-box;
	margin: 0px;

	position: relative;
	background-color: transparent;
	font-size: 20px;
	stroke: white;
`;

function LogOutIcon() {
	return (
		<Container title="logout-icon">
			<Icon />
		</Container>
	);
}

export default LogOutIcon;
