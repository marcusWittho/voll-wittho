export const API_URL = 'http://localhost:3000/user';

export function LOGIN_TOKEN(body) {
  return {
    url: `${API_URL}/login`,
    options: {
      method: 'POST',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  };
}

export function GET_USER(token) {
  return {
    url: `${API_URL}/userByEmail`,
    options: {
      method: 'GET',
      headers: { Authorization: `${token}` },
    },
  };
}
