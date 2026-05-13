# Technical Plan: VisionAI

## 1. Project Initialization & Architecture
- Initialize Ionic Vue project with blank template.
- Structure:
  - `src/services/ai.service.ts`: Model loading and detection logic.
  - `src/services/camera.service.ts`: Media stream management.
  - `src/components/DetectionOverlay.vue`: The UI component with `<video>` and `<canvas>`.

## 2. Dependency Management
- Core: `@ionic/vue`, `@ionic/vue-router`, `vue`.
- AI: `@tensorflow/tfjs`, `@tensorflow-models/coco-ssd`.
- Native: `@capacitor/camera`, `@capacitor/core`, `@capacitor/android`.

## 3. Offline AI Setup (Crucial)
- **Model Hosting:** Manually download `coco-ssd` model files (`model.json` and weights) and place them in `public/models/coco-ssd/`.
- **Loading Logic:** Configure the AI service to load the model from the local URL (`/models/coco-ssd/model.json`) instead of the default Google Cloud storage.

## 4. Camera & Inference Loop
- **Camera Access:** Use `navigator.mediaDevices.getUserMedia` with `facingMode: 'environment'`.
- **Synchronization:**
  - Render `<video>` and `<canvas>` with absolute positioning to overlap perfectly.
  - Use a `ResizeObserver` to ensure the canvas always matches the video dimensions.
- **Inference Loop:** 
  - Implementation of `requestAnimationFrame`.
  - Inside each frame: `model.detect(videoElement)`.
  - Clear canvas and draw `rect` (green) and `text` for each result.
  - Use `tf.tidy()` to prevent GPU memory leaks.

## 5. UI/UX Implementation
- **Ionic Components:** Use `IonPage`, `IonContent`, `IonHeader`, `IonToolbar`, `IonTitle`, `IonFab`, `IonFabButton`.
- **State Management:** Reactive variables for `isModelLoading`, `isDetecting`, and `fpsCount`.
- **Native Polish:** Configure status bar and splash screen for a native feel.

## 6. Build & Android Configuration
- `npx cap add android`.
- Add `Camera` permissions to `AndroidManifest.xml`.
- Final build: `npm run build && npx cap copy && npx cap open android`.
