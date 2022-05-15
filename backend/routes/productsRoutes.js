const express = require('express');
const multer = require('multer');
const { storage } = require('../middlewares/multer');

const router = express.Router();

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter: (_req, file, callback) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
});

const { validateToken } = require('../middlewares/validateToken');

const {
  addProductController,
  getAllProductsController,
  getProductByIdController,
  deleteProductController,
  updateProductController,
} = require('../controllers/productsControllers');

router.post('/', validateToken, upload.single('image'), addProductController);
router.get('/allProducts', validateToken, getAllProductsController);
router.get('/:id', validateToken, getProductByIdController);
router.delete('/delete/:id', validateToken, deleteProductController);
router.put('/update', validateToken, updateProductController);

module.exports = router;
