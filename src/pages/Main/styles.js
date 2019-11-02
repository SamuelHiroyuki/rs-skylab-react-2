import styled from 'styled-components';

export const Container = styled.div`
	max-width: 700px;
	border-radius: 4px;
	padding: 30px;
	margin: 80px auto;
	box-shadow: 0 0 20px rgbs(0, 0, 0, 0.1);

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

export const Form = styled.form`
	margin-top: 30px;
	display: flex;

	input {
		padding: 10px 15px;
		border-radius: 4px;
		font-size: 16px;

		border: 1px solid #eee;

		flex: 1;
	}
`;

export const SubmitButton = styled.button.attrs({
	type: 'submit',
})`
	border: 0;
	padding: 0 15px;
	margin-left: 10px;
	border-radius: 4px;

	background-color: #7159c1;

	display: flex;
	justify-content: center;
	align-items: center;
`;
