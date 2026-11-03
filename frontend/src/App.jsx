
import { useState } from 'react';
import { CheckCircle2, Clock3, ListTodo, Sparkles } from 'lucide-react';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      done: false
    };

    setTasks((previousTasks) => [newTask, ...previousTasks]);
  };

  const toggleTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.done).length;
  const pendingTasks = totalTasks - completedTasks;

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'pending' && !task.done) ||
      (activeFilter === 'completed' && task.done);

    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const taskCounts = {
    total: totalTasks,
    pending: pendingTasks,
    completed: completedTasks
  };

  const today = new Intl.DateTimeFormat('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(new Date());

  return (
    <div className="app-layout">
      <Sidebar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        taskCounts={taskCounts}
      />

      <main className="main-content">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="dashboard-content">
          <section className="welcome-section">
            <div>
              <span className="date-label">{today}</span>
              <h1>¡Hola! Bienvenido a tu espacio.</h1>
              <p>Organiza tus actividades y haz que cada día cuente.</p>
            </div>
            <div className="welcome-decoration">
              <Sparkles size={38} />
            </div>
          </section>

          <section className="stats-grid">
            <article className="stat-card">
              <div className="stat-icon purple">
                <ListTodo size={22} />
              </div>
              <span className="stat-label">Total de tareas</span>
              <strong>{totalTasks}</strong>
              <span className="stat-description">Actividades registradas</span>
            </article>

            <article className="stat-card">
              <div className="stat-icon orange">
                <Clock3 size={22} />
              </div>
              <span className="stat-label">Pendientes</span>
              <strong>{pendingTasks}</strong>
              <span className="stat-description">Por realizar</span>
            </article>

            <article className="stat-card">
              <div className="stat-icon green">
                <CheckCircle2 size={22} />
              </div>
              <span className="stat-label">Completadas</span>
              <strong>{completedTasks}</strong>
              <span className="stat-description">Objetivos alcanzados</span>
            </article>
          </section>

          <section className="workspace">
            <div className="workspace-main">
              <div className="section-heading">
                <div>
                  <h2>Mis actividades</h2>
                  <p>Administra y revisa tus tareas.</p>
                </div>
                <span className="task-total">{filteredTasks.length} tareas</span>
              </div>

              <TaskList
                tasks={filteredTasks}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
              />
            </div>

            <div className="workspace-form">
              <TaskForm onAddTask={addTask} />
            </div>
          </section>

          <footer className="dashboard-footer">
            <span>Tasking4You © 2026</span>
            <span>Organiza tu tiempo, alcanza tus metas.</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
