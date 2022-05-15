const multer = require('multer');

module.exports = {
  storage: multer.diskStorage({
    destination: (_req, _file, callback) => {
      callback(null, 'uploads/');
    },
    filename: (_req, file, callback) => {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
};
