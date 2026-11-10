const test = require('node:test');
const assert = require('node:assert/strict');
const { createTaskService } = require('./task.service');

function makeRepository() {
  const data = [];
  let nextId = 1;
  return {
    async findAll() { return [...data]; },
    async create(task) {
      const created = { id: nextId++, ...task, completed: false,
        created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
      data.push(created);
      return created;
    },
    async update(id, changes) {
      const task = data.find((item) => item.id === id);
      if (!task) return null;
      Object.assign(task, changes);
      return task;
    },
    async remove(id) {
      const index = data.findIndex((item) => item.id === id);
      if (index === -1) return false;
      data.splice(index, 1);
      return true;
    }
  };
}

test('crea una tarea y normaliza espacios del título', async () => {
  const service = createTaskService(makeRepository());
  const task = await service.createTask({ title: '  Estudiar API  ', description: '  Repasar rutas ' });
  assert.equal(task.title, 'Estudiar API');
  assert.equal(task.description, 'Repasar rutas');
  assert.equal(task.completed, false);
});

test('rechaza una tarea sin título', async () => {
  const service = createTaskService(makeRepository());
  await assert.rejects(service.createTask({ title: '   ' }), {
    status: 400, message: 'El título es obligatorio.'
  });
});

test('rechaza títulos demasiado largos', async () => {
  const service = createTaskService(makeRepository());
  await assert.rejects(service.createTask({ title: 'a'.repeat(161) }), { status: 400 });
});

test('actualiza el estado de una tarea existente', async () => {
  const service = createTaskService(makeRepository());
  const task = await service.createTask({ title: 'Entregar proyecto' });
  const updated = await service.updateTask(String(task.id), { completed: true });
  assert.equal(updated.completed, true);
});

test('rechaza un estado que no sea booleano', async () => {
  const service = createTaskService(makeRepository());
  await assert.rejects(service.updateTask('1', { completed: 'true' }), { status: 400 });
});

test('elimina una tarea existente y devuelve false si no existe', async () => {
  const service = createTaskService(makeRepository());
  const task = await service.createTask({ title: 'Tarea temporal' });
  assert.equal(await service.deleteTask(String(task.id)), true);
  assert.equal(await service.deleteTask(String(task.id)), false);
});
