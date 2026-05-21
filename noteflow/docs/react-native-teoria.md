# Fundamentos Teóricos de React Native y Expo

## 1. Diferencia entre React Native y una App Nativa Real
*   **App Nativa Real:** Se escribe directamente en el lenguaje oficial de la plataforma (Swift/Objective-C para iOS, Kotlin/Java para Android). El código accede directamente a las APIs del sistema operativo sin intermediarios.
*   **React Native:** Tú escribes el código en JavaScript/TypeScript usando componentes como `<View>` o `<Text>`. Al ejecutarse, la app no abre una página web, sino que se comunica mediante un "puente" con el sistema operativo para renderizar componentes nativos reales de iOS y Android. Ofrece rendimiento nativo pero programando una sola vez para ambas plataformas.

## 2. ¿Qué es el Metro Bundler?
Metro es el empaquetador (bundler) oficial de JavaScript desarrollado por Meta para React Native. 
*   **Su función:** Coge todo tu código fragmentado en decenas de archivos `.ts`, `.tsx`, imágenes y componentes, y lo unifica en un único archivo JavaScript gigante (llamado *bundle*).
*   **En desarrollo:** Se encarga del *Fast Refresh* (Actualización Rápida). Cada vez que guardas un cambio en tu editor, Metro compila solo esa parte y la envía al móvil al instante sin tener que reiniciar la app.

## 3. ¿Por qué Expo Go no es suficiente para proyectos reales?
*   **Expo Go:** Es una app precompilada que ya tiene dentro un conjunto fijo de librerías nativas comunes. Es perfecta para aprender y prototipar rápido escaneando un QR.
*   **El problema:** Si tu proyecto real necesita una funcionalidad nativa personalizada que no viene dentro de Expo Go (como un sistema de pagos específico, biometría avanzada o configurar notificaciones push personalizadas con un servidor externo), Expo Go **no puede ejecutarla** porque no permite añadir código nativo de Java/Kotlin personalizado de terceros.
*   **La solución en producción:** Se usan los *Development Builds*. Con la herramienta EAS Build de Expo, generas tu propio "Expo Go" personalizado: un archivo `.apk` (Android) o `.ipa` (iOS) exclusivo de tu proyecto que sí incluye las librerías nativas exactas que necesitas.