const pool = require('../config/database');

async function findAll() {
  const { rows } = await pool.query(
    `SELECT id, title, description, completed, created_at, updated_at
     FROM tasks
     ORDER BY created_at DESC, id DESC`
  );
  return rows;
}

async function create(task) {
  const { rows } = await pool.query(
    `INSERT INTO tasks (title, description)
     VALUES ($1, $2)
     RETURNING id, title, description, completed, created_at, updated_at`,
    [task.title, task.description]
  );
  return rows[0];
}

async function update(id, changes) {
  const { rows } = await pool.query(
    `UPDATE tasks
     SET completed = $2, updated_at = NOW()
     WHERE id = $1
     RETURNING id, title, description, completed, created_at, updated_at`,
    [id, changes.completed]
  );
  return rows[0] || null;
}

async function remove(id) {
  const { rowCount } = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  return rowCount > 0;
}

module.exports = { findAll, create, update, remove };
