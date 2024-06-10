const { connectToPostgres, disconnectFromPostgres } = require('../../infrastructure/database/db');
const bcrypt = require('bcryptjs');

class User {
    static async findByUsername(username) {
      let client;
      try {
        client = await connectToPostgres();
        const query = 'SELECT * FROM usuario WHERE usuario = $1';
        const result = await client.query(query, [username]);
        return result.rows[0];
      } catch (error) {
        console.error('Error al buscar usuario:', error);
        throw error;
      } finally {
        if (client) await disconnectFromPostgres(client);
      }
    }
  
    static async verifyPassword(plainTextPassword, hashedPassword) {
      return await bcrypt.compare(plainTextPassword, hashedPassword);
    }
  }
  
  module.exports = User;