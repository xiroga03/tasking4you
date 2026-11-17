const test = require('node:test');
const assert = require('node:assert/strict');
const { createApp } = require('./app');

function makeRepository() {
  const tasks = [];
  let nextId = 1;

  return {
    async findAll() {
      return [...tasks];
    },
    async getSummary() {
      const completed = tasks.filter((task) => task.completed).length;
      return {
        total: String(tasks.length),
        completed: String(completed),
        pending: String(tasks.length - completed)
      };
    },
    async create(input) {
      const now = new Date().toISOString();
      const task = {
        id: nextId++,
        ...input,
        completed: false,
        created_at: now,
        updated_at: now
      };
      tasks.push(task);
      return task;
    },
    async update(id, changes) {
      const task = tasks.find((item) => item.id === id);
      if (!task) return null;
      Object.assign(task, changes, { updated_at: new Date().toISOString() });
      return task;
    },
    async remove(id) {
      const index = tasks.findIndex((item) => item.id === id);
      if (index === -1) return false;
      tasks.splice(index, 1);
      return true;
    }
  };
}

async function startTestServer(t, taskRepository = makeRepository()) {
  const app = createApp({ taskRepository });
  const server = app.listen(0, '127.0.0.1');
  await new Promise((resolve) => server.once('listening', resolve));
  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  }));
  return `http://127.0.0.1:${server.address().port}`;
}

test('API permite crear, consultar, completar, resumir y eliminar tareas', async (t) => {
  const baseUrl = await startTestServer(t);

  const healthResponse = await fetch(`${baseUrl}/api/health`);
  assert.equal(healthResponse.status, 200);

  const createResponse = await fetch(`${baseUrl}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Probar API', description: 'Prueba HTTP' })
  });
  assert.equal(createResponse.status, 201);
  const created = await createResponse.json();
  assert.equal(created.task.title, 'Probar API');

  const listResponse = await fetch(`${baseUrl}/api/tasks`);
  assert.equal(listResponse.status, 200);
  assert.equal((await listResponse.json()).tasks.length, 1);

  const updateResponse = await fetch(`${baseUrl}/api/tasks/${created.task.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: true })
  });
  assert.equal(updateResponse.status, 200);
  assert.equal((await updateResponse.json()).task.completed, true);

  const summaryResponse = await fetch(`${baseUrl}/api/tasks/summary`);
  assert.equal(summaryResponse.status, 200);
  assert.deepEqual((await summaryResponse.json()).summary, {
    total: 1,
    completed: 1,
    pending: 0,
    completionRate: 100
  });

  const deleteResponse = await fetch(`${baseUrl}/api/tasks/${created.task.id}`, {
    method: 'DELETE'
  });
  assert.equal(deleteResponse.status, 200);

  const emptySummaryResponse = await fetch(`${baseUrl}/api/tasks/summary`);
  assert.deepEqual((await emptySummaryResponse.json()).summary, {
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0
  });
});

test('API rechaza tareas sin título y rutas inexistentes', async (t) => {
  const baseUrl = await startTestServer(t);

  const invalidResponse = await fetch(`${baseUrl}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: '   ' })
  });
  assert.equal(invalidResponse.status, 400);

  const missingRouteResponse = await fetch(`${baseUrl}/api/no-existe`);
  assert.equal(missingRouteResponse.status, 404);
});
