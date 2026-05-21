# Configuración de herramientas de IA - NoteFlow

Para el desarrollo de NoteFlow se ha establecido un perfil de configuración en las herramientas de IA (Cursor, ChatGPT, Gemini, Claude) enfocado en la **máxima simplicidad**.

## Configuración Aplicada

1. **Foco en el Aprendizaje (Principiante):** Se ha instruido a las IA para que actúen como mentores pacientes, explicando el código línea por línea y evitando soluciones de nivel "senior" que puedan entorpecer el entendimiento del proyecto.
2. **Uso estricto de JavaScript y Expo:** Para evitar errores de tipado o configuraciones nativas pesadas en las primeras etapas, se prohíbe el uso de TypeScript. Todo se resolverá mediante JavaScript estándar.
3. **Estilos Nativos:** Se utilizará `StyleSheet.create` de React Native para dominar primero las bases del diseño en componentes móviles antes de saltar a frameworks de estilos.

## Mecanismos Utilizados
- **Archivo `.cursorrules`:** Ubicado en la raíz para que el editor de código aplique estas restricciones de manera automática en cada sugerencia o autocompletado.
- **Instrucciones de Sistema (Prompt Persistente):** Al usar interfaces web de IA, se pegará el contenido de `.cursorrules` al inicio de la sesión para mantener el mismo contexto de desarrollo.