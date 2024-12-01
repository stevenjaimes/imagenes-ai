import React from 'react';
import { AccordionItem } from './AccordionItem';
import { termsContent } from './TermsContent';
import { Scroll } from 'lucide-react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Scroll className="w-12 h-12 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-lg text-gray-600">
            Por favor, lee detenidamente nuestros términos y condiciones de uso
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {termsContent.map((section, index) => (
            <AccordionItem key={index} title={section.title}>
              {section.content}
            </AccordionItem>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Última actualización: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;