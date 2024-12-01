import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Image as ImageIcon, Menu, X, ChevronDown } from 'lucide-react';
import modelConfigs from '../config/models.json';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModelsOpen, setIsModelsOpen] = useState(false);
  const menuRef = useRef(null);
  const modelsMenuRef = useRef(null);
  const buttonRef = useRef(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setIsModelsOpen(false);
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (
      menuRef.current && !menuRef.current.contains(event.target) &&
      buttonRef.current && !buttonRef.current.contains(event.target) &&
      modelsMenuRef.current && !modelsMenuRef.current.contains(event.target)
    ) {
      closeMenu();
    }
  }, [closeMenu]);

  useEffect(() => {
    if (isOpen || isModelsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isModelsOpen, handleClickOutside]);

  const modelsList = modelConfigs.filter(model => 
    model.showInMenu && model.path !== '/imagenes-creadas'
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b border-purple-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <Sparkles className="w-6 h-6 text-purple-600 group-hover:animate-pulse" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Steven Jaimes
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
            >
              Inicio
            </Link>
            
            {/* Models Dropdown */}
            <div className="relative" ref={modelsMenuRef}>
              <button
                onClick={() => setIsModelsOpen(!isModelsOpen)}
                className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:opacity-90 transition-all font-medium"
              >
                Modelos
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isModelsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isModelsOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-purple-100 py-2 animate-in fade-in slide-in-from-top-2">
                  {modelsList.map((model, index) => (
                    <Link
                      key={index}
                      to={model.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                      onClick={closeMenu}
                    >
                      {model.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/imagenes-creadas"
              className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors"
            >
              <ImageIcon className="w-4 h-4" />
              <span className="font-medium">Galería</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-purple-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-purple-600" />
            ) : (
              <Menu className="w-6 h-6 text-purple-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="md:hidden fixed inset-x-0 top-16 bg-white/95 backdrop-blur-sm border-b border-purple-100 animate-in slide-in-from-top-2"
        >
          <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-2">
            <Link
              to="/"
              className="px-4 py-2 text-gray-600 hover:text-purple-600 transition-colors font-medium rounded-lg hover:bg-purple-50"
              onClick={closeMenu}
            >
              Inicio
            </Link>
            
            {modelsList.map((model, index) => (
              <Link
                key={index}
                to={model.path}
                className="px-4 py-2 text-gray-600 hover:text-purple-600 transition-colors font-medium rounded-lg hover:bg-purple-50"
                onClick={closeMenu}
              >
                {model.name}
              </Link>
            ))}
            
            <Link
              to="/imagenes-creadas"
              className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors mt-2"
              onClick={closeMenu}
            >
              <ImageIcon className="w-4 h-4" />
              <span className="font-medium">Galería</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;