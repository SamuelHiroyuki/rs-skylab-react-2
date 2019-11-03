import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import { getRepositoryByName } from '../../services/api/Repositories';

import { Container, Form, SubmitButton, List } from './styles';

export default class Main extends Component {
	state = {
		newRepo: '',
		repositories: [],
		loading: false,
	};

	handleInputChange = ({ target: { value } }) => {
		this.setState({ newRepo: value });
	};

	handleSubmit = async e => {
		e.preventDefault();
		this.setState({ loading: true });

		const { newRepo, repositories } = this.state;

		const response = await getRepositoryByName(newRepo);

		const data = {
			name: response.data.full_name,
		};

		this.setState({
			repositories: [...repositories, data],
			newRepo: '',
			loading: false,
		});
	};

	render() {
		const { newRepo, loading, repositories } = this.state;

		return (
			<Container>
				<h1>
					<FaGithubAlt /> Repositórios
				</h1>

				<Form onSubmit={this.handleSubmit}>
					<input
						value={newRepo}
						placeholder="Adicionar repositório"
						type="text"
						onChange={this.handleInputChange}
					/>

					<SubmitButton loading={loading ? 1 : 0}>
						{loading ? (
							<FaSpinner color="#fff" size={14} />
						) : (
							<FaPlus color="#fff" size={14} />
						)}
					</SubmitButton>
				</Form>

				<List>
					{repositories.map(r => (
						<li key={r.name}>
							<span>{r.name}</span>
							<a href="http://" target="_blank" rel="noopener noreferrer">
								Detalhes
							</a>
						</li>
					))}
				</List>
			</Container>
		);
	}
}
