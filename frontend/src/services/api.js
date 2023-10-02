import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3006/'
})

export const getLogin = async (username, email) => {
  try {
    const data = await api.post('http://localhost:3006/login', {username, email});
    return data;
  } catch (error) {
    return error.response.data;
  }
}

export const getRegister = async (username, email) => {
  try {
    const data = await api.post('http://localhost:3006/register', {username, email});
    return data;
  } catch (error) {
    return error.response.data;
  }
}

