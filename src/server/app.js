const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const config = require('./config/env');
const routes = require('./routes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const flash = require('express-flash')

const app = express();

app.use(flash());
app.use(helmet());
app.use(cors());
app.use(morgan(config.isDevelopment ? 'dev' : 'combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

if (config.isProduction) {
  app.use(express.static(path.join(__dirname, '../../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
}

app.use(notFound);
app.use(errorHandler);

module.exports = app;