
import { Search, Bell, Sun } from 'lucide-react';

function Header({ searchTerm, setSearchTerm }) {
  return (
    <header className="header">
      <div className="header-greeting">
        <span>ESPACIO PERSONAL</span>
        <h2>Mi tablero</h2>
      </div>

      <div className="header-actions">
        <div className="search-box">
          <Search size={19} />
          <input
            type="text"
            placeholder="Buscar tareas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button className="header-icon" aria-label="Tema">
          <Sun size={20} />
        </button>

        <button className="header-icon notification-button" aria-label="Notificaciones">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
