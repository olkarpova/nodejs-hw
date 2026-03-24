import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import {connectMongoDB} from "./db/connectMongoDB.js";
// +.js дописуємо
import { notFoundHandler } from './middelware/notfoundHandler.js';
import { errorHandler } from './middelware/errorHandler.js';
import { logger } from './middelware/logger.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();
dotenv.config();
// console.log(process.env);
const PORT = process.env.PORT ?? 3000;

//Логування часу:
app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString('uk-UA')}`);
  next();
});

app.use(logger); //Логер першим — бачить усі запити, Middleware для логування
app.use(express.json({limit: '500kb'}),
); //Парсинг JSON-тіла
app.use(cors()); //Дозвіл для запитів з будь-яких джерел
app.use(helmet());

app.use(notesRoutes);

//404Middleware для неіснуючих маршрутів
app.use(notFoundHandler);

// Middleware для обробки помилок
app.use(errorHandler);

await connectMongoDB(); //зʼєденуємось до БД

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
