import styled from 'styled-components';

const Container = styled.div`
	max-width: 700px;
	border-radius: 4px;
	padding: 30px;
	margin: 80px auto;
	box-shadow: 0 0 20px rgbs(0, 0, 0, 0.1);
	position: relative;
	background-color: #fff;

	h1 {
		font-size: 20px;
		display: flex;
		align-items: center;

		svg {
			margin-right: 10px;
		}
	}
`;

export default Container;
