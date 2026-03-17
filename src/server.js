import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pino from 'pino-http';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
// console.log(process.env);

const PORT = process.env.PORT ?? 3000;

//Логування часу:
app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString('uk-UA')}`);
  next();
});

// Дозволяє запити з будь-яких джерел
app.use(cors());
app.use(helmet());
// Middleware для парсингу JSON
app.use(express.json());
//Middleware для логування
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

//GET /notes
app.get('/notes', (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});

//GET /notes/notesId
app.get('/notes/:noteId', (req, res) => {
  console.log(req.params);

  res
    .status(200)
    .json({ message: `Retrieved note with ID: ${req.params.noteId}` });
});

// GET /test-error
app.get('/test-error', (req, res) => {
  throw new Error('Simulated server error');
});

//404Middleware для неіснуючих маршрутів
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Middleware для обробки помилок
app.use((err, req, res, next) => {
  console.error('Error:', err.message);

  const isProd = process.env.NODE_ENV === 'production';

  res.status(500).json({
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
