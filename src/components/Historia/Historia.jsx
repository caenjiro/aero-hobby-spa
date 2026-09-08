import { useState, useEffect } from 'react';

export default function Historia() {
  const [horaCarga, setHoraCarga] = useState('--:--:--');

  useEffect(() => {
    const ahora = new Date();
    setHoraCarga(ahora.toLocaleTimeString());
  }, []);

  return (
    <section id="historia" className="page">
      <h2>Hitos de la Aviación Mundial</h2>
      <p>
        Desde los primeros planeadores hasta el legendario vuelo de los{' '}
        <strong>Hermanos Wright en 1903</strong> con el <em>Flyer I</em>, la conquista de los cielos ha sido uno de los mayores logros de la ingeniería moderna.
      </p>

      <div className="image-banner-container">
        <img
          src="/Sr71.jpg"
          alt="Lockheed SR-71 Blackbird en vuelo sobre montañas"
          className="banner-img"
        />
        <span className="img-caption">
          Lockheed SR-71 Blackbird: Reconocimiento estratégico y dominio a Mach 3+.
        </span>
      </div>

      <p>
        La evolución avanzó a pasos agigantados durante el siglo XX, pasando de los biplanos de madera y lona de la Primera Guerra Mundial a las fortalezas de aluminio y la era de la propulsión a reacción iniciada a mediados de los años 40.
      </p>

      <div className="status-box">
        <span>🕒 Sesión de vuelo iniciada: <strong id="hora-carga">{horaCarga}</strong></span>
      </div>
    </section>
  );
}