# VisionAI - Real-Time On-Device Object Detection

VisionAI is a hybrid mobile application built with **Ionic**, **Vue 3**, and **Capacitor** that performs real-time object detection using **TensorFlow.js**. 

This project was developed following the **Speckit (Spec-Driven Development)** methodology, ensuring a clear separation between specification, planning, and implementation.

## 🚀 Key Features
- **On-Device AI:** Performs inference 100% offline using the `coco-ssd` model.
- **Real-Time Detection:** High-performance detection loop optimized for mobile devices.
- **Native Experience:** Built with Ionic components for a polished mobile UI/UX.
- **Performance Optimized:** Uses frame throttling (1/3 frames) and 640x480 resolution to maintain high FPS.

## 🛠️ Tech Stack
- **Framework:** Vue 3 (Composition API)
- **UI Components:** Ionic Framework
- **Native Bridge:** Capacitor
- **AI Engine:** TensorFlow.js (@tensorflow/tfjs)
- **Model:** Coco-SSD Lite (MobileNet V2)

## 📁 Project Structure
- `/vision-ai`: The main Ionic/Vue application code.
- `/vision-ai/public/models`: Localized model assets for offline use.
- `/docs`: (Optional) Folder for additional documentation.
- `CONSTITUTION.md`: Project principles and strict rules.
- `SPEC.md`: Functional requirements.
- `PLAN.md`: Technical architecture and strategy.
- `tasks.md`: Ordered task list used for implementation.
- `PROMPTS.md`: History of AI prompts used.

## ⚙️ Setup & Installation

1. **Install Dependencies:**
   ```bash
   cd vision-ai
   npm install
   ```

2. **Download Model Assets:**
   From the root directory, run:
   ```bash
   node download-model.js
   ```

3. **Run in Browser:**
   ```bash
   cd vision-ai
   ionic serve
   ```

4. **Build for Android:**
   ```bash
   cd vision-ai
   npm run build
   npx cap sync android
   npx cap open android
   ```

## 📄 License
This project is part of a DAM (Development of Multiplatform Applications) academic practice.
