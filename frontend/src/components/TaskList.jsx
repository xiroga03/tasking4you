
import { Check, Trash2, ClipboardList } from 'lucide-react';

function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <ClipboardList size={32} />
        </div>
        <h3>No hay tareas por aquí</h3>
        <p>Agrega una nueva actividad para comenzar a organizarte.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <article className={`task-card ${task.done ? 'task-completed' : ''}`} key={task.id}>
          <button
            className={`task-check ${task.done ? 'checked' : ''}`}
            onClick={() => onToggleTask(task.id)}
            aria-label={task.done ? 'Marcar pendiente' : 'Completar tarea'}
          >
            {task.done && <Check size={16} />}
          </button>

          <div className="task-information">
            <h4>{task.title}</h4>
            {task.description && <p>{task.description}</p>}
            <span className={`task-status ${task.done ? 'status-done' : 'status-pending'}`}>
              {task.done ? 'Completada' : 'Pendiente'}
            </span>
          </div>

          <button
            className="delete-task"
            onClick={() => onDeleteTask(task.id)}
            aria-label="Eliminar tarea"
          >
            <Trash2 size={18} />
          </button>
        </article>
      ))}
    </div>
  );
}

export default TaskList;
