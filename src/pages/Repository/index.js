import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaSpinner, FaChevronCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import {
	getRepository,
	getRepositoryIssues,
} from '../../services/api/Repositories';
import Container from '../../components/Container';

import { Loading, Owner, IssuesList, Label } from './styles';

export default class Repository extends Component {
	static propTypes = {
		match: PropTypes.shape({
			params: PropTypes.shape({
				repository: PropTypes.string,
			}),
		}).isRequired,
	};

	state = {
		repository: {},
		issues: [],
		loading: true,
	};

	async componentDidMount() {
		const { match } = this.props;
		const repoName = decodeURIComponent(match.params.repository);

		const [repository, issues] = await Promise.all([
			getRepository(repoName),
			getRepositoryIssues(repoName, {
				params: {
					state: 'open',
					per_page: 5,
				},
			}),
		]);

		this.setState({
			repository: repository.data,
			issues: issues.data,
			loading: false,
		});
	}

	render() {
		const { repository, issues, loading } = this.state;

		if (loading) {
			return (
				<Loading>
					Carregando
					<FaSpinner color="#fff" size={22} />
				</Loading>
			);
		}

		return (
			<Container>
				<Owner>
					<Link to="/">
						<FaChevronCircleLeft color="#333" size={18} />
					</Link>
					<img src={repository.owner.avatar_url} alt={repository.owner.login} />
					<h1>{repository.name}</h1>
					<p>{repository.description}</p>
				</Owner>

				<IssuesList>
					{issues.map(i => (
						<li key={String(i.id)}>
							<img src={i.user.avatar_url} alt={i.user.login} />
							<div>
								<strong>
									<a
										href={i.html_url}
										target="_blank"
										rel="noopener noreferrer"
									>
										{i.title}
									</a>

									{i.labels.map(label => (
										<Label key={String(label.id)} color={label.color}>
											{label.name}
										</Label>
									))}
								</strong>
								<p>{i.user.login}</p>
							</div>
						</li>
					))}
				</IssuesList>
			</Container>
		);
	}
}
