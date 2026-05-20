# Configuración del Asistente de IA

## Herramientas Utilizadas
*   **Cursor / Claude / Gemini:** Utilizados como copilotos de desarrollo para la generación de código, refactorización y resolución de bugs.

## Decisiones de Configuración y Justificación

### 1. Restricción Estricta de Tipado (TypeScript)
*   **Regla:** Prohibido el uso de `any`. Definición obligatoria de `types` o `interfaces`.
*   **Por qué:** En entornos móviles, las mutaciones de datos inesperadas provocan cierres inesperados (crashes) de la aplicación. Forzar a la IA a tipar cada propiedad asegura que las notas y etiquetas mantengan una estructura predecible en el almacenamiento local.

### 2. Separación de Lógica y UI (Custom Hooks)
*   **Regla:** La IA debe extraer la lógica de estado a hooks personalizados.
*   **Por qué:** Evita que las pantallas (`Screens`) se conviertan en archivos gigantescos difíciles de mantener. Facilita la futura migración de almacenamiento (por ejemplo, si pasamos de almacenamiento local a una API en la nube) modificando solo el hook, sin tocar la interfaz de usuario.

### 3. Buenas Prácticas Nativas (`SafeAreaView` y `FlatList`)
*   **Regla:** Obligatoriedad de usar layouts seguros y componentes de lista eficientes.
*   **Por qué:** React Native se renderiza sobre interfaces nativas. Ignorar el `SafeAreaView` causaría que la UI de NoteFlow se solapara con la cámara frontal o la barra de inicio en dispositivos iOS/Android modernos. El uso de `FlatList` garantiza la reutilización de celdas en memoria al hacer scroll en el flujo de notas.