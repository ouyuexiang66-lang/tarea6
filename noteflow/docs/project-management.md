# Gestión del Proyecto - NoteFlow

Para el desarrollo de NoteFlow se utiliza una metodología ágil adaptada, gestionando el ciclo de vida del software mediante un tablero **Trello Kanban**.

## Estructura del Tablero
El flujo de trabajo se divide en 5 columnas bien definidas:
1.  **Backlog:** Ideas, requerimientos futuros y funcionalidades opcionales pendientes de priorizar.
2.  **Todo (Por hacer):** Tareas técnicas y funcionalidades del MVP planificadas para el sprint/desarrollo inmediato.
3.  **In Progress (En curso):** Tareas que se están codificando o diseñando activamente en este momento (máximo 2 en paralelo para evitar la dispersión).
4.  **Review (Revisión):** Código finalizado que requiere pruebas en simuladores/dispositivos reales o revisión de refactorización.
5.  **Done (Hecho):** Funcionalidades completamente terminadas, probadas y funcionales.

## Desglose Técnico de Tarjetas (MVP)

### Tarjeta 1: Configuración Inicial del Entorno
*   [ ] Inicializar proyecto React Native con TypeScript.
*   [ ] Configurar Linters y formateadores (`ESLint`, `Prettier`).
*   [ ] Crear estructura de carpetas (`src/components`, `src/screens`, `src/context`, etc.).

### Tarjeta 2: Arquitectura de Persistencia Local
*   [ ] Investigar y seleccionar librería de almacenamiento (ej. `MMKV` o `AsyncStorage`).
*   [ ] Crear el contexto de React (`NotesContext`) y hooks personalizados para gestionar el estado global de las notas.
*   [ ] Implementar funciones CRUD básicas (Crear, Leer, Actualizar, Eliminar).

### Tarjeta 3: UI - Pantalla de Inicio y Captura Rápida
*   [ ] Diseñar la interfaz limpia del Feed de Notas con Tailwind CSS (`NativeWind`).
*   [ ] Crear componente de entrada de texto optimizado para foco rápido.
*   [ ] Implementar el renderizado de listas optimizado (`FlatList`) para las notas.

### Tarjeta 4: UI - Sistema de Filtros y Etiquetas
*   [ ] Diseñar el componente visual de selección de etiquetas.
*   [ ] Implementar la lógica de filtrado reactivo en la lista principal.