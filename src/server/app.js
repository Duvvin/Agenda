// Importando módulos
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const csrf = require('csurf')
const morgan = require('morgan');
const config = require('./config/env');
const routes = require('./routes');
const session = require('express-session')
const flash = require('connect-flash')
const ejs = require('ejs')
const MongoStore = require('connect-mongo')

// Express Config
const app = express();
  // View Engine
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))
  // Static
  app.use(express.static(path.resolve(__dirname, '../public')))
  // Sessions
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 dia
  },
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}))
  // Middlewares
app.use(flash());
  // Flash Messages
    app.use((req, res, next) => {
      res.locals.user = req.session.user || null;
      res.locals.success_msg = req.flash("success_msg")
      res.locals.error_msg = req.flash("error_msg")
      res.locals.error = req.flash("error")
      next()
    })
app.use(helmet());
app.use(cors());
app.use(morgan(config.isDevelopment ? 'dev' : 'combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

if (config.isProduction) {
  app.use(express.static(path.join(__dirname, '../../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
}

module.exports = app;