const {
  addProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProducts,
} = require('../models/productsModels');

const isValid = (name, price, stock, image) => {
  if (!name || typeof name !== 'string') return false;
  if (!price || typeof price !== 'number') return false;
  if (!stock || typeof stock !== 'number') return false;
  if (!image || typeof image !== 'string') return false;

  return true;
};

const addProductServices = async (name, price, stock, image) => {
  const isvalidProduct = isValid(name, price, stock, image);

  if (!isvalidProduct) return { statusCode: 400, message: 'Preencha os campos corretamente' };

  const { id } = await addProduct(name, price, stock, image);

  return {
    id,
  };
};

const getAllProductsServices = async () => {
  const response = await getAllProducts();

  return response;
};

const getProductByIdServices = async ({ id }) => {
  const response = await getProductById({ id });

  if (response.length === 0) {
    return { statusCode: 404, message: 'Produto não encontrado' };
  }

  return response;
};

const deleteProductServices = async ({ id }) => {
  const productExists = await getProductById({ id });

  if (productExists.length === 0) {
    return { statusCode: 404, message: 'Produto não encontrado' };
  }

  const response = await deleteProduct({ id });

  return response;
};

const updateProductServices = async ({
  id, name, price, stock,
}) => {
  const productExists = await getProductById({ id });

  if (productExists.length === 0) {
    return { statusCode: 404, message: 'Produto não encontrado' };
  }

  const response = await updateProducts({
    id, name, price, stock,
  });

  return response;
};

module.exports = {
  addProductServices,
  getAllProductsServices,
  getProductByIdServices,
  deleteProductServices,
  updateProductServices,
};
