// thumbnailUtils.ts
export const createThumbnail = async (
    imageBlob: Blob,
    width: number,
    height: number,
    mimeType: string = 'image/webp', // Tipo MIME por defecto
    quality: number = 1.0 // Calidad por defecto
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error("No se pudo obtener el contexto del canvas"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
  
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob); // Resuelve con el Blob
            } else {
              reject(new Error("No se pudo generar el thumbnail"));
            }
          },
          mimeType,
          quality
        );
      };
      img.onerror = reject;
  
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          img.src = event.target.result as string;
        } else {
          reject(new Error("No se pudo leer el Blob"));
        }
      };
      reader.readAsDataURL(imageBlob);
    });
  };
  