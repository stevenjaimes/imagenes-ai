import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () : JSX.Element => {
  return (
    <footer className="bg-white border-t border-purple-100 py-8 h-[150px] flex items-center justify-center">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-2 text-gray-600">
        <span>Creado con</span>
        <Heart className="w-4 h-4 text-red-500 fill-current" />
        <span>usando React y Tailwind CSS</span>
      </div>
      <div className="text-sm text-gray-500">
        © {new Date().getFullYear()} AI Art Generator. Todos los derechos reservados.
      </div>
      <div className="flex items-center gap-6 text-sm text-gray-500">
        <Link to="/terminos-de-uso">Términos de uso</Link>
        <Link to="/sobre-mi">Sobre mi</Link>
        <Link to="/contacto">Contacto</Link>
      </div>
    </div>
  </div>
</footer>

  );
};

export default Footer;