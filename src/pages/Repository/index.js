import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	FaSpinner,
	FaChevronCircleLeft,
	FaChevronLeft,
	FaChevronRight,
	FaExclamationCircle,
	FaCheck,
	FaAngleDoubleLeft,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import {
	getRepository,
	getRepositoryIssues,
} from '../../services/api/Repositories';
import Container from '../../components/Container';

import {
	Loading,
	Owner,
	IssuesList,
	Label,
	IssuesFilter,
	Pagination,
} from './styles';

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
		issuesOpen: false,
		issuesClosed: false,
		page: 1,
		disableGoButton: false,
	};

	async componentDidMount() {
		const { match } = this.props;
		const { page } = this.state;
		const repoName = decodeURIComponent(match.params.repository);

		const [repository, issues] = await Promise.all([
			getRepository(repoName),
			getRepositoryIssues(repoName, {
				params: {
					state: 'all',
					per_page: 5,
					page,
				},
			}),
		]);

		this.setState({
			repository: repository.data,
			issues: issues.data,
			loading: false,
		});
	}

	handleFilter = async type => {
		if (type === 'open') {
			await this.setState(prevState => ({ issuesOpen: !prevState.issuesOpen }));
		}

		if (type === 'closed') {
			await this.setState(prevState => ({
				issuesClosed: !prevState.issuesClosed,
			}));
		}

		this.loadIssues();
	};

	loadIssues = async () => {
		const { repository, issuesOpen, issuesClosed, page } = this.state;
		let requestType = 'all';

		if (issuesOpen !== issuesClosed) {
			if (issuesOpen) {
				requestType = 'open';
			} else {
				requestType = 'closed';
			}
		}

		const issues = await getRepositoryIssues(repository.full_name, {
			params: {
				state: requestType,
				per_page: 5,
				page,
			},
		});

		if (issues.data.length === 0) {
			this.setState({ disableGoButton: true, page: page - 1 });
		} else {
			this.setState({ issues: issues.data, disableGoButton: false });
		}
	};

	handlePage = async type => {
		const { page } = this.state;

		let goTo = 1;

		if (type !== 'start') {
			goTo = type === 'back' ? page - 1 : page + 1;
		}

		await this.setState({
			page: goTo,
			disableGoButton: type !== 'go',
		});

		this.loadIssues();
	};

	render() {
		const {
			repository,
			issues,
			loading,
			issuesOpen,
			issuesClosed,
			page,
			disableGoButton,
		} = this.state;

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

				{issues.length > 0 && (
					<IssuesList>
						<IssuesFilter open={issuesOpen} closed={issuesClosed}>
							<button type="button" onClick={() => this.handleFilter('open')}>
								<FaExclamationCircle size={18} /> Open
							</button>
							<button type="button" onClick={() => this.handleFilter('closed')}>
								<FaCheck size={18} /> Closed
							</button>
						</IssuesFilter>

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

						<Pagination fixMargin={page > 1}>
							<div>
								{page > 1 && (
									<button
										type="button"
										onClick={() => this.handlePage('start')}
									>
										<FaAngleDoubleLeft size={18} />
									</button>
								)}
								<button
									disabled={page === 1}
									type="button"
									onClick={() => this.handlePage('back')}
								>
									<FaChevronLeft size={18} />
								</button>
							</div>
							<span>Página: {page}</span>
							<button
								disabled={disableGoButton}
								type="button"
								onClick={() => this.handlePage('go')}
							>
								<FaChevronRight size={18} />
							</button>
						</Pagination>
					</IssuesList>
				)}
			</Container>
		);
	}
}
