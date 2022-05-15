require('dotenv').config();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const validate = require('../services/userServices');

module.exports = {
  validateLogin: async (req, res, next) => {
    const { email, password } = req.body;

    const passwordEncrypt = md5(password);

    const isValidCredentials = await validate.checkingLogin(email, passwordEncrypt);
    if (isValidCredentials.statusCode) {
      return next(
        { statusCode: isValidCredentials.statusCode, message: isValidCredentials.message },
      );
    }

    const { password: _, ...withoutPassword } = isValidCredentials;

    const jwtConfig = {
      expiresIn: '24h',
      algorithm: 'HS256',
    };

    const token = jwt.sign(withoutPassword, process.env.JWT_SECRET, jwtConfig);

    return res.status(200).json({ token });
  },
};
