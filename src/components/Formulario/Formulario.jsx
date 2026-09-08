import { useState } from 'react';

export default function Formulario() {
  const [formData, setFormData] = useState({
    nombreModelo: '',
    fabricante: '',
    escala: '1:72',
    pais: '',
    estado: 'Armado'
  });

  const [registros, setRegistros] = useState([
    { nombreModelo: 'F-16C Fighting Falcon', fabricante: 'Tamiya', escala: '1:48', pais: 'Estados Unidos', estado: 'Completado' }
  ]);

  const [mensajeExito, setMensajeExito] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombreModelo.trim() || !formData.fabricante.trim()) return;

    setRegistros([formData, ...registros]);
    setFormData({
      nombreModelo: '',
      fabricante: '',
      escala: '1:72',
      pais: '',
      estado: 'Armado'
    });

    setMensajeExito(true);
    setTimeout(() => setMensajeExito(false), 3000);
  };

  return (
    <section id="formulario-captura" className="page">
      <h2>Registro de Modelos a Escala</h2>
      <p>
        Registra aeronaves ensambladas o kits en proceso para tu inventario personal:
      </p>

      <form className="capture-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombreModelo">Aeronave / Modelo *</label>
          <input
            type="text"
            id="nombreModelo"
            name="nombreModelo"
            placeholder="Ej. Saab JAS 39 Gripen"
            value={formData.nombreModelo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fabricante">Marca del Kit *</label>
            <input
              type="text"
              id="fabricante"
              name="fabricante"
              placeholder="Ej. Italeri, Revell, Tamiya"
              value={formData.fabricante}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="escala">Escala</label>
            <select
              id="escala"
              name="escala"
              value={formData.escala}
              onChange={handleChange}
            >
              <option value="1:144">1:144 (Miniatura)</option>
              <option value="1:72">1:72 (Estándar)</option>
              <option value="1:48">1:48 (Detallado)</option>
              <option value="1:32">1:32 (Gran escala)</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="pais">País Operador</label>
            <input
              type="text"
              id="pais"
              name="pais"
              placeholder="Ej. Colombia, Suecia, EE.UU."
              value={formData.pais}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="estado">Estado del Ensamble</label>
            <select
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
            >
              <option value="En caja">En caja</option>
              <option value="En proceso">En proceso / Pintura</option>
              <option value="Completado">Completado</option>
            </select>
          </div>
        </div>

        <button type="submit" className="action-btn">
          Registrar Aeronave
        </button>

        {mensajeExito && (
          <div className="status-box form-success">
            <span>✅ Modelo registrado satisfactoriamente en el hangar digital.</span>
          </div>
        )}
      </form>

      {/* Tabla simple de capturas */}
      <h3 className="subheading">Hangar Registrado</h3>
      <div className="table-responsive">
        <table className="hangar-table">
          <thead>
            <tr>
              <th>Modelo</th>
              <th>Marca</th>
              <th>Escala</th>
              <th>Operador</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((item, idx) => (
              <tr key={idx}>
                <td><strong>{item.nombreModelo}</strong></td>
                <td>{item.fabricante}</td>
                <td>{item.escala}</td>
                <td>{item.pais || 'N/A'}</td>
                <td><span className="badge">{item.estado}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}