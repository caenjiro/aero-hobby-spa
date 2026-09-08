import fondoInicio from './Images/GripenFAC.jpg';

export default function Inicio({ onNavigate }) {
  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `linear-gradient(rgba(244, 245, 248, 0.51), rgba(0, 3, 9, 0.95)), url(${fondoInicio})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '12px',
        minHeight: '65vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '3rem 2rem',
        border: '1px solid #334155',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
      }}
    >
      <div className="hero-badge">Aeronáutica & Modelismo</div>
      <h2 style={{ color: '#ffffff', fontSize: '2.8rem', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
        AeroHobby CAENJIRO
      </h2>
      <p style={{ color: '#cbd5e1', maxWidth: '600px', fontSize: '1.15rem', marginBottom: '2.5rem', lineHeight: '1.6' }}>
        Plataforma interactiva dedicada a la historia de la aviación militar y el modelismo estático a escala.
      </p>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button 
          className="action-btn" 
          onClick={() => onNavigate('acerca')}
          style={{ padding: '0.8rem 1.8rem', fontSize: '1.1rem' }}
        >
          👤 Acerca de Mí
        </button>
        <button 
          className="action-btn" 
          onClick={() => onNavigate('visitas')}
          style={{ padding: '0.8rem 1.8rem', fontSize: '1.1rem', backgroundColor: '#334155', border: '1px solid #475569' }}
        >
          📝 Registro de Visitas
        </button>
      </div>
    </section>
  );
}