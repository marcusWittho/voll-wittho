const {
  addNewUser,
  getAllUsers,
  getUserByEmail,
  getUserLogin,
  deleteUser,
  updateUser,
} = require('../models/userModels');

const isValid = (name, email, passwordEncrypt) => {
  if (!name || typeof name !== 'string') return false;
  if (!email || typeof email !== 'string') return false;
  if (!passwordEncrypt || typeof passwordEncrypt !== 'string') return false;

  return true;
};

const addNewUserServices = async ({ name, email, passwordEncrypt }) => {
  const isValidUser = isValid(name, email, passwordEncrypt);

  if (!isValidUser) return { statusCode: 400, message: 'Preencha os campos corretamente' };

  const userExists = await getUserByEmail(email);

  if (userExists) {
    return { statusCode: 409, message: 'Usuário já cadastrado' };
  }

  const { id } = await addNewUser({
    name, email, passwordEncrypt,
  });

  return {
    id,
  };
};

const getAllUsersServices = async () => {
  const response = await getAllUsers();

  return response;
};

const getUserByEmailServices = async (email) => {
  if (!email || typeof email !== 'string') return false;

  const result = await getUserByEmail(email);

  return result;
};

const getUserLoginServices = async (email, passwordEncrypt) => {
  if (!email || typeof email !== 'string') return false;
  if (!passwordEncrypt || typeof passwordEncrypt !== 'string') return false;

  const response = await getUserLogin(email, passwordEncrypt);

  return response;
};

const checkingLogin = async (email, passwordEncrypt) => {
  const userExists = await getUserLoginServices(email, passwordEncrypt);

  if (!userExists) return { statusCode: 400, message: 'Usuário não cadastrado.' };

  return userExists;
};

const deleteUserServices = async (email) => {
  if (!email || typeof email !== 'string') return false;

  const userExists = await getUserByEmail(email);

  if (!userExists) return { statusCode: 404, message: 'Usuário não encontrado' };

  const response = await deleteUser(email);

  return response;
};

const updateUserServices = async ({
  id, name, email, passwordEncrypt, coins, admin,
}) => {
  const userExists = await getUserByEmail(email);

  if (!userExists) return { statusCode: 404, message: 'Usuário não encontrado' };

  const response = await updateUser(id, name, email, passwordEncrypt, coins, admin);

  return response;
};

module.exports = {
  addNewUserServices,
  getAllUsersServices,
  getUserByEmailServices,
  getUserLoginServices,
  checkingLogin,
  deleteUserServices,
  updateUserServices,
};
