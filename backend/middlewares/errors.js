// eslint-disable-next-line no-unused-vars
module.exports = (err, _req, res, _next) => {
  if (err.statusCode) res.status(err.statusCode).json({ message: err.message });

  return res.status(500).json({
    error: { message: `Internal error server: ${err.message}` },
  });
};
