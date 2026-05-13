# Tasks: VisionAI

## Phase 1: Project Setup & Environment
- [x] **Task 1: Initialize Ionic/Vue Project**
  - Action: Run `npx @ionic/cli start vision-ai blank --type vue --capacitor`.
  - Goal: Create the base project structure with Vue 3 and Capacitor.
- [x] **Task 2: Install Core Dependencies**
  - Action: Install `@tensorflow/tfjs`, `@tensorflow-models/coco-ssd`, and `@capacitor/camera`.
  - Goal: Prepare the environment for AI and Native features.

## Phase 2: Offline AI Configuration
- [x] **Task 3: Setup Offline Model Assets**
  - Action: Create `public/models/coco-ssd/` and ensure model files are accessible locally.
  - Goal: Fulfill the 100% offline requirement.
- [x] **Task 4: Implement AI Service**
  - File: `src/services/ai.service.ts`
  - Goal: Create a singleton service to load the model from the local path and expose a `detect` method that handles `tf.tidy()`/`tf.dispose()`.

## Phase 3: Hardware & Detection Loop
- [x] **Task 4: Implement Camera Service**
  - File: `src/services/camera.service.ts`
  - Goal: Manage `navigator.mediaDevices.getUserMedia` and Capacitor permissions for the rear camera.
- [x] **Task 5: Create Detector Component (The Loop)**
  - File: `src/components/DetectorContainer.vue`
  - Goal: Implement the `requestAnimationFrame` loop. Connect Camera stream to `<video>` and run AI detections.

## Phase 4: UI & Visual Feedback
- [x] **Task 6: Implement Canvas Overlay**
  - File: `src/components/DetectionOverlay.vue` (or within DetectorContainer)
  - Goal: Draw green bounding boxes and labels on the `<canvas>` based on detection results. Ensure exact overlap with video.
- [x] **Task 7: Design Main UI**
  - File: `src/views/HomePage.vue`
  - Goal: Create the native-look interface with Ionic components and the Start/Stop control button.

## Phase 5: Build & Native Validation
- [ ] **Task 8: Android Configuration & Build**
  - Action: `npx cap add android`, configure permissions in `AndroidManifest.xml`, and generate the final APK.
  - Goal: Verify the app works 100% offline on a physical device.
