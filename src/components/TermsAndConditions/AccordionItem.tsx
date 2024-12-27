import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItemProps {
  title: string; // El título del acordeón
  children: React.ReactNode; // El contenido que se muestra al expandir el acordeón
}

/**
 * Componente que representa un solo ítem dentro de un acordeón.
 * Renderiza un botón con el título proporcionado y un ícono opcional para indicar si el ítem está abierto o cerrado.
 * 
 * Cuando el botón es presionado, el contenido del acordeón se expandirá o colapsará, dependiendo del estado actual.
 * El contenido de este componente se pasa como `children`, y si es un string, se envuelve en un `<p>` automáticamente.
 * 
 * @param {string} title - El título que se muestra en el acordeón.
 * @param {React.ReactNode} children - El contenido del acordeón. Puede ser cualquier tipo de contenido React (texto, componentes, etc.).
 *
 * @returns {JSX.Element} Un acordeón con un botón para expandir o colapsar el contenido.
 *
 * @example
 * <AccordionItem title="Este es el título">
 *   Este es el contenido del acordeón, que puede ser un texto o cualquier otro componente.
 * </AccordionItem>
 * 
 * @note El acordeón utiliza TailwindCSS para los estilos predeterminados, y puedes personalizarlos según sea necesario.
 */
export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-purple-100">
      <button
        className="w-full py-4 px-6 flex items-center justify-between text-left transition-colors hover:bg-purple-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-purple-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-purple-600" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 bg-white text-gray-600 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};
