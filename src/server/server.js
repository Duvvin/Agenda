const config = require('./config/env');
const connectDatabase = require('./config/database');
const app = require('./app');

console.log(process.env.MONGODB_URI);

const startServer = async () => {
  await connectDatabase();

  app.listen(config.port, () => {
    console.log(`Servidor rodando em http://localhost:${config.port}`);
  });
};

startServer();

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});