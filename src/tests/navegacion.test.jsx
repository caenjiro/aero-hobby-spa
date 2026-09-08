import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Navegacion', () => {
  it('debe cambiar de pagina al hacer clic en un boton del navbar', () => {
    // 1. ARRANGE: Renderizar la app completa
    render(<App />);

    // 2. ACT: Hacer clic en "Acerca de Mí" (tu botón real)
    fireEvent.click(screen.getByText('👤 Acerca de Mí'));

    // 3. ASSERT: Verificar que el contenido cambió a tu perfil
    expect(screen.getByText('Acerca del Creador')).toBeInTheDocument();
  });
});