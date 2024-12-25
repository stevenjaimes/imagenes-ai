import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Layout from './components/Layout';
import modelConfigs from './config/models.json';
import { ModelConfig } from './types/types';

// Lazy load components
const MainPage = React.lazy(() => import('./components/MainPage'));
const ImageGallery = React.lazy(() => import('./components/ImageGallery'));
const ImageGenerator = React.lazy(() => import('./components/ImageGenerator'));
const AboutMe = React.lazy(() => import('./components/AboutMe'));
const ContactForm = React.lazy(() => import('./components/ContactForm/ContactForm'));
const TermsAndConditions = React.lazy(() => import('./components/TermsAndConditions/TermnsAndConditions'));

/**
 * Componente principal de la aplicación.
 *
 * Renderiza la interfaz principal y los componentes que se
 * encuentran en ella.
 *
 * @returns {React.ReactElement} Un elemento JSX que representa
 * la interfaz principal de la aplicación.
 */
const App = (): React.ReactElement => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-[60vh]">
                <p>Cargando...</p>
              </div>
            }
          >
            <Routes>
              <Route
                path="/imagenes-creadas"
                element={
                  <Layout>
                    <ImageGallery />
                  </Layout>
                }
              />
              {(modelConfigs as ModelConfig[]).map((model, index) => (
                <Route
                  key={index}
                  path={model.path}
                  element={
                    <Layout>
                      <ImageGenerator
                        modelUrl={model.modelUrl ?? ''}
                        name={model.name}
                        timeout={model.timeout ?? 0}
                      />
                    </Layout>
                  }
                />
              ))}
              <Route
                path="/"
                element={
                  <Layout>
                    <MainPage />
                  </Layout>
                }
              />
              <Route
                path="/sobre-mi"
                element={
                  <Layout>
                    <AboutMe />
                  </Layout>
                }
              />
              <Route
                path="/contacto"
                element={
                  <Layout>
                    <ContactForm />
                  </Layout>
                }
              />
              <Route
                path="/terminos-de-uso"
                element={
                  <Layout>
                    <TermsAndConditions />
                  </Layout>
                }
              />
              <Route
                path="*"
                element={
                  <Layout>
                    <div className="flex items-center justify-center min-h-[60vh]">
                      <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                          Ruta no encontrada
                        </h2>
                        <p className="text-gray-600">
                          Por favor, selecciona un generador de imágenes válido.
                        </p>
                      </div>
                    </div>
                  </Layout>
                }
              />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
