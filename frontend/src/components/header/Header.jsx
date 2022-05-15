import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

function Header({ user }) {
  return (
    <section className={`${styles.initialAnimation} ${styles.header}`}>
      <h1 className={styles.logo}>Voll Store</h1>
      <div className={styles.user}>
        <p className={styles.username}>{user.name}</p>
        <h3 className={styles.coins}>3</h3>
      </div>
    </section>
  );
}

Header.defaultProps = { user: {} };

Header.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape),
};

export default Header;
