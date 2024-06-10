const express = require('express');
//const AuthController = require('../controllers/authController');

const router = express.Router();

// Ruta de inicio
router.get('/', (req, res) => {
    res.render('index',{title: 'Index'});
});
  
// Ruta de login
router.get('/login', (req, res) => {
    res.render('login',{title: 'Login🔑'});
});
  
// Ruta de usuarios
router.get('/Usuarios', (req, res) => {
    res.render('usuarios',{title: 'Usuarios🎇'});
});
  
// Ruta de medidas
router.get('/Medidas', (req, res) => {
    res.render('medidas',{title: 'Medidas🧱'});
});

// Ruta de categorias
router.get('/Categorias', (req, res) => {
    res.render('categorias',{title: 'Categorias🐊'});
});

// Ruta de productos
router.get('/Productos', (req, res) => {
    res.render('productos',{title: 'Productos📦'});
});

// Ruta de clientes
router.get('/Clientes', (req, res) => {
    res.render('clientes',{title: 'Clientes🙍‍♂️'});
});

// Ruta de nueva venta
router.get('/Nueva venta', (req, res) => {
    res.render('nueva_venta',{title: 'Nueva venta⛺'});
});

// Ruta de venta
router.get('/Ventas', (req, res) => {
    res.render('ventas',{title: 'Ventas⛺⛺⛺'});
});

// Ruta de proveedores
router.get('/Proveedores', (req, res) => {
    res.render('proveedores',{title: 'Proveedores🚚'});
});

// Ruta de nueva compra
router.get('/Nueva compra', (req, res) => {
    res.render('nueva_compra',{title: 'Nueva compra📝'});
});

// Ruta de compras
router.get('/Compras', (req, res) => {
    res.render('compras',{title: 'Compras📝'});
});

module.exports = router;
