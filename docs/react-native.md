## 5. Arquitectura de Navegación en NoteFlow

En las aplicaciones móviles modernas coexisten diferentes patrones de navegación. En NoteFlow combinamos tres enfoques para ofrecer la mejor experiencia de usuario:

### 1. Navegación por Pestañas (Tabs)
* **Qué es:** Una barra fija (normalmente inferior) que permite alternar entre vistas de manera instantánea manteniendo el estado de cada una.
* **Por qué se usa aquí:** Representa el menú principal de la app. El usuario necesita cambiar rápidamente entre sus Notas, Tareas e Ideas con un solo toque, sin perder el contexto de lo que estaba haciendo en la pestaña anterior.

### 2. Navegación por Pila (Stack)
* **Qué es:** Un sistema basado en una pila (LIFO - Last In, First Out) donde las pantallas se apilan una encima de otra. Al pulsar "atrás", la pantalla superior se destruye (*pop*) para revelar la anterior.
* **Por qué se usa aquí:** Se implementa para el detalle de las notas (`notas/[id].tsx`). Cuando el usuario hace clic en una nota concreta de la lista, la pantalla de detalle se apila encima. Esto permite una lectura enfocada y mantiene el botón nativo de "Volver" hacia la lista principal.

### 3. Modales
* **Qué es:** Una pantalla que emerge desde la parte inferior, cubriendo parcial o totalmente la interfaz actual para realizar una acción muy concreta. Rompe el flujo normal de navegación.
* **Por qué se usa aquí:** Diseñado para la creación de nuevo contenido (`app/nueva-nota.tsx`). Es una acción transaccional: el usuario pulsa un botón, escribe la nota rápidamente y, al guardar o cancelar, el modal se desliza hacia abajo devolviendo al usuario exactamente al punto donde estaba.

## 6. Modelado de Datos y Seguridad en Tiempo de Ejecución con TypeScript

### Arquitectura de Datos: Herencia de Interfaces
Para el diseño del modelo de datos de NoteFlow se ha optado por un enfoque escalable basado en la abstracción. Se define la interfaz común `BaseNote` que encapsula los metadatos obligatorios de cualquier registro (`id`, `title`, `createdAt`, `updatedAt`). Las estructuras específicas (`Note`, `ChecklistNote`, `IdeaNote`) heredan de esta interfaz base mediante la palabra clave `extends`, añadiendo únicamente sus propiedades particulares. Esto evita la redundancia de código y asegura la consistencia de los datos en toda la aplicación.

### El Tipo de Unión `AnyNote` y el Problema de la Evaluación en Ejecución
El tipo de unión `type AnyNote = Note | ChecklistNote | IdeaNote` permite tratar de forma polimórfica cualquier nota dentro de la lógica del negocio (por ejemplo, en servicios de persistencia, filtros o arrays globales).

Sin embargo, dado que TypeScript se transpila a JavaScript puro y pierde la información de tipos en tiempo de ejecución, el motor de ejecución de la aplicación no puede saber directamente qué tipo de nota está procesando en un bucle o renderizado dinámico.

### Solución: Type Guards (Guardas de Tipo)
Para solventar esta limitación y evitar errores de acceso a propiedades inexistentes, se implementan los **Type Guards** utilizando el operador de JavaScript `in`. 

La expresión `'items' in note` evalúa en tiempo de ejecución si el objeto posee la propiedad `items`. Al encapsular esto en una función con la firma de retorno `note is ChecklistNote`, le garantizamos de manera estricta al compilador de TypeScript que, si la condición se cumple, el objeto puede ser tratado con total seguridad como una lista de tareas, habilitando el acceso seguro a sus propiedades y métodos específicos en el editor de código.ç




## 8. Gestión de Estado: Análisis Comparativo

El manejo del estado en aplicaciones móviles es uno de los pilares críticos de la arquitectura de software. Para la persistencia y reactividad en memoria de NoteFlow, se ha seleccionado **Zustand**. A continuación, se presenta un análisis comparativo frente a otras soluciones comunes en el ecosistema de React:

### Tabla Comparativa

| Criterio | `useState` / `useReducer` | Context API | Zustand |
| :--- | :--- | :--- | :--- |
| **Ámbito** | Local (Componente y sus hijos directos). | Global (Cualquier componente bajo el Provider). | Global (Cualquier componente de la app). |
| **Complejidad / Boilerplate** | Muy bajo. No requiere configuración inicial. | Medio. Requiere crear el contexto, hook y envolver la app. | Muy bajo. Configuración atómica en un único archivo. |
| **Rendimiento (Re-renders)** | Excelente localmente, pésimo si se propaga mediante *prop-drilling*. | Deficiente por defecto. Cualquier cambio en el contexto refresca a todos los consumidores. | Óptimo. Basado en selectores; solo se re-renderiza el componente suscrito al dato exacto. |
| **Dependencia de la UI** | Totalmente ligado al ciclo de vida del componente. | Acoplado al árbol de componentes mediante JSX (*Providers*). | Desacoplado. Se puede leer/escribir estado incluso fuera de React. |

---

### Justificación de la Arquitectura Seleccionada

#### 1. Limitaciones de `useState` (Estado Local)
El estado local es ideal para componentes aislados (por ejemplo, controlar si un modal está abierto o cerrado). Sin embargo, en NoteFlow el formulario de creación (`app/nueva-nota.tsx`) necesita insertar datos que deben verse reflejados inmediatamente en las listas de las pestañas (`app/(tabs)/notas/index.tsx`). Usar `useState` obligaría a elevar el estado (*lifting state up*) a través de múltiples niveles de componentes mediante props (*prop-drilling*), lo que degrada la legibilidad y mantenibilidad del código.

#### 2. El problema del Rendimiento en Context API
Context API es una herramienta excelente para datos que cambian muy rara vez (como el tema de color o el idioma de la app). No obstante, para un sistema de notas donde el usuario añade, elimina o marca tareas continuamente, Context API presenta un problema grave de rendimiento: al actualizar una sola propiedad del contexto, **todos** los componentes que consumen ese contexto se ven obligados a re-renderizarse, afectando a la fluidez de las animaciones de la interfaz móvil.

#### 3. La Solución: Zustand y su Modelo Basado en Pub/Sub
Zustand opera de forma externa al árbol de componentes de React mediante un patrón de Publicación/Suscripción (*Pub/Sub*). Presenta tres ventajas competitivas cruciales para NoteFlow:
* **Suscripción Selectiva (Selectors):** Al consumir el store mediante `const notes = useNotesStore(state => state.notes)`, el componente *únicamente* se volverá a renderizar si el array de notas se modifica. Los cambios en el array de `ideas` o `checklists` no le afectarán en absoluto.
* **Código Declarativo y Limpio:** Evita la anidación masiva de etiquetas contenedoras (*Wrappers / Providers*) en el archivo raíz `app/_layout.tsx`, simplificando la arquitectura general.
* **Mutación Inmutable Simplificada:** Permite centralizar la lógica de negocio compleja —como el mapeo profundo bidimensional requerido para alternar el estado de un ítem dentro de un checklist (`toggleChecklistItem`)— liberando a los componentes de la interfaz de carga algorítmica.




## 9. Optimización del Rendimiento en Interfaces de Scroll Largo: FlashList

El renderizado de colecciones masivas de datos en dispositivos móviles presenta cuellos de botella críticos relacionados con la gestión de memoria RAM y los ciclos de cálculo de la CPU en el hilo de la UI. En NoteFlow, se ha descartado el uso de `FlatList` en favor de **`FlashList` de Shopify**.

### El Problema Crítico de `FlatList`
`FlatList` funciona montando y desmontando componentes React a medida que se realiza el scroll. Cuando un elemento sale de la pantalla superior, se destruye su instancia y, al aparecer un nuevo elemento por la parte inferior, se crea una instancia completamente nueva desde cero. 
Este flujo genera dos problemas:
1. **Picos de Recolección de Basura (Garbage Collection):** La creación y destrucción constante de objetos satura el recolector de basura de JavaScript, provocando micro-tirones (*dropped frames*).
2. **Blank Spaces (Pantallas Blancas):** En desplazamientos rápidos, la velocidad del scroll supera la velocidad del hilo de JavaScript para instanciar componentes nuevos, mostrando huecos en blanco al usuario.

### El Paradigma del Reciclaje de Celdas (`FlashList`)
`FlashList` soluciona este comportamiento replicando de manera exacta los mecanismos nativos avanzados (`RecyclerView` en Android y `UICollectionView` en iOS).

## 9. Rendimiento en Listas: Arquitectura de Reciclaje de Componentes

El renderizado de colecciones masivas de datos en interfaces de scroll móvil representa uno de los desafíos más críticos en cuanto a consumo de CPU y tasas de refresco (FPS). En NoteFlow se ha sustituido la solución estándar de React Native (`FlatList`) por **`FlashList` de Shopify**.

### Análisis de Limitaciones en `FlatList`
`FlatList` gestiona el scroll montando y desmontando nodos del árbol virtual a medida que aparecen en la pantalla (*viewport*). Cuando una tarjeta sale por el margen superior, el recolector de basura de JavaScript (*Garbage Collector*) destruye el objeto. Al entrar una nueva por el margen inferior, el hilo de JavaScript debe volver a instanciar la estructura visual desde cero. 
Este flujo provoca dos penalizaciones graves de rendimiento:
* **Picos en el Garbage Collector:** La constante creación y destrucción de objetos satura la memoria RAM, provocando caídas de frames (*dropped frames*) o tirones visuales.
* **Pantallas en Blanco (Blank Tiles):** Ante un scroll rápido, el puente de comunicación nativo no es capaz de procesar las celdas a la misma velocidad del desplazamiento, dejando zonas sin renderizar.

### El Paradigma de Reciclaje en `FlashList`
`FlashList` soluciona de raíz esta limitación emulando el comportamiento exacto de los frameworks móviles nativos puros (como `RecyclerView` en Android y `UICollectionView` en iOS).

En lugar de destruir los componentes que salen del margen visible de la pantalla, `FlashList` los almacena en un búfer de reciclaje interno conservando intacta su estructura de diseño y contenedores visuales. Cuando el usuario avanza en el scroll y se requiere pintar un nuevo elemento por la parte inferior, la librería **reutiliza la estructura física de una celda del búfer** y simplemente **reinyecta los datos y propiedades (*props*) del nuevo modelo** a renderizar. Esto elimina por completo el coste computacional de instanciación en el hilo de UI.

### Impacto y Rol de la Propiedad `estimatedItemSize`
La propiedad `estimatedItemSize` es el parámetro matemático fundamental de optimización en `FlashList`. Dado que la lista calcula asíncronamente las dimensiones antes del pintado global, necesita conocer un tamaño aproximado en píxeles del elemento:
* **Definición Errónea o Ausente:** Obliga a la lista a recalcular las alturas dinámicamente sobre la marcha al hacer scroll, lo que genera saltos visuales incómodos en la barra de desplazamiento.
* **Asignación de Precisión:** Al calibrar el tamaño exacto de cada tarjeta según su complejidad de diseño (Notas: `110px`, Tareas: `95px`, Ideas: `85px`), el motor pre-calcula el área de renderizado óptima de forma matemática, asegurando scrolls estables a 60 FPS constantes.