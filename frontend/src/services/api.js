import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3006/'
})

const getLogin = async (username, email) => {
  const { data } = await api.post('http://localhost:3006/login', {username, email});
  return data;
}

export default getLogin;

