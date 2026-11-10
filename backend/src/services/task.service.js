const defaultRepository = require('../repositories/task.repository');

function createTaskService(repository = defaultRepository) {
  return {
    async getTasks() {
      return repository.findAll();
    },

    async createTask(payload) {
      if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
        const error = new Error('El cuerpo de la solicitud debe ser un objeto JSON.');
        error.status = 400;
        throw error;
      }

      const title = typeof payload.title === 'string' ? payload.title.trim() : '';
      const description = payload.description == null ? '' : payload.description;

      if (!title) {
        const error = new Error('El título es obligatorio.');
        error.status = 400;
        throw error;
      }
      if (title.length > 160) {
        const error = new Error('El título no puede superar los 160 caracteres.');
        error.status = 400;
        throw error;
      }
      if (typeof description !== 'string') {
        const error = new Error('La descripción debe ser un texto.');
        error.status = 400;
        throw error;
      }
      if (description.length > 5000) {
        const error = new Error('La descripción no puede superar los 5000 caracteres.');
        error.status = 400;
        throw error;
      }

      return repository.create({ title, description: description.trim() });
    },

    async updateTask(id, payload) {
      const numericId = Number(id);
      if (!Number.isSafeInteger(numericId) || numericId <= 0) {
        const error = new Error('El identificador de la tarea no es válido.');
        error.status = 400;
        throw error;
      }
      if (!payload || typeof payload !== 'object' || Array.isArray(payload)
          || typeof payload.completed !== 'boolean') {
        const error = new Error('El campo completed es obligatorio y debe ser booleano.');
        error.status = 400;
        throw error;
      }
      return repository.update(numericId, { completed: payload.completed });
    },

    async deleteTask(id) {
      const numericId = Number(id);
      if (!Number.isSafeInteger(numericId) || numericId <= 0) {
        const error = new Error('El identificador de la tarea no es válido.');
        error.status = 400;
        throw error;
      }
      return repository.remove(numericId);
    }
  };
}

module.exports = { createTaskService };
