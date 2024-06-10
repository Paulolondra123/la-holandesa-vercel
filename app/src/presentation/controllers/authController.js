const AuthService = require('../../application/services/authService');

class AuthController {
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

module.exports = AuthController;