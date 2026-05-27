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

La expresión `'items' in note` evalúa en tiempo de ejecución si el objeto posee la propiedad `items`. Al encapsular esto en una función con la firma de retorno `note is ChecklistNote`, le garantizamos de manera estricta al compilador de TypeScript que, si la condición se cumple, el objeto puede ser tratado con total seguridad como una lista de tareas, habilitando el acceso seguro a sus propiedades y métodos específicos en el editor de código.