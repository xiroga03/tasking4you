
import { useState } from 'react';
import { Plus } from 'lucide-react';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      description: description.trim()
    });

    setTitle('');
    setDescription('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <h3>Crear nueva tarea</h3>
          <p>Agrega una actividad a tu lista.</p>
        </div>
        <div className="form-icon">
          <Plus size={21} />
        </div>
      </div>

      <div className="form-fields">
        <input
          id="task-title"
          type="text"
          placeholder="¿Qué necesitas hacer?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={120}
        />

        <input
          type="text"
          placeholder="Descripción (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={250}
        />

        <button type="submit" disabled={!title.trim()}>
          <Plus size={17} />
          Agregar tarea
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
