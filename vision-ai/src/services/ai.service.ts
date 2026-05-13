import * as tf from '@tensorflow/tfjs';
// MUST import backends for TFJS to work
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

class AIService {
  private model: cocoSsd.ObjectDetection | null = null;
  private isModelLoading = false;

  async loadModel() {
    if (this.model || this.isModelLoading) return;
    
    this.isModelLoading = true;
    try {
      // Ensure the backend is ready
      await tf.ready();
      
      // Offline implementation: 
      // Loading from local public folder
      this.model = await cocoSsd.load({
        base: 'lite_mobilenet_v2',
        modelUrl: '/models/coco-ssd/model.json'
      });
      console.log('Model loaded from local source');
    } catch (error) {
      console.error('Local model not found or backend error, falling back to CDN', error);
      this.model = await cocoSsd.load({ base: 'lite_mobilenet_v2' });
    } finally {
      this.isModelLoading = false;
    }
  }

  async detect(imageSource: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement): Promise<cocoSsd.DetectedObject[]> {
    if (!this.model) return [];

    try {
      return await this.model.detect(imageSource);
    } catch (error) {
      console.error('Detection error:', error);
      return [];
    }
  }

  dispose() {
    this.model = null;
  }
}

export const aiService = new AIService();
