const express = require('express');

const router = express.Router();

const { validateLogin } = require('../middlewares/loginController');
const { validateToken } = require('../middlewares/validateToken');
const {
  addNewUserController,
  getUserByEmailController,
  getAllUsersController,
  deleteUserController,
  updateUserController,
} = require('../controllers/userController');

router.post('/', addNewUserController);
router.get('/userByEmail', validateToken, getUserByEmailController);
router.get('/allUsers', validateToken, getAllUsersController);
router.post('/login', validateLogin);
router.delete('/delete', validateToken, deleteUserController);
router.put('/update', validateToken, updateUserController);

module.exports = router;
