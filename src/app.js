import express from 'express';
import routes from "./routes/index.js";
import { conectMongoDB } from './config/mongoDB.config.js';
import { initializePassport } from './config/passport/passport.config.js';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler.js'; 



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializar passport
initializePassport();

// Inicializar cookie-parser con la palabra secreta
app.use(cookieParser(process.env.COOKIE_SECRET));

// Rutas de la api
app.use("/api", routes);

// Middleware de manejo de errores 
app.use(errorHandler);

// Conexión a MongoDB y arranque del servidor
conectMongoDB()
    .then(() => {
        console.log('Connect to MongoDB');
        app.listen(8080, () => console.log("Server OK PORT 8080"));
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
