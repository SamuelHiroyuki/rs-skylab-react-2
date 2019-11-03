import styled, { keyframes, css } from 'styled-components';

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

const rotates = keyframes`
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`;

export const SubmitButton = styled.button.attrs(({ loading }) => ({
	type: 'submit',
	disabled: loading,
}))`
	border: 0;
	padding: 0 15px;
	margin-left: 10px;
	border-radius: 4px;

	background-color: #7159c1;

	display: flex;
	justify-content: center;
	align-items: center;

	&[disabled] {
		cursor: not-allowed;
		opacity: 0.6;
	}

	/* Ambos o jeitos funcionam apesar de na aula só ser citado o segundo. */
	/* &[disabled] svg {
		animation: ${rotates} 2s linear infinite;
	} */

	${({ loading }) =>
		loading &&
		css`
			svg {
				animation: ${rotates} 2s linear infinite;
			}
		`}
`;

export const List = styled.ul`
	list-style: none;
	margin-top: 30px;

	li {
		padding: 15px 0;

		display: flex;
		justify-content: space-between;
		align-items: center;

		div {
			display: flex;
			align-items: center;

			svg {
				margin-right: 5px;
				cursor: pointer;
			}
		}

		& + li {
			border-top: 1px solid #eee;
		}

		a {
			color: #7159c1;
			text-decoration: none;
		}
	}
`;
