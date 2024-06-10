const { Client } = require('pg');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

async function connectToPostgres() {
  try {
    const client = new Client(config);
    await client.connect();
    console.log('Conectado a PostgreSQL');
    return client;
  } catch (error) {
    console.error('Error al conectar a PostgreSQL:', error);
  }
}

async function disconnectFromPostgres(client) {
  try {
    await client.end();
    console.log('Desconectado de PostgreSQL');
  } catch (error) {
    console.error('Error al desconectar de PostgreSQL:', error);
  }
}

module.exports = { connectToPostgres, disconnectFromPostgres };
