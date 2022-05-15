import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { GET_USER, LOGIN_TOKEN } from './api';

export const UserContext = React.createContext();

export function UserStorage({ children }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function getUser(token) {
    const { url, options } = GET_USER(token);
    const response = await fetch(url, options);
    const userJson = await response.json();

    setData(userJson);
  }

  async function getLoginUser(email, password) {
    try {
      const { url, options } = LOGIN_TOKEN({ email, password });
      const response = await fetch(url, options);

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const { token } = await response.json();

      localStorage.setItem('token', JSON.stringify(token));

      await getUser(token);

      navigate('/products');
    } catch (err) {
      setError(err.message);
    }
  }

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const context = {
    data, error, getLoginUser,
  };

  return (
    <UserContext.Provider value={context}>
      { children }
    </UserContext.Provider>
  );
}

UserStorage.defaultProps = { children: {} };

UserStorage.propTypes = {
  children: PropTypes.objectOf(PropTypes.shape),
};
