
import {
  LayoutDashboard,
  ListTodo,
  CheckCircle2,
  Clock3,
  CalendarDays,
  Settings,
  Plus
} from 'lucide-react';

function Sidebar({ activeFilter, setActiveFilter, taskCounts }) {
  const menuItems = [
    { id: 'all', label: 'Todas las tareas', icon: ListTodo, count: taskCounts.total },
    { id: 'pending', label: 'Pendientes', icon: Clock3, count: taskCounts.pending },
    { id: 'completed', label: 'Completadas', icon: CheckCircle2, count: taskCounts.completed }
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <LayoutDashboard size={23} />
        </div>
        <span>Tasking<span className="brand-highlight">4You</span></span>
      </div>

      <div className="workspace-label">ESPACIO DE TRABAJO</div>

      <button
        className="sidebar-create"
        onClick={() => document.getElementById('task-title')?.focus()}
      >
        <Plus size={18} />
        Nueva tarea
      </button>

      <div className="menu-label">MENÚ PRINCIPAL</div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={`menu-item ${activeFilter === item.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(item.id)}
            >
              <Icon size={19} />
              <span>{item.label}</span>
              <span className="menu-count">{item.count}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-tip">
          <CalendarDays size={22} />
          <strong>Organiza tu día</strong>
          <p>Pequeños avances hacen grandes resultados.</p>
        </div>

        <button className="menu-item settings-item">
          <Settings size={19} />
          <span>Configuración</span>
        </button>

        <div className="sidebar-user">
          <div className="user-avatar">S</div>
          <div>
            <strong>Mi espacio</strong>
            <span>Personal</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
