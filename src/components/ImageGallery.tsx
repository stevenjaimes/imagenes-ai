import React, { useState, useEffect } from "react";
import { Image } from "lucide-react";
import { getImagesFromDB, deleteImageFromDB } from "../config/indexedDBUtils";
import ImageModal from "./ImageModal";
import { StoredImage, CustomImageData } from "../types/types";

// Cache global de URLs
const imageCache = new Map<string, string>();

const ImageGallery = () => {
  const [images, setImages] = useState<CustomImageData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<CustomImageData | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const storedImages = await getImagesFromDB();

        // Mapear las imágenes y crear las URLs solo si no se han creado aún en la caché
        const imageData = storedImages.map((record: StoredImage) => {
          let url = imageCache.get(record.id);

          // Si la URL no está en caché, crearla y agregarla
          if (!url) {
            url = URL.createObjectURL(record.blob);
            imageCache.set(record.id, url);
          }

          return {
            id: record.id,
            url: url,
          };
        });

        setImages(imageData);
      } catch (err) {
        console.error("Error al cargar imágenes de IndexedDB:", err);
      }
    };

    fetchImages();

    return () => {
      // Limpiar URLs de la caché cuando el componente se desmonte
      imageCache.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      imageCache.clear();
    };
  }, []); // La dependencia vacía asegura que esto solo se ejecute una vez

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

      // Revocar la URL y eliminarla de la caché
      const deletedImage = images.find((image) => image.id === imageId);
      if (deletedImage) {
        URL.revokeObjectURL(deletedImage.url);
        imageCache.delete(imageId);
      }

      // Actualizar el estado eliminando la imagen
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
              onClick={() => openModal(image)}
            >
              <img
                src={image.url}
                alt={`Imagen ${image.id}`}
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
