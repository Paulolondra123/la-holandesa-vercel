const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

dotenv.config();

const app = express();

// Configurar bodyParser para analizar datos de formularios
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
  origin: ['http://localhost:3009', 'https://la-holandesa-vercel-kwld.vercel.app','https://la-holandesa.vercel.app'],
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['X-Requested-With', 'Content-Type', 'Authorization'],
  credentials: true
};

app.use(cookieParser());
app.use(cors(corsOptions));

app.use(session({
  secret: 'secretkey',
  resave: true,
  saveUninitialized: true
}));

//Middleware to set current route
app.use((req, res, next) => {
  res.locals.currentRoute = req.path;
  next();
});

// Configurar EJS como motor de plantillas
app.set('views', path.join(__dirname, 'app/src/presentation/views'));
app.set('view engine', 'ejs');

// Configurar las rutas para los archivos estáticos
app.use(express.static(path.join(__dirname, 'app/public/css')));
app.use(express.static(path.join(__dirname, 'app/public/img')));
app.use(express.static(path.join(__dirname, 'app/public/js')));
app.use(express.static(path.join(__dirname, 'app/public/lib')));
app.use(express.static(path.join(__dirname, 'app/public/scss')));
app.use(express.static(path.join(__dirname, 'app/src/shared/constants')))

// Servir archivos CSS desde node_modules
app.use('/flaticon', express.static(path.join(__dirname, 'node_modules/@flaticon/flaticon-uicons/css')));

// Servir archivos CSS de dataTables desde node_modules
app.use('/datatables', express.static(path.join(__dirname, 'node_modules/datatables.net-dt/css')));

// Servir archivos CSS de dataTables desde node_modules
app.use('/datatables', express.static(path.join(__dirname, 'node_modules/datatables.net/js')));

// Ruta para sweetalert2
app.use('/sweetalert2', express.static(path.join(__dirname, 'node_modules/sweetalert2/dist')));

// Ruta para select2
app.use('/select2', express.static(path.join(__dirname, 'node_modules/select2/dist')));

// Importar y configurar las rutas
const indexRoutes = require('./app/src/presentation/routes/index')
const authRoutes = require('./app/src/presentation/routes/authRoutes')
const usuarioRoutes = require('./app/src/presentation/routes/usuarioRoutes')
const dashboardRoutes = require('./app/src/presentation/routes/dashboardRoutes')
const medidaRoutes = require('./app/src/presentation/routes/medidaRoutes')
const categoriaRoutes = require('./app/src/presentation/routes/categoriaRoutes')
const productosRoutes = require('./app/src/presentation/routes/productosRoutes')
const clienteRoutes = require('./app/src/presentation/routes/clienteRoutes')
const ventaRoutes = require('./app/src/presentation/routes/ventaRoutes')
const proveedorRoutes = require('./app/src/presentation/routes/proveedorRouter')
const compraRoutes = require('./app/src/presentation/routes/compraRoutes')
const perfilRoutes = require('./app/src/presentation/routes/perfilRoutes')
const downloadpdf = require('./app/src/presentation/routes/imprimir')



//const authRoutes = require('./app/src/presentation/routes/authRoutes');
const authMiddleware = require('./app/src/presentation/middleware/authMiddleware');

app.use(indexRoutes);
app.use(authRoutes);
app.use(usuarioRoutes,authMiddleware);
app.use(dashboardRoutes,authMiddleware);
app.use(medidaRoutes,authMiddleware);
app.use(categoriaRoutes,authMiddleware);
app.use(productosRoutes,authMiddleware);
app.use(clienteRoutes,authMiddleware);
app.use(ventaRoutes,authMiddleware);
app.use(proveedorRoutes,authMiddleware);
app.use(compraRoutes,authMiddleware);
app.use(perfilRoutes,authMiddleware);
app.use(downloadpdf);


//app.use('/auth', authRoutes);
// Asegurar rutas protegidas con middleware de autenticación
//app.use('/protected', authMiddleware, protectedRoutes);

const PORT = process.env.PORT || 3000;

//app.use('/La_holandesa', authRoutes);
// Asegurar rutas protegidas con middleware de autenticación
// app.use('/La_holandesa/protected', authMiddleware, protectedRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
