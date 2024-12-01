import React from 'react';
import {  useState, useEffect } from 'react';
import axios from 'axios';
import { Wand2, Loader2, Image as ImageIcon } from 'lucide-react';
import { initializeDB, saveImageToDB } from "../config/indexedDBUtils";
import { ImageGeneratorProps } from '../types/types';
import type { NodeJS } from 'node'; 


const ImageGenerator = ({ modelUrl, name, timeout }: ImageGeneratorProps) => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    initializeDB();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isLoading && progress < 99) {
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1, 99));
      }, timeout);
    } else if (!isLoading) {
      clearInterval(interval!);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading, progress, timeout]);

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Por favor, ingresa una descripción para generar la imagen.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setProgress(0);

    try {
      const response = await axios.post(
        modelUrl,
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_YOUR_API_HUGGINGFACE_TOKEN}`,
            'Content-Type': 'application/json',
          },
          responseType: 'blob',
        }
      );

      const imageUrl = URL.createObjectURL(response.data);
      setImage(imageUrl);

      const id = new Date().toISOString();
      await saveImageToDB(id, response.data);
    } catch (err) {
      console.error('Error generando la imagen:', err);
      setError('Hubo un error al generar la imagen. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-100">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full mb-4">
          <Wand2 className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-purple-700">{name}</span>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Crea Arte con IA
        </h1>
      </div>

      <div className="space-y-6">
        <div>
          <textarea
            className="w-full min-h-[120px] p-4 bg-white rounded-xl border border-purple-100 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all resize-none"
            placeholder="Describe la imagen que deseas crear..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={generateImage}
          disabled={isLoading}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Generando... {progress}%
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Wand2 className="w-5 h-5" />
              Generar Imagen
            </span>
          )}
        </button>

        {image && !isLoading && (
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Resultado:</h3>
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
              <img
                src={image}
                alt="Imagen generada"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {!image && !isLoading && (
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-purple-100 rounded-xl">
            <ImageIcon className="w-12 h-12 text-purple-200 mb-4" />
            <p className="text-gray-500 text-center">
              Tu imagen generada aparecerá aquí
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;