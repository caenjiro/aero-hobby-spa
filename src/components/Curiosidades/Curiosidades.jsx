import { useState } from 'react';

const CURIOSIDADES = [
  'El SR-71 Blackbird se expandía varios centímetros durante el vuelo a velocidad Mach 3 debido a la fricción térmica.',
  'El F-16 fue el primer caza de producción diseñado intencionalmente para ser aerodinámicamente inestable y mejorar su maniobrabilidad.',
  'El Saab Gripen está optimizado para despegar y aterrizar en tramos de carreteras públicas convencionales suecas de solo 800 metros.',
  'Las llantas de los aviones comerciales se llenan con nitrógeno seco para prevenir explosiones a temperaturas extremas.',
  'El fuselaje del SR-71 utilizaba titanio adquirido discretamente a la Unión Soviética a través de empresas fantasma.'
];

export default function Curiosidades() {
  const [fact, setFact] = useState('Haz clic en el botón para solicitar un nuevo reporte de radar.');

  const handleNextFact = () => {
    const randomIndex = Math.floor(Math.random() * CURIOSIDADES.length);
    setFact(CURIOSIDADES[randomIndex]);
  };

  return (
    <section id="curiosidades" className="page">
      <h2>Torre de Control: Datos Rápidos</h2>
      <p>
        Descubre datos técnicos e históricos sobre la ingeniería aeronáutica generados al instante sin recargar la página:
      </p>

      <div className="card-fact">
        <p id="fact-text">{fact}</p>
      </div>

      <button id="btn-next-fact" className="action-btn" onClick={handleNextFact}>
        Obtener dato interesante de aviones
      </button>
    </section>
  );
}