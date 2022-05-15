require('dotenv').config();

const {
  addProductServices,
  getAllProductsServices,
  getProductByIdServices,
  deleteProductServices,
  updateProductServices,
} = require('../services/productsServices');

const addProductController = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const image = req.file.path;
    const { admin } = req.user;

    if (admin === 1) {
      const product = await addProductServices(name, parseFloat(price), parseInt(stock, 10), image);

      return res.status(201).json(product);
    }

    return res.status(403).json({ message: 'Usuário não tem as permissões necessárias' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

const getAllProductsController = async (_req, res) => {
  const products = await getAllProductsServices();

  return res.status(200).json(products);
};

const getProductByIdController = async (req, res, next) => {
  const { id } = req.params;

  const product = await getProductByIdServices({ id });

  if (product.statusCode) {
    return next({ statusCode: product.statusCode, message: product.message });
  }

  return res.status(200).json(product);
};

const deleteProductController = async (req, res, next) => {
  const { id } = req.params;

  const response = await deleteProductServices({ id });

  if (response.statusCode === 404) {
    return next({ statusCode: response.statusCode, message: response.message });
  }

  return res.status(response.statusCode).json({ message: response.message });
};

const updateProductController = async (req, res, next) => {
  const {
    id, name, price, stock,
  } = req.body;

  const response = await updateProductServices({
    id, name, price, stock,
  });

  if (response.statusCode === 404) {
    return next({ statusCode: response.statusCode, message: response.message });
  }

  return res.status(200).json(response);
};

module.exports = {
  addProductController,
  getAllProductsController,
  getProductByIdController,
  deleteProductController,
  updateProductController,
};
