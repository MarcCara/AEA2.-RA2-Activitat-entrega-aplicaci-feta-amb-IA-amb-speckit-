# VisionAI - Detecció d'Objectes en Temps Reial On-Device

VisionAI és una aplicació mòbil híbrida desenvolupada amb **Ionic**, **Vue 3** i **Capacitor** que realitza detecció d'objectes en temps reial mitjançant **TensorFlow.js**.

Aquest projecte ha estat desenvolupat seguint la metodologia **Speckit (Spec-Driven Development)**, garantint una separació clara entre l'especificació, la planificació i la implementació.

## Característiques Principals
- **IA On-Device:** Realitza inferències 100% offline utilitzant el model `coco-ssd` emmagatzemat localment.
- **Detecció en Temps Reial:** Bucle de detecció d'alt rendiment optimitzat per a dispositius mòbils.
- **Experiència Nativa:** Desenvolupat amb components d'Ionic per a una interfície d'usuari (UI) i experiència d'usuari (UX) polida.
- **Rendiment Optimitzat:** Utilitza "frame throttling" (1/3 frames) i una resolució de 640x480 per mantenir una taxa d'imatges per segon (FPS) estable.

## Stack Tecnològic
- **Framework:** Vue 3 (Composition API)
- **Components d'UI:** Ionic Framework
- **Pont Natiu:** Capacitor
- **Motor d'IA:** TensorFlow.js (@tensorflow/tfjs)
- **Model:** Coco-SSD Lite (MobileNet V2)

## Estructura del Projecte
- `/vision-ai`: Codi font de l'aplicació principal d'Ionic/Vue.
- `/vision-ai/public/models`: Actius del model localitzats per a l'ús offline.
- `CONSTITUTION.md`: Principis del projecte i regles estrictes de desenvolupament.
- `SPEC.md`: Requisits funcionals detallats.
- `PLAN.md`: Arquitectura tècnica i estratègia d'implementació.
- `tasks.md`: Llista de tasques ordenades utilitzades per a l'execució.
- `PROMPTS.md`: Historial dels prompts d'IA utilitzats durant el procés.
- `CONTENIDO_PDF.md`: Documentació final preparada per a l'entrega acadèmica.

## Instal·lació i Configuració

1. **Instal·lació de dependències:**
   ```bash
   cd vision-ai
   npm install
   ```

2. **Descàrrega dels actius del model:**
   Des del directori arrel, executeu:
   ```bash
   node download-model.js
   ```

3. **Execució en navegador (Desenvolupament):**
   ```bash
   cd vision-ai
   ionic serve
   ```

4. **Compilació per a Android:**
   ```bash
   cd vision-ai
   npm run build
   npx cap sync android
   npx cap open android
   ```

## Llicència
Aquest projecte forma part d'una pràctica acadèmica del cicle de Desenvolupament d'Aplicacions Multiplataforma (DAM).
