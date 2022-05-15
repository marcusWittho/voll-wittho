import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.css';

function Input({
  label, type, name, value, onChange, error, onBlur,
}) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>{ label }</label>
      <input
        className={styles.input}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      { error && <p className={styles.error}>{ error }</p> }
    </div>
  );
}

Input.defaultProps = {
  label: '',
  type: '',
  name: '',
  value: '',
  onChange: () => {},
  error: '',
  onBlur: () => {},
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  onBlur: PropTypes.func,
};

export default Input;
