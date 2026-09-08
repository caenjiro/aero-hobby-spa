export default function Acerca() {
  return (
    <section className="page" style={{ animation: 'fadeIn 0.3s ease-out' }}>
      <h2>Acerca del Creador</h2>
      
      <div style={{ backgroundColor: '#0f172a', padding: '2.5rem', borderRadius: '8px', marginTop: '1.5rem', border: '1px solid #334155' }}>
        <h3 style={{ color: '#38bdf8', fontSize: '1.8rem', marginBottom: '1rem' }}>
          Carlos Enrique Jiménez Romero
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.7' }}>
          <p>
            Nacido en Barranquilla el 5 de septiembre de 1977. Actualmente estudiante de Ingeniería de Sistemas en la Universidad Católica de Colombia.
          </p>
          <p>
            Soy un entusiasta del ensamblaje técnico. Mis principales aficiones se centran en armar sets de Lego y construir aviones a escala, actividades que disfruto y prefiero por encima de los videojuegos o los deportes.
          </p>
          <p>
            Todo el esfuerzo y la dedicación plasmados en mis proyectos personales y académicos están fuertemente inspirados por mi persona favorita: mi esposa.
          </p>
        </div>
      </div>
    </section>
  );
}