<template>
  <div class="detector-container">
    <video
      ref="videoRef"
      autoplay
      muted
      playsinline
      class="video-feed"
    ></video>
    <canvas
      ref="canvasRef"
      class="overlay-canvas"
    ></canvas>
    
    <div v-if="isLoading" class="loading-overlay">
      <ion-spinner name="crescent"></ion-spinner>
      <p>Loading AI Model...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { IonSpinner } from '@ionic/vue';
import { aiService } from '../services/ai.service';
import { cameraService } from '../services/camera.service';
import { DetectedObject } from '@tensorflow-models/coco-ssd';

const videoRef = ref<HTMLVideoElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const isLoading = ref(true);
let animationId: number | null = null;
let frameCount = 0;

const startDetection = async () => {
  if (!videoRef.value || !canvasRef.value) return;

  isLoading.value = true;
  await aiService.loadModel();
  const success = await cameraService.startCamera(videoRef.value);
  
  if (success) {
    isLoading.value = false;
    // Set canvas dimensions to match video once it's playing
    videoRef.value.onplay = () => {
      if (videoRef.value && canvasRef.value) {
        canvasRef.value.width = videoRef.value.videoWidth;
        canvasRef.value.height = videoRef.value.videoHeight;
        runInferenceLoop();
      }
    };
  }
};

const stopDetection = () => {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  cameraService.stopCamera();
};

const runInferenceLoop = async () => {
  if (!videoRef.value || !canvasRef.value) return;

  // Optimization: Frame Throttling (Evaluate every 3rd frame)
  if (frameCount % 3 === 0) {
    const detections = await aiService.detect(videoRef.value);
    drawResults(detections);
  }

  frameCount++;
  animationId = requestAnimationFrame(runInferenceLoop);
};

const drawResults = (detections: DetectedObject[]) => {
  const ctx = canvasRef.value?.getContext('2d');
  if (!ctx || !canvasRef.value) return;

  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);

  detections.forEach(prediction => {
    const [x, y, width, height] = prediction.bbox;
    
    // Draw green bounding box
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, width, height);

    // Draw label background
    ctx.fillStyle = '#00FF00';
    const text = `${prediction.class} (${Math.round(prediction.score * 100)}%)`;
    ctx.font = '16px Arial';
    const textWidth = ctx.measureText(text).width;
    ctx.fillRect(x, y - 25, textWidth + 10, 25);

    // Draw text
    ctx.fillStyle = '#000000';
    ctx.fillText(text, x + 5, y - 7);
  });
};

onMounted(() => {
  startDetection();
});

onUnmounted(() => {
  stopDetection();
});

// Expose methods for parent components
defineExpose({ stopDetection, startDetection });
</script>

<style scoped>
.detector-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.video-feed {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 10;
}
</style>
