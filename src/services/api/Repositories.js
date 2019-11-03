import api from './index';

export const getRepository = name => api.get(`/repos/${name}`);

export const getRepositoryIssues = (name, queryParams) => {
	return api.get(`/repos/${name}/issues`, queryParams);
};
