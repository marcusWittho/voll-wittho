require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser').json();

const errors = require('./middlewares/errors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser);
app.use(cors());

const usersRouters = require('./routes/userRoutes');
const productsRouters = require('./routes/productsRoutes');

app.use('/user', usersRouters);
app.use('/product', productsRouters);

app.all('*', (req, res) => res.status(404)
  .json({ message: `Ops... a rota ${req.path} não existe.` }));

app.use(errors);

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
