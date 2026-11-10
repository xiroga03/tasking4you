function createTaskController(taskService) {
  return {
    async getTasks(req, res, next) {
      try {
        const tasks = await taskService.getTasks();
        res.status(200).json({ tasks });
      } catch (error) {
        next(error);
      }
    },

    async createTask(req, res, next) {
      try {
        const task = await taskService.createTask(req.body);
        res.status(201).json({ message: 'Tarea creada correctamente.', task });
      } catch (error) {
        next(error);
      }
    },

    async updateTask(req, res, next) {
      try {
        const task = await taskService.updateTask(req.params.id, req.body);
        if (!task) {
          return res.status(404).json({ error: 'No se encontró la tarea solicitada.' });
        }
        return res.status(200).json({ message: 'Tarea actualizada correctamente.', task });
      } catch (error) {
        next(error);
      }
    },

    async deleteTask(req, res, next) {
      try {
        const deleted = await taskService.deleteTask(req.params.id);
        if (!deleted) {
          return res.status(404).json({ error: 'No se encontró la tarea solicitada.' });
        }
        return res.status(200).json({ message: 'Tarea eliminada correctamente.' });
      } catch (error) {
        next(error);
      }
    }
  };
}

module.exports = { createTaskController };
