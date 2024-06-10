const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const indexRoutes = require('./app/src/presentation/routes/index')

dotenv.config();

const app = express();

// Configurar bodyParser para analizar datos de formularios
app.use(bodyParser.urlencoded({ extended: false }));


const authRoutes = require('./app/src/presentation/routes/authRoutes');
const authMiddleware = require('./app/src/presentation/middleware/authMiddleware');

const PORT = process.env.PORT || 3000;

app.use(session({
  secret: 'secretkey',
  resave: true,
  saveUninitialized: true
}));

const corsOptions = {
  origin: ['http://localhost', 'https://la-holandesa-vercel-kwld.vercel.app'],
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['X-Requested-With', 'Content-Type', 'Authorization'],
  credentials: true
};

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Middleware to set current route
app.use((req, res, next) => {
    res.locals.currentRoute = req.path;
    next();
  });

// Configurar EJS como motor de plantillas
app.set('views', path.join(__dirname, 'app/src/presentation/views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'app/public/css')));
app.use(express.static(path.join(__dirname, 'app/public/img')));
app.use(express.static(path.join(__dirname, 'app/public/js')));
app.use(express.static(path.join(__dirname, 'app/public/lib')));
app.use(express.static(path.join(__dirname, 'app/public/scss')));
//app.use(express.static(path.join(__dirname, '/node_modules')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));


//app.use('/La_holandesa', authRoutes);
// Asegurar rutas protegidas con middleware de autenticación
// app.use('/La_holandesa/protected', authMiddleware, protectedRoutes);

app.use(indexRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
