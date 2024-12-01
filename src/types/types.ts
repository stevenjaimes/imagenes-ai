export interface CustomImageData {
  id: string;
  url: string;
  blob?: Blob;
}

 export type StoredImage = {
    id: string;
    blob: Blob;
  };
  
  export interface ModelConfig {
    path: string;
    modelUrl?: string;
    name: string;
    timeout?: number;
    showInMenu: boolean;
    date?: string;
  }
  
  export interface ImageGeneratorProps {
    modelUrl: string;
    name: string;
    timeout: number;
  }
  
