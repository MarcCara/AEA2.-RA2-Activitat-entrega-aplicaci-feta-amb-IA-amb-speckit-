<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>VisionAI</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="main-container">
        <DetectorContainer ref="detectorRef" />
        
        <div class="controls-overlay">
          <ion-fab vertical="bottom" horizontal="center" slot="fixed">
            <ion-fab-button 
              :color="isDetecting ? 'danger' : 'success'"
              @click="toggleDetection"
            >
              <ion-icon :icon="isDetecting ? stopIcon : playIcon"></ion-icon>
            </ion-fab-button>
          </ion-fab>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonFab, 
  IonFabButton, 
  IonIcon 
} from '@ionic/vue';
import { play as playIcon, stop as stopIcon } from 'ionicons/icons';
import DetectorContainer from '../components/DetectorContainer.vue';

const detectorRef = ref<any>(null);
const isDetecting = ref(true);

const toggleDetection = () => {
  if (isDetecting.value) {
    detectorRef.value?.stopDetection();
  } else {
    detectorRef.value?.startDetection();
  }
  isDetecting.value = !isDetecting.value;
};
</script>

<style scoped>
.main-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.controls-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 150px;
  pointer-events: none;
  background: linear-gradient(transparent, rgba(0,0,0,0.5));
}

ion-fab-button {
  pointer-events: auto;
}
</style>
