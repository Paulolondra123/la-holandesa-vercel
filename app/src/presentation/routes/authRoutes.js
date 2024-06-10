const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();

router.post('/login', AuthController.login);
router.get('/verify-auth', AuthController.verifyAuth);

// Ruta de inicio
router.get('/', (req, res) => {
    res.render('index');
});
  
// Ruta de login
router.get('/login', (req, res) => {
    res.render('login');
});
  
// Ruta para manejar el formulario de inicio de sesión
router.get('/Usuarios', (req, res) => {
    res.render('usuarios');
});
  
// Ruta de perfil
router.get('/Medidas', (req, res) => {
    res.render('medidas');
});

module.exports = router;
