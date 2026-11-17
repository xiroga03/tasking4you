const express = require('express');
const cors = require('cors');
const { createTaskService } = require('./services/task.service');
const { createTaskController } = require('./controllers/task.controller');
const createTaskRoutes = require('./routes/task.routes');

function createApp({ taskRepository } = {}) {
  const app = express();
  const taskService = createTaskService(taskRepository);
  const taskController = createTaskController(taskService);

  const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.use(cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Origen no permitido por la política CORS.'));
    }
  }));
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', async (req, res) => {
    try {
      if (taskRepository && typeof taskRepository.checkConnection === 'function') {
        await taskRepository.checkConnection();
      } else if (!taskRepository) {
        const pool = require('./config/database');
        await pool.query('SELECT 1');
      }
      return res.status(200).json({ status: 'ok', message: 'API y base de datos disponibles.' });
    } catch (error) {
      return res.status(503).json({ status: 'error', message: 'La base de datos no está disponible.' });
    }
  });

  app.use('/api/tasks', createTaskRoutes(taskController));

  app.use((req, res) => {
    res.status(404).json({ error: 'La ruta solicitada no existe.' });
  });

  app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);
    if (error.type === 'entity.parse.failed') {
      return res.status(400).json({ error: 'El cuerpo enviado no contiene JSON válido.' });
    }
    if (error.message === 'Origen no permitido por la política CORS.') {
      return res.status(403).json({ error: error.message });
    }
    console.error(error);
    const status = Number.isInteger(error.status) ? error.status : 500;
    return res.status(status).json({
      error: status === 500 ? 'Ocurrió un error interno en el servidor.' : error.message
    });
  });

  return app;
}

module.exports = { createApp };
