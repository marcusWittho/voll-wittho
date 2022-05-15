require('dotenv').config();
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const {
  addNewUserServices,
  getAllUsersServices,
  getUserLoginServices,
  getUserByEmailServices,
  deleteUserServices,
  updateUserServices,
} = require('../services/userServices');

const addNewUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const passwordEncrypt = md5(password);

    const user = await addNewUserServices({ name, email, passwordEncrypt });

    if (user.statusCode) {
      return res.status(user.statusCode).json({ message: user.message });
    }

    const newUser = await getUserByEmailServices(email);

    const jwtConfig = { expiresIn: '24h', algorithm: 'HS256' };
    const token = jwt.sign(newUser, process.env.JWT_SECRET, jwtConfig);

    return res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const getUserByEmailController = async (req, res) => {
  const userEmail = req.user;

  const user = await getUserByEmailServices(userEmail.email);

  return res.status(200).json(user);
};

const getAllUsersController = async (_req, res) => {
  const users = await getAllUsersServices();

  return res.status(200).json(users);
};

const getUserLoginController = async (req, res) => {
  const { email, password } = req.body;

  const passwordEncrypt = md5(password);

  const user = await getUserLoginServices({ email, passwordEncrypt });

  if (!user) {
    return res.status(400).json({ message: 'Usuário não encontrado' });
  }

  return res.status(200).json(user);
};

const deleteUserController = async (req, res, next) => {
  const { email } = req.body;

  const response = await deleteUserServices(email);

  if (response.statusCode === 404) {
    return next({ statusCode: response.statusCode, message: response.message });
  }

  return res.status(response.statusCode).json({ message: response.message });
};

const updateUserController = async (req, res, next) => {
  const {
    id, name, email, password, coins, admin,
  } = req.body;

  const passwordEncrypt = md5(password);

  const response = await updateUserServices({
    id, name, email, passwordEncrypt, coins, admin,
  });

  if (response.statusCode === 404) {
    return next({ statusCode: response.statusCode, message: response.message });
  }

  return res.status(200).json(response);
};

module.exports = {
  addNewUserController,
  getUserByEmailController,
  getAllUsersController,
  getUserLoginController,
  deleteUserController,
  updateUserController,
};
