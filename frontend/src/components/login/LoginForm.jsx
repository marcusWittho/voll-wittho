import React from 'react';
import styles from './LoginForm.module.css';
import useForm from '../../hooks/useForm';

import { UserContext } from '../../UserContext';
import Input from '../forms/Input';
import Button from '../forms/Button';

function LoginForm() {
  const username = useForm();
  const password = useForm();

  const { getLoginUser } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      await getLoginUser(username.value, password.value);
    }
  }

  return (
    <section className="initialAnimation loginForm">
      <h1 className="title">Login</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="text"
          name="username"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...username}
        />

        <Input
          label="Senha"
          type="password"
          name="password"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...password}
        />

        <Button type="submit">Entrar</Button>
      </form>
    </section>
  );
}

export default LoginForm;
