const mongoose = require('mongoose');
const config = require('./env');

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(config.mongodbUri);

    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB desconectado');
});

mongoose.connection.on('error', (error) => {
  console.error('Erro na conexão MongoDB:', error.message);
});

module.exports = connectDatabase;
