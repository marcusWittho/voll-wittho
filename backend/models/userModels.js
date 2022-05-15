const connection = require('./connection');

const addNewUser = async ({ name, email, passwordEncrypt }) => {
  const [response] = await connection
    .execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, passwordEncrypt],
    );

  return {
    id: response.insertId,
  };
};

const getAllUsers = async () => {
  const [response] = await connection
    .execute(
      'SELECT id, name, email, coins, admin FROM users',
    );

  return response;
};

const getUserByEmail = async (email) => {
  const response = await connection
    .execute(
      'SELECT id, name, email, coins, admin FROM users WHERE email = (?)',
      [email],
    );

  return response[0][0];
};

const getUserLogin = async (email, passwordEncrypt) => {
  const response = await connection
    .execute(
      `SELECT id, name, email, coins, admin FROM users
        WHERE email = (?) AND password = (?)`,
      [email, passwordEncrypt],
    );

  const { password: _, ...responseWithouPassword } = response;

  return responseWithouPassword[0][0];
};

const deleteUser = async (email) => {
  await connection
    .execute(
      'DELETE FROM users WHERE email = (?)',
      [email],
    );

  return { statusCode: 200, message: 'Usuário removido com sucesso' };
};

const updateUser = async (id, name, email, passwordEncrypt, coins, admin) => {
  await connection
    .execute(
      'UPDATE users SET name = (?), email = (?), password = (?), coins = (?), admin = (?) WHERE id = (?)',
      [name, email, passwordEncrypt, coins, admin, id],
    );

  const response = getUserByEmail(email);

  return response;
};

module.exports = {
  addNewUser,
  getAllUsers,
  getUserByEmail,
  getUserLogin,
  deleteUser,
  updateUser,
};
