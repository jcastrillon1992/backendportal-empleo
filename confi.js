// Importar módulos necesarios
const express = require('express'); // Framework para manejar rutas y solicitudes HTTP
const mongoose = require('mongoose'); // ODM para MongoDB
const morgan = require('morgan'); // Middleware para logging de solicitudes HTTP
const bodyParser = require('body-parser'); // Middleware para analizar el cuerpo de las solicitudes
const cookieParser = require('cookie-parser'); // Middleware para manejar cookies
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env
const cors = require('cors'); // Middleware para habilitar CORS (Cross-Origin Resource Sharing)
const errorHandler = require("./middleware/error"); // Middleware para manejo de errores personalizados

// Importar rutas de autenticación
const authRoutes = require('./routes/authRoutes');  // Asegúrate de que esta ruta sea correcta

// Crear una instancia de la aplicación Express
const app = express();
const port = 5000; // Puerto en el que el servidor escuchará solicitudes

// Configuración de middlewares
app.use(morgan('dev')); // Usar morgan para registrar las solicitudes HTTP en la consola
app.use(bodyParser.json()); // Analizar el cuerpo de las solicitudes en formato JSON
app.use(cookieParser()); // Usar cookieParser para manejar cookies en las solicitudes
app.use(cors());  // Habilitar CORS para permitir solicitudes desde diferentes orígenes durante el desarrollo

// Ruta de prueba
app.get('/', (req, res) => {
    res.send("Hello from Node Js"); // Ruta básica para verificar que el servidor está funcionando
});

// Configuración de las rutas API
app.use('/api', authRoutes); // Usar el router de autenticación para manejar rutas que comienzan con '/api'

// Middleware de manejo de errores
app.use(errorHandler); // Usar el middleware personalizado para manejar errores de forma global

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.DATABASE, { // Conectar a la base de datos usando la URL desde el archivo .env
    useNewUrlParser: true, // Usar el analizador de URL nuevo para evitar advertencias
    useUnifiedTopology: true // Usar la nueva topología de conexión para evitar advertencias
})
    .then(() => console.log("DB connected")) // Mensaje en consola cuando la conexión es exitosa
    .catch((err) => console.log("Error connecting to the database:", err)); // Mensaje en consola cuando hay un error de conexión

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`); // Mensaje en consola cuando el servidor está funcionando
});