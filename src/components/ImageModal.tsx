import React from 'react';
import { Download, Trash2 } from 'lucide-react';
import { CustomImageData } from '../types/types';
import Modal from './Modal';

interface ImageModalProps {
  image: CustomImageData;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (image: CustomImageData) => void;
  onDelete: (imageId: string) => void;
}


const ImageModal: React.FC<ImageModalProps> = ({
  image,
  isOpen,
  onClose,
  onDownload,
  onDelete,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative">
        {/* Imagen Container */}
        <div className="max-h-[85vh] p-4">
          <img
            src={image.url}
            alt="Imagen ampliada"
            className="w-full max-h-[85vh] object-contain rounded-lg"
          />
        </div>

        {/* Controles */}
        <div className="p-4 bg-white border-t border-gray-100 rounded-b-2xl flex justify-center gap-4">
          <button
            onClick={() => onDownload(image)}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Descargar
          </button>
          <button
            onClick={() => onDelete(image.id)}
            className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Eliminar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;