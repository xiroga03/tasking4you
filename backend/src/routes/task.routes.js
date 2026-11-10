const express = require('express');

function createTaskRoutes(controller) {
  const router = express.Router();
  router.get('/', controller.getTasks);
  router.post('/', controller.createTask);
  router.patch('/:id', controller.updateTask);
  router.delete('/:id', controller.deleteTask);
  return router;
}

module.exports = createTaskRoutes;
