import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import modelConfigs from '../config/models.json';
import ImageGallery from './ImageGallery';

const MainPage = (): React.ReactElement => {
  return (
    <div className="min-h-[calc(100vh-150px)] bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-6 py-6">
      {/* Main Content */}
      <div className="flex flex-col space-y-12">
        {/* Hero Section */}
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-10 border border-purple-100">
          <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">IA Image Generation</span>
          </div>

          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Generador de Imágenes con IA
          </h2>

          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Explora el poder de la inteligencia artificial para crear arte digital único.
            Elige uno de nuestros generadores y da vida a tus ideas.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {modelConfigs
              .slice(1)
              .filter((model) => model.showInMenu)
              .map((model, index) => (
                <Link
                  key={index}
                  to={model.path}
                  className="group relative px-6 py-3 bg-white rounded-xl shadow-sm border border-purple-100 hover:shadow-md transition-all duration-300"
                >
                  <span className="text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:opacity-80">
                    {model.name}
                  </span>
                </Link>
              ))}
          </div>
        </div>

        {/* Gallery Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-10 border border-purple-100">
          <div className="flex items-center justify-center gap-2 mb-8">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Galería de Creaciones
            </h3>
          </div>
          <ImageGallery />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
