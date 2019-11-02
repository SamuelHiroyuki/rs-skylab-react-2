import api from './index';

export const getRepositoryByName = name => api.get(`/repos/${name}`);
