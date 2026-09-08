# AeroHobby CAENJIRO - SPA React 🛩️🛠️

Plataforma web interactiva Single Page Application (SPA) dedicada a la historia de la aviación militar, el armado de modelos a escala estáticos y el registro técnico de aeronaves en hangar.

## 🚀 Funcionalidades y Módulos

*   **Inicio (Hero Section):** Portada inmersiva con fondo temático (Gripen de la FAC) y degradado oscuro para maximizar la legibilidad, enfocada en la navegación principal.
*   **Historia, Modelismo y Curiosidades:** Secciones dedicadas a fichas técnicas, hitos de la aviación militar y datos de radar.
*   **Registro de Modelos:** Formulario interactivo validado para el inventario de kits ensamblados, incluyendo marca, escala y estado.
*   **Registro de Visitas:** Tabla de control para registrar el ingreso de invitados al hangar virtual.
*   **Acerca del Creador:** Perfil de autor.

## 🛠️ Stack Tecnológico

*   **Core:** React, Vite
*   **Estilos:** CSS3 puro con diseño responsive
*   **Testing:** Vitest (v1.6.0), React Testing Library, JSDOM (v22.1.0)
*   **CI/CD:** GitHub Actions
*   **Despliegue:** GitHub Pages

## ⚙️ Entorno de Pruebas Automatizadas

El proyecto incluye una suite de pruebas para garantizar la estabilidad de los componentes y la navegación:

*   **Manejo de Assets:** Configuración de alias en `vite.config.js` y uso de `fileMock.js` para interceptar correctamente las imágenes estáticas durante los tests y evitar caídas del motor.
*   **Pruebas Implementadas:**
    *   `navegacion.test.jsx`: Verifica el enrutamiento y cambio de vistas desde los botones principales.
    *   `responsive.test.jsx`: Asegura la existencia de etiquetas semánticas (`nav`, `main`, `section`) para el CSS.
    *   `formulario.test.jsx`: Valida que los campos requeridos en el registro de maquetas estén presentes y activos.

## 🔄 Pipeline CI/CD

El proyecto cuenta con un flujo de trabajo continuo configurado en `.github/workflows/ci-cd.yml`. Cada vez que se integra código a la rama `main`, GitHub Actions ejecuta los siguientes pasos en un entorno Node.js 20:

1.  **Checkout e Instalación:** Preparación del entorno y descarga de dependencias.
2.  **Testing (`npm run test:run`):** Ejecución estricta de las pruebas unitarias.
3.  **Build (`npm run build`):** Generación de los archivos optimizados para producción.
4.  **Deploy:** Publicación automática en GitHub Pages si todas las fases anteriores son exitosas.

---
**Desarrollado por:** Carlos Enrique Jiménez Romero  
*Estudiante de Ingeniería de Sistemas - Universidad Católica de Colombia*
