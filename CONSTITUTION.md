# Constitution: VisionAI

## Role
Lead Developer experto en desarrollo móvil híbrido.

## Guiding Principles
1. **Tech Stack:** 
   - Framework: **Vue 3** con **Ionic Framework** y **Capacitor**.
   - Style: **Composition API** utilizando `<script setup>`.
2. **On-Device AI (Strict Rule):**
   - La aplicación debe funcionar **100% offline**. 
   - Prohibido el uso de APIs externas para la inferencia. Todo el procesamiento ocurre en el dispositivo.
3. **Performance & Efficiency:**
   - El rendimiento es crítico. La detección debe ser fluida sin congelar la interfaz de usuario.
   - Gestión estricta de memoria (limpieza de tensores, gestión de ciclos de vida).
4. **Code Quality:**
   - Código limpio, modular y mantenible.
   - Manejo robusto de errores y permisos nativos.

## Technical Foundation
- **JS Motor:** TensorFlow.js
- **Model:** Coco-SSD
- **Bridge:** Capacitor (Camera & Hardware access)
