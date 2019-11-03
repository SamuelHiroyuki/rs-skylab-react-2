import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { getRepository } from '../../services/api/Repositories';
import Container from '../../components/Container';

import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
	state = {
		newRepo: '',
		repositories: [],
		loading: false,
	};

	componentDidMount() {
		const repositories = JSON.parse(localStorage.getItem('repositories'));

		if (repositories) {
			this.setState({ repositories });
		}
	}

	componentDidUpdate(_, prevState) {
		const { repositories } = this.state;

		if (prevState.repositories !== repositories) {
			localStorage.setItem('repositories', JSON.stringify(repositories));
		}
	}

	handleInputChange = ({ target: { value } }) => {
		this.setState({ newRepo: value });
	};

	handleRemoveRepository = repository => {
		this.setState(prevState => ({
			repositories: prevState.repositories.filter(r => r !== repository),
		}));
	};

	handleSubmit = async e => {
		e.preventDefault();
		this.setState({ loading: true });

		const { newRepo, repositories } = this.state;

		const response = await getRepository(newRepo);

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
							<div>
								<FaTimes
									size={12}
									onClick={() => this.handleRemoveRepository(r)}
								/>
								<span>{r.name}</span>
							</div>

							<Link to={`/repository/${encodeURIComponent(r.name)}`}>
								Detalhes
							</Link>
						</li>
					))}
				</List>
			</Container>
		);
	}
}
