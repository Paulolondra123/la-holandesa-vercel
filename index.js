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


const authRoutes = require('./app/src/presentation/routes/authRoutes');
const authMiddleware = require('./app/src/presentation/middleware/authMiddleware');

const PORT = process.env.PORT || 3000;

app.use(session({
  secret: 'secretkey',
  resave: true,
  saveUninitialized: true
}));

const corsOptions = {
  origin: ['http://localhost', 'https://la-holandesa-paulolondra123-paulolondra123s-projects.vercel.app', 'https://la-holandesa-2-0.vercel.app'],
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['X-Requested-With', 'Content-Type', 'Authorization'],
  credentials: true
};

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));

// Configurar EJS como motor de plantillas
app.set('views', path.join(__dirname, 'app/src/presentation/views'));
app.set('view engine', 'ejs');

//app.use('/La_holandesa', authRoutes);
// Asegurar rutas protegidas con middleware de autenticación
// app.use('/La_holandesa/protected', authMiddleware, protectedRoutes);

app.get('/', (req, res) => {
    res.render('index');
  });
// Ruta de inicio
/* app.get('/', (req, res) => {
    res.render('index');
  });
  
  // Ruta de login
  app.get('/login', (req, res) => {
    res.render('login');
  });
  
  // Ruta para manejar el formulario de inicio de sesión
  app.post('/login', (req, res) => {
    // Aquí puedes manejar la lógica de inicio de sesión
    const username = req.body.username;
    const password = req.body.password;
    // Por ahora, simplemente redireccionamos al usuario después del envío del formulario
    res.redirect('/');
  });
  
  // Ruta de perfil
  app.get('/profile', (req, res) => {
    // Aquí puedes pasar datos del usuario al perfil
    const user = {
      username: 'exampleuser',
      email: 'example@example.com',
      // Otros datos del usuario...
    };
    res.render('profile', { user });
  });
   */

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
