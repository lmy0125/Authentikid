import axios from 'axios';

const api = axios.create({
	baseURL: '/api', // This assumes your Express routes will start with /api
});

export const fetchExampleData = async () => {
	const response = await api.get('/example');
	return response.data;
};

export const createUser = async (userData) => {
    const response = await axios.post('/api/users', userData);
    return response.data;
  };
  
  export const getUsers = async () => {
    const response = await axios.get('/api/users');
    return response.data;
  };
