import React, { useState, useEffect } from "react";
import { Image } from "lucide-react";
import { getImagesFromDB, deleteImageFromDB } from "../config/indexedDBUtils";
import ImageModal from "./ImageModal";
import { StoredImage, CustomImageData } from "../types/types";

// Cache global de URLs
const imageCache = new Map<string, string>();



/**
 * Componente que muestra una galería de imágenes generadas por el usuario.
 * Utiliza IndexedDB para almacenar las imágenes y crear URLs solo si no se han
 * creado aún en la caché. El componente se encarga de eliminar las URL de la
 * caché cuando se desmonta.
 *
 * @returns {JSX.Element} El componente de la galería de imágenes.
 */
const ImageGallery = (): React.ReactElement => {
  const [images, setImages] = useState<CustomImageData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<CustomImageData | null>(null);
  
  /**
   * Efecto que se encarga de:
   * 1. Cargar las imágenes de IndexedDB
   * 2. Crear URLs solo si no se han creado aún en la caché
   * 3. Agregar las imágenes a la lista de imágenes
   * 4. Limpiar las URLs de la caché cuando el componente se desmonte
   */
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const storedImages = await getImagesFromDB();
       

        // Mapear las imágenes y crear las URLs solo si no se han creado aún en la caché
        const imageData = storedImages.map((record: StoredImage) => {
          let url = imageCache.get(record.id);

          // Si la URL no está en caché, crearla y agregarla
          if (!url) {
            console.log("url no esta en cache");
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

    // No limpiar la caché de URLs cuando el componente se desmonte
  }, []); // La dependencia vacía asegura que esto solo se ejecute una vez

  
  /**
   * Abre el modal con la imagen seleccionada.
   * @param {CustomImageData} image Imagen a mostrar en el modal.
   */

  const openModal = (image: CustomImageData) => {
    setCurrentImage(image);
    setModalOpen(true);
  };

  
  /**
   * Cierra el modal y borra la imagen seleccionada.
   */
  const closeModal = () => {
    setModalOpen(false);
    setCurrentImage(null);
  };

  /**
   * Descarga la imagen seleccionada en el disco local.
   * @param {CustomImageData} image Imagen a descargar.
   */
  const downloadImage = (image: CustomImageData) => {
    const link = document.createElement("a");
    link.href = image.url;
    link.download = `image-${image.id}.jpg`;
    link.click();
  };

  /**
   * Elimina una imagen de la base de datos y de la caché de URLs.
   * Luego, actualiza el estado eliminando la imagen y cierra el modal.
   * @param {string} imageId ID de la imagen a eliminar.
   */
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
