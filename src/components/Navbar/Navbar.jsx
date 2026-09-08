export default function Navbar({ currentPage, onPageChange }) {
  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'historia', label: 'Historia' },
    { id: 'modelismo', label: 'Modelismo & Cazas' },
    { id: 'curiosidades', label: 'Datos Curiosos' },
    { id: 'registro', label: 'Registro de Modelo' }
  ];

  return (
    <nav className="navbar">
      <div className="brand" onClick={() => onPageChange('inicio')} style={{ cursor: 'pointer' }}>
        <span className="brand-icon">✈</span>
        <h1 className="logo">AeroHobby SPA</h1>
      </div>
      <div className="nav-buttons">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-btn ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onPageChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}