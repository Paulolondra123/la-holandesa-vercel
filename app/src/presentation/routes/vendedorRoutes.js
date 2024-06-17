const express = require('express');
const router = express.Router();

// Ruta principal para el vendedor
router.get('/', (req, res) => {
    res.render('vendedor/index', { title: 'Dashboard Vendedor' });
});

// Ruta de nueva venta
router.get('/Nueva-venta', (req, res) => {
    res.render('vendedor/nueva_venta',{title: 'Nueva venta⛺'});
});

// Ruta de clientes
router.get('/Clientes', (req, res) => {
    res.render('vendedor/clientes',{title: 'Clientes🙍‍♂️'});
});

// Ruta de venta
router.get('/Ventas', (req, res) => {
    res.render('vendedor/ventas',{title: 'Ventas⛺⛺⛺'});
});
module.exports = router;
