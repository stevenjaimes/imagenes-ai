import React from 'react';
import { Github, Linkedin, Mail, Code2, Dumbbell, Brain } from 'lucide-react';
import foto from '../assets/yo.jpg';




/**
 * Componente que muestra información sobre el autor, incluyendo
 * una imagen de perfil, descripciones personales, intereses y
 * enlaces a redes sociales.
 *
 * El componente también destaca las habilidades y áreas de interés
 * del autor, como programación, inteligencia artificial y deporte,
 * utilizando iconos y tarjetas informativas.
 *
 * @returns {React.ReactElement} Un elemento JSX que representa la
 * sección "Sobre mí" del autor.
 */

const AboutMe = (): React.ReactElement => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section with Image */}
          <div className="relative h-48 bg-gradient-to-r from-purple-600 to-pink-600">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <img
                src={foto}
                alt="Foto de perfil"
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg
                         hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="pt-20 pb-8 px-6 sm:px-12">
            <h3 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Sobre mí
            </h3>

            {/* Skills/Interests Icons */}
            <div className="flex justify-center gap-8 my-6">
              <div className="flex flex-col items-center text-gray-600 hover:text-purple-600 transition-colors">
                <Code2 className="w-8 h-8 mb-2" />
                <span className="text-sm">Programación</span>
              </div>
              <div className="flex flex-col items-center text-gray-600 hover:text-purple-600 transition-colors">
                <Brain className="w-8 h-8 mb-2" />
                <span className="text-sm">IA</span>
              </div>
              <div className="flex flex-col items-center text-gray-600 hover:text-purple-600 transition-colors">
                <Dumbbell className="w-8 h-8 mb-2" />
                <span className="text-sm">Deporte</span>
              </div>
            </div>

            {/* Description Paragraphs */}
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p className="text-lg">
                Soy ingeniero y programador, apasionado por el deporte y la programación. Mi fascinación por
                la tecnología me ha llevado a explorar el desarrollo de aplicaciones, sistemas y modelos de
                inteligencia artificial. Disfruto utilizando la programación como herramienta para resolver problemas
                y mejorar procesos.
              </p>
              <p className="text-lg">
                Además, me encanta el deporte, ya que es una excelente forma de mantenerme activo, tanto mental como
                físicamente. La disciplina y el trabajo en equipo que aprendo en el deporte también los aplico a mi
                vida profesional, donde siempre busco colaborar de manera efectiva.
              </p>
              <p className="text-lg">
                Espero que disfruten de todos esos modelos de inteligencia artificial para la generación de imágenes,
                y que encuentren inspiración en ellos para seguir explorando la tecnología y el futuro.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6 mt-8 pt-8 border-t">
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Skills Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h4 className="text-xl font-semibold text-purple-600 mb-3">Desarrollo</h4>
            <p className="text-gray-600">
              Experiencia en desarrollo web, aplicaciones y sistemas utilizando tecnologías modernas.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h4 className="text-xl font-semibold text-pink-600 mb-3">IA & ML</h4>
            <p className="text-gray-600">
              Trabajo con modelos de inteligencia artificial y aprendizaje automático.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h4 className="text-xl font-semibold text-purple-600 mb-3">Deporte</h4>
            <p className="text-gray-600">
              Entusiasta del deporte y defensor de un estilo de vida saludable y activo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;