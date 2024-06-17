const buscarusers = require('../models/login_model');
//const AuthService = require('../../application/services/authService');
const jwt = require('jsonwebtoken');

/* class AuthController {
  static async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await AuthService.authenticate(username, password);
      const token = AuthService.generateToken(user);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  static async verifyAuth(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'secretkey');
      if (decoded.isAuthenticated) {
        res.status(200).json({ message: 'Acceso autorizado', perfil: decoded.perfil });
      } else {
        res.status(401).json({ message: 'Acceso no autorizado' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Token inválido' });
    }
  }
}

module.exports = AuthController; */

class LoginController {
  static async login(username, password, req) {
      try {
          // Llamar a la función estática del modelo para obtener la información del usuario
          const users = await buscarusers.getUsuario(username, password);

          
          // Verificar si se obtuvo la información del usuario correctamente
          if (users.error) {
              // Retornar el mensaje de error específico
              throw new Error(users.error);
          }

          const user = users.data;
          if (!user) {
              throw new Error('Credenciales inválidas');
          }


          // Crear un token de autorización con la información del usuario
          //const token = jwt.sign({ id: user.id, username: user.usuario }, 'secretkey', { expiresIn: '5m' });
          const tokenPayload = {
              id: user.id,
              nombres: user.nombres,
              apellidos: user.apellidos,
              usuario: user.usuario,
              perfil: user.perfil,
              fecha_registro: user.fecha_registro,
              username: user.usuario,
              estado: user.estado,
              primerlogin: user.primerlogin,
              isAuthenticated: true // Agregar isAuthenticated al payload
          };
          const token = jwt.sign(tokenPayload, 'secretkey');
          console.log("Tipo de token:", typeof token); // Agregar este registro de consola

          /* // Establecer la sesión del usuario
          req.session.user = user;
          req.session.isAuthenticated = true; */

          // Retornar el token
          return token;
      } catch (error) {
          // Devolver mensaje de error si hay algún problema
          return { error: error.message }; 
      }  
  }

  static async changePassword(req, res) {
      try {
          const { nuevaContraseña } = req.body;
          const userId = req.body.userId; // Obteniendo el ID del usuario desde el cuerpo de la solicitud
          console.log(userId)
          console.log(nuevaContraseña)
          // Actualizar la contraseña en la base de datos
          const isUpdated = await buscarusers.updatePassword(userId, nuevaContraseña);

          if (isUpdated) {
              res.status(200).json({ message: 'Contraseña actualizada correctamente' });
          } else {
              res.status(400).json({ error: 'Error al actualizar la contraseña' });
          }
      } catch (error) {
          res.status(500).json({ error: error.message || 'Error al actualizar la contraseña' });
      }
  }
}

module.exports = LoginController;
