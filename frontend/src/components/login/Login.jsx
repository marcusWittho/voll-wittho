import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './Login.module.css';

import LoginForm from './LoginForm';

function Login() {
  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </div>
    </section>
  );
}

export default Login;
