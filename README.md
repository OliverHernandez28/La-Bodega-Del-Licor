# La Bodega Del Licor

Sistema web para gestionar compras de botellas de tequila, donde los usuarios pueden seleccionar productos, agregarlos al carrito y generar su pedido. Actualmente, al finalizar el pedido, el sistema genera un mensaje prellenado para enviar vía WhatsApp al negocio y confirmar la compra.

## Funcionalidades

- **Catálogo:** Explora y selecciona productos.
- **Buscar:** Encuentra productos rápidamente.
- **Carrito:** Visualiza y gestiona tus selecciones.
- **Perfil:** Configura tu información personal.

**Nota:** Actualmente, el envío de mensajes a WhatsApp se realiza manualmente. Se está trabajando en un backend para automatizar este proceso.

## Tecnologías Utilizadas

El proyecto fue desarrollado con:

- Angular CLI v18.1.4
- Node.js (para la instalación de dependencias)
- Bootstrap (para diseño responsivo y estilizado)

## Estructura del Proyecto

El proyecto está organizado en carpetas según su función, para mantener el código limpio y modular:

- **Componentes:** Contiene los componentes reutilizables.
- **Servicios:** Define la lógica de negocio y las conexiones con datos externos.
- **Interfaces:** Contiene las definiciones de tipos y modelos de datos.
- **Assets:** Contiene imágenes, estilos y otros recursos estáticos.

## Requisitos Previos

Asegúrate de tener instalados:

- Node.js (versión 14 o superior).
- Angular CLI (instalar con `npm install -g @angular/cli`).

## Pasos para Iniciar el Proyecto

1. **Clonar el Repositorio**

   Clona este proyecto desde GitHub:

   ```bash
   git clone https://github.com/OliverHernandez28/BodegaDelLicor.git
   ```

2. **Instalar Dependencias**

   Entra en el directorio del proyecto y ejecuta:

   ```bash
   cd BodegaDelLicor
   npm install
   ```

3. **Levantar el Servidor**

   Inicia el servidor de desarrollo con:

   ```bash
   ng serve
   ```

   Luego, abre tu navegador y visita:  
   [http://localhost:4200/](http://localhost:4200/)

## Características Adicionales

- **Responsividad:** Adaptado para dispositivos móviles, tablets y pantallas grandes.

### Futuras Funcionalidades

- Envío automático de mensajes a WhatsApp desde el backend.
- Integración de métodos de pago.
- Dashboard para el administrador del negocio.

## Contribución

¿Quieres contribuir? ¡Eres bienvenido! Sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama para tu funcionalidad:

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

3. Realiza tus cambios y súbelos:

   ```bash
   git commit -m "Añadir nueva funcionalidad"
   git push origin feature/nueva-funcionalidad
   ```

4. Abre un Pull Request en GitHub.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.
