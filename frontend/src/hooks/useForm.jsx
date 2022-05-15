import { useState } from 'react';

const types = {
  email: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha com um email válido.',
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
    message: 'A senha deve conter pelo menos uma letra maiúscula, um número, um caractere especiial e no mínimo 8 caracteres.',
  },
};

function useForm(type) {
  const [value, setValue] = useState();
  const [error, setError] = useState(null);

  function validate(infoToValidate) {
    if (type === false) return true;

    if (!infoToValidate || infoToValidate.length === 0) {
      setError('Campo obrigatório');
      return false;
    }

    if (types[type] && !types[type].regex.test(infoToValidate)) {
      setError(types[type].message);
      return false;
    }

    setError(null);
    return true;
  }

  function onChange({ target }) {
    if (error) validate(target.value);
    setValue(target.value);
  }

  return {
    value,
    setValue,
    error,
    validate: () => validate(value),
    onChange,
    onBlur: () => validate(value),
  };
}

export default useForm;
