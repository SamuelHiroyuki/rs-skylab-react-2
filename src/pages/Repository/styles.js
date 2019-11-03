import styled, { keyframes, css } from 'styled-components';

const rotates = keyframes`
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`;

export const Loading = styled.div`
	color: #fff;
	font-size: 30px;
	font-weight: bold;

	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;

	svg {
		margin-left: 10px;
		animation: ${css`
			${rotates} 2s linear infinite;
		`};
	}
`;

export const Owner = styled.header`
	display: flex;
	flex-direction: column;
	align-items: center;

	img {
		width: 120px;
		border-radius: 50%;
		margin-top: 20px;
	}

	h1 {
		font-size: 24px;
		margin-left: 10px;
	}

	p {
		font-size: 14px;
		margin-left: 5px;
		color: #666;
		line-height: 1.4;
		text-align: center;
		max-width: 400px;
	}

	a {
		position: absolute;
		top: 15px;
		left: 20px;
	}
`;

export const IssuesList = styled.ul`
	padding-top: 30px;
	margin-top: 30px;
	border-top: 1px solid #eee;
	list-style: none;

	li {
		display: flex;
		padding: 15px 10px;
		border: 1px solid #eee;
		border-radius: 4px;

		& + li {
			margin-top: 10px;
		}

		img {
			width: 36px;
			height: 36px;
			border-radius: 50%;
			border: 2px solid #eee;
		}

		div {
			flex: 1;
			margin-left: 15px;

			strong {
				font-size: 16px;

				a {
					text-decoration: none;
					color: #333;

					&:hover {
						color: #7159c1;
					}
				}
			}

			p {
				margin-top: 5px;
				font-size: 12px;
				color: #999;
			}
		}
	}
`;
