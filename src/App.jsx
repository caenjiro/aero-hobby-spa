import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Historia from './components/Historia/Historia';
import Modelismo from './components/Modelismo/Modelismo';
import Curiosidades from './components/Curiosidades/Curiosidades';
import Formulario from './components/Formulario/Formulario';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('historia');
  const [modelismoVisits, setModelismoVisits] = useState(0);

  const handleModelismoVisit = () => {
    setModelismoVisits((prev) => prev + 1);
  };

  return (
    <div className="app-container">
      <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />

      <main className="content">
        {currentPage === 'historia' && <Historia />}
        {currentPage === 'modelismo' && (
          <Modelismo
            visitCount={modelismoVisits}
            onVisit={handleModelismoVisit}
          />
        )}
        {currentPage === 'curiosidades' && <Curiosidades />}
        {currentPage === 'registro' && <Formulario />}
      </main>
    </div>
  );
}