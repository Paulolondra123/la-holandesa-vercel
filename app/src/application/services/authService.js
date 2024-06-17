const User = require('../../presentation/models/login_model');
const jwt = require('jsonwebtoken');

class AuthService {
  static async authenticate(username, password) {
    const user = await User.findByUsername(username);
    if (!user) throw new Error('Usuario no encontrado');
    const passwordMatch = await User.verifyPassword(password, user.contraseña);
    if (!passwordMatch) throw new Error('Contraseña incorrecta');
    if (!user.estado) throw new Error('Usuario deshabilitado');
    return user;
  }

  static generateToken(user) {
    const payload = {
      id: user.id_usuario,
      nombres: user.nombres,
      apellidos: user.apellidos,
      usuario: user.usuario,
      perfil: user.perfil,
      fecha_registro: user.fecha_registro,
      estado: user.estado,
      isAuthenticated: true
    };
    return jwt.sign(payload, 'secretkey');
  }
}

module.exports = AuthService;
