import React, { Component } from 'react';

import {
	getRepository,
	getRepositoryIssues,
} from '../../services/api/Repositories';

// import { Container } from './styles';

export default class Repository extends Component {
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
		const { match } = this.props;
		const { repository, issues, loading } = this.state;

		return <h1>Repository: {decodeURIComponent(match.params.repository)}</h1>;
	}
}
