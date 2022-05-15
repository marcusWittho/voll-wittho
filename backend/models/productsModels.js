const connection = require('./connection');

const addProduct = async (name, price, stock, image) => {
  const [response] = await connection
    .execute(
      'INSERT INTO products (name, price, stock, image) VALUES (?, ?, ?, ?)',
      [name, price, stock, image],
    );

  return {
    id: response.insertId,
  };
};

const getAllProducts = async () => {
  const [response] = await connection
    .execute(
      'SELECT id, name, price, stock, image FROM products',
    );

  return response;
};

const getProductById = async ({ id }) => {
  const response = await connection
    .execute(
      'SELECT id, name, price, stock FROM products WHERE id = (?)',
      [id],
    );

  return response[0];
};

const deleteProduct = async ({ id }) => {
  await connection
    .execute(
      'DELETE FROM products WHERE id = (?)',
      [id],
    );

  return { statusCode: 200, message: 'Produto removido com sucesso' };
};

const updateProducts = async ({
  id, name, price, stock,
}) => {
  await connection
    .execute(
      'UPDATE products SET name = (?), price = (?), stock = (?) WHERE id = (?)',
      [name, price, stock, id],
    );

  const response = getProductById({ id });

  return response;
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProducts,
};
