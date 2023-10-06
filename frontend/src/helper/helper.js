import axios from 'axios';
import jwtDecode from 'jwt-decode';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** Make API requests */

/** Get username from JWT token */
export async function getUsername() {
  const token = localStorage.getItem('token');
  if (!token) {
    Promise.reject('Cannot find token');
  }
  let decode = jwtDecode(token);
  return decode;
}

/** Authenticate function */
export async function auth(username) {
  try {
    return await axios.post('/api/auth', { username });
  } catch (error) {
    return { error: 'Username not exist' };
  }
}

/** Get user details */
export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: 'Password not match' };
  }
}

/** Register user */
export async function registerUser(credentials) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post(`/api/register`, credentials);

    let { username, email } = credentials;

    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** Login */
export async function verifyPassword({ username, password }) {
  try {
    if (username) {
      const { data } = await axios.post('/api/login', { username, password });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: 'Password not match' });
  }
}

/** Edit */
export async function edit(response) {
  try {
    const token = await localStorage.getItem('token');
    const data = await axios.put('/api/edit', response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: 'Cannot edit profile' });
  }
}
