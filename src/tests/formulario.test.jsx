import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Formulario from '../components/Formulario/Formulario';

describe('Formulario de Modelos', () => {
  it('debe contener los campos obligatorios para registrar una aeronave', () => {
    // 1. ARRANGE: Renderizar tu formulario real
    render(<Formulario />);

    // 2. ASSERT: Verificar que los campos requeridos existen
    const inputNombre = screen.getByLabelText(/Aeronave \/ Modelo \*/i);
    const inputMarca = screen.getByLabelText(/Marca del Kit \*/i);
    
    expect(inputNombre).toBeInTheDocument();
    expect(inputNombre).toBeRequired();
    expect(inputMarca).toBeInTheDocument();
    expect(inputMarca).toBeRequired();
  });
});