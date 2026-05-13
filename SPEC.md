# Specification: VisionAI - Real-Time Object Detection

## 1. Functional Overview
The application is a real-time computer vision tool that identifies everyday objects through the device's rear camera. It provides immediate visual feedback by highlighting detected objects with bounding boxes and labels.

## 2. User Journey
1. **Entry:** User opens the app and sees a clean interface with a "Start Detection" button.
2. **Camera Access:** Upon clicking "Start", the app requests camera permissions (via Capacitor) and opens the rear camera.
3. **Detection Loop:** The app starts the inference engine. The video stream is processed frame-by-frame.
4. **Visual Feedback:** 
   - A green bounding box (2px width) appears around detected objects.
   - A label above the box shows the object name (e.g., "Person") and confidence (e.g., "92%").
5. **Control:** User can stop the detection at any time, which freezes/closes the camera and clears the overlay.

## 3. Technical Requirements
- **Camera:** Access to `environment` (rear) camera using HTML5 MediaDevices with Capacitor permission handling.
- **Inference Engine:** TensorFlow.js with the `coco-ssd` model.
- **Drawing:** High-performance Canvas overlay synchronized with the `<video>` element.
- **Performance Goal:** Minimal latency between object movement and box update.
- **Offline Capability:** All models and assets must be bundled or cached for 100% offline use.

## 4. User Interface (UI) Design
- **Header:** Simple Ionic toolbar with the app title "VisionAI".
- **Main View:** Full-width/height camera preview container.
- **Overlay:** Transparent Canvas layer for bounding boxes.
- **Footer/Controls:**
  - A large, floating action button (FAB) or centered button at the bottom to "Start/Stop Detection".
  - Status indicator (e.g., "Model Loading...", "Ready").

## 5. Scope of Detection
The app will detect classes supported by the Coco-SSD model, including but not limited to:
- People, Cars, Bicycles.
- Household items: Chairs, Tables, Bottles, Cups, Mobile phones.
- Animals: Dogs, Cats.
