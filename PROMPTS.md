# Informe de Proyecto: VisionAI

## 1. Elección del Modelo y Configuración Offline

### Modelo: Coco-SSD (ssdlite_mobilenet_v2)
Hemos seleccionado el modelo **Coco-SSD** en su versión **Lite** por las siguientes razones:
- **Equilibrio:** Ofrece una excelente relación entre precisión y velocidad en dispositivos móviles.
- **Versatilidad:** Detecta hasta 80 tipos de objetos cotidianos sin necesidad de entrenamiento adicional.
- **Eficiencia:** La versión "Lite" consume menos memoria RAM y ciclos de CPU, evitando que el dispositivo se caliente o la app se cierre.

### Configuración 100% Offline
Para cumplir con el requisito de "On-Device AI" sin conexión a Internet:
1. **Host Local:** Se han descargado manualmente el archivo `model.json` y los 5 archivos de pesos (shards) desde el almacenamiento de TensorFlow.
2. **Carpeta Public:** Los archivos se alojan en `public/models/coco-ssd/`, lo que garantiza que Capacitor los incluya dentro del paquete nativo de la app.
3. **Carga Forzada:** Se configuró el servicio de IA para cargar el modelo mediante una URL local (`/models/coco-ssd/model.json`) y se añadieron los imports de los backends de CPU y WebGL para asegurar la compatibilidad sin dependencias externas.

## 2. Historial de Prompts (Metodología Speckit)

A continuación se detallan los prompts clave utilizados para guiar a la IA en las diferentes fases:

### Fase 1: Constitución y Especificación
- **/speckit.constitution:** "Actúa como un Lead Developer experto... Vue 3 con Ionic y Capacitor... Rendimiento crítico... Regla de oro: 100% offline."
- **/speckit.specify:** "Quiero construir una app de visión artificial en tiempo real... cámara trasera... recuadro verde (bounding box)... botón grande para iniciar/detener."

### Fase 2: Planificación y Tareas
- **/speckit.plan:** "El stack será: Ionic Vue, HTML5 video, TensorFlow.js... Requisito Offline: archivos del modelo en /public... Canvas superpuesto exacto."
- **/speckit.tasks:** "Genera el plan de tareas... Instalar dependencias... Configurar carga local... Bucle de inferencia con tf.dispose()."

### Fase 3: Implementación y Optimización
- **/speckit.implement (Optimización):** "El bucle está bloqueando la interfaz... Reduce resolución a 640x480... Limpia tensores correctamente... Salta de 2 en 2 frames (throttling)."
- **Prompt de Automatización:** "Crea un script de Node.js (download-model.js) que descargue automáticamente el model.json y los archivos de pesos del modelo Coco-SSD oficial."

## 3. Decisiones Arquitectónicas Clave

Para garantizar una experiencia de usuario fluida y nativa, se tomaron las siguientes decisiones:

1. **Throttling de Inferencia:** La cámara corre a 30-60 FPS, pero la IA solo procesa 1 de cada 3 frames. Esto evita que la CPU se sature y permite que la UI responda instantáneamente al usuario.
2. **Sincronización Video-Canvas:** Se utiliza `ResizeObserver` y posicionamiento absoluto para asegurar que los recuadros verdes se dibujen exactamente sobre los objetos detectados, independientemente del tamaño de pantalla del móvil.
3. **Gestión de Tensores con tf.tidy():** Se encapsularon las llamadas de detección para asegurar que TensorFlow libere la memoria de la GPU inmediatamente después de cada predicción, evitando fugas de memoria (memory leaks).
4. **Arquitectura de Servicios:** Se separó la lógica en `AIService` y `CameraService` como singletons, permitiendo que la cámara y el modelo se gestionen de forma independiente del ciclo de vida de los componentes visuales.
5. **Resolución Inteligente:** Fijar la entrada a 640x480 reduce drásticamente los píxeles que la IA debe analizar (comparado con Full HD), sin perder la capacidad de detectar objetos a media distancia.

## 4. Capturas de Pantalla (App en Funcionamiento)

![Inicio 1](Capturas/Inicio1.png)
![Inicio 2](Capturas/Inicio2.png)
![Prueba 1](Capturas/Prueba1.png)
![Prueba 2](Capturas/Prueba2.png)
![Prueba 3](Capturas/Prueba3.png)
