import { useEffect } from 'react';

export default function Modelismo({ visitCount, onVisit }) {
  useEffect(() => {
    onVisit();
  }, []);

  return (
    <section id="modelismo" className="page">
      <h2>Modelismo a Escala y Aviación de Combate</h2>
      <p>
        El modelismo estático a escala permite recrear y estudiar en detalle las líneas aerodinámicas, tomas de aire, alas delta y esquemas tácticos de aeronaves icónicas:
      </p>

      <div className="aircraft-grid">
        {/* F-16 Fighting Falcon */}
        <article className="aircraft-card">
          <div className="card-img-wrapper">
            <img src="/f16.jpeg" alt="Caza polivalente F-16 Fighting Falcon" />
          </div>
          <div className="card-content">
            <h3>F-16 Fighting Falcon</h3>
            <p>
              Caza monomotor ligero de alta maniobrabilidad con cabina de burbuja sin marcos y control de vuelo <em>fly-by-wire</em>.
            </p>
          </div>
        </article>

        {/* JAS 39 Gripen */}
        <article className="aircraft-card">
          <div className="card-img-wrapper">
            <img src="/Grippen.jpg" alt="Caza Saab JAS 39 Gripen con configuración canard-delta" />
          </div>
          <div className="card-content">
            <h3>Saab JAS 39 Gripen</h3>
            <p>
              Diseño sueco multitarea de 4.ª generación con configuración de ala delta y planos delanteros <em>canard</em> para pistas cortas.
            </p>
            <p>
              Será el futuro avión de combate para la fuerza aeroespacial Colombiana. <em>Para el año 2028</em> serán las primeras entregas.
            </p>
          </div>
        </article>
      </div>

      <div className="status-box">
        <span>👁️ Revisiones técnicas a esta sección: <strong id="contador-modelismo">{visitCount}</strong></span>
      </div>
    </section>
  );
}