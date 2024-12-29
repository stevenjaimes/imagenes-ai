import React, { useState, useEffect } from "react";
import { Image } from "lucide-react";
import { getImagesFromDB, deleteImageFromDB } from "../config/indexedDBUtils";
import ImageModal from "./ImageModal";
import { createThumbnail } from "../utils/thumbnailUtils"; // Importa tu función aquí
import { CustomImageData } from "../types/types";

// Cache global de URLs
const imageCache = new Map<string, { thumbnail: string; original: string }>();

const ImageGallery = (): React.ReactElement => {
  const [images, setImages] = useState<CustomImageData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<CustomImageData | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const storedImages = await getImagesFromDB();

        // Procesar las imágenes
        const imageData = await Promise.all(
          storedImages.map(async (record) => {
            let cached = imageCache.get(record.id);
        
            if (!cached) {
              const originalUrl = URL.createObjectURL(record.blob);
              const thumbnailBlob = await createThumbnail(record.blob, 250, 250); // Obtén el Blob
              const thumbnailUrl = URL.createObjectURL(thumbnailBlob); // Genera URL para el Blob
        
              cached = { original: originalUrl, thumbnail: thumbnailUrl };
              imageCache.set(record.id, cached);
            }
        
            return {
              id: record.id,
              url: cached.original,
              blob: record.blob,
              thumbnailUrl: cached.thumbnail,
            };
          })
        );
        setImages(imageData);
      } catch (err) {
        console.error("Error al cargar imágenes de IndexedDB:", err);
      }
    };

    fetchImages();
  }, [images.length]);


  const openModal = (image: CustomImageData) => {
    setCurrentImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentImage(null);
  };

  const downloadImage = (image: CustomImageData) => {
    const link = document.createElement("a");
    link.href = image.url;
    link.download = `image-${image.id}.jpg`;
    link.click();
  };

  const handleDelete = async (imageId: string) => {
    try {
      await deleteImageFromDB(imageId);

      const deletedImage = images.find((image) => image.id === imageId);
      if (deletedImage) {
        URL.revokeObjectURL(deletedImage.url);
        imageCache.delete(imageId);
      }

      setImages(images.filter((image) => image.id !== imageId));
      closeModal();
    } catch (err) {
      console.error("Error al eliminar la imagen:", err);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100">
      {images.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <Image className="w-16 h-16 text-purple-300 mb-4" />
          <p className="text-lg text-gray-500">No se han generado imágenes aún.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
              onClick={() => openModal(image)}
            >
              <img
                src={image.thumbnailUrl} // Usar la thumbnail
                alt={`Imagen ${image.id}`}
                loading="lazy"
                decoding="async"
                width={250}
                height = {250}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium">Ver detalles</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && currentImage && (
        <ImageModal
          image={currentImage}
          isOpen={modalOpen}
          onClose={closeModal}
          onDownload={downloadImage}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ImageGallery;
