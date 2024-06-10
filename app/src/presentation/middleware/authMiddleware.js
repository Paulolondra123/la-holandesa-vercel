const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }
  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.user = decoded;
    if (decoded.isAuthenticated) {
      next();
    } else {
      res.status(401).json({ message: 'Acceso no autorizado' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
}

module.exports = authMiddleware;
