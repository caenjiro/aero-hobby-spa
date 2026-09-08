import { useState } from 'react';

export default function Visitas() {
  const [visitas, setVisitas] = useState([
    { fecha: new Date().toLocaleDateString(), visitante: 'Invitado', ubicacion: 'Bogotá, Colombia' }
  ]);

  const registrarVisita = () => {
    const nuevaVisita = {
      fecha: new Date().toLocaleDateString(),
      visitante: 'Usuario Web',
      ubicacion: 'Conexión Remota'
    };
    setVisitas([nuevaVisita, ...visitas]);
  };

  return (
    <section className="page">
      <h2>Registro de Visitas</h2>
      <p>Control de accesos y firmas en el libro de visitas del hangar.</p>

      <button className="action-btn" onClick={registrarVisita} style={{ marginBottom: '2rem' }}>
        + Firmar Libro de Visitas
      </button>

      <div className="table-responsive">
        <table className="hangar-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Visitante</th>
              <th>Ubicación</th>
            </tr>
          </thead>
          <tbody>
            {visitas.map((v, index) => (
              <tr key={index}>
                <td>{v.fecha}</td>
                <td><strong>{v.visitante}</strong></td>
                <td>{v.ubicacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}