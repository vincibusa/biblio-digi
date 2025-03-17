import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-blue-900/95 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-2xl font-bold text-white flex items-center group"
          >
            <span className="mr-2">📚</span>
            <span className="relative">
              BibliotecaDigitale
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-white/90 hover:text-white transition-colors relative group py-2"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/catalogo" 
              className="text-white/90 hover:text-white transition-colors relative group py-2"
            >
              Catalogo
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/login" 
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-white/10 border border-white/20"
            >
              Accedi
            </Link>
            <Link 
              to="/registrati" 
              className="bg-white text-blue-900 px-4 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-white/10 font-medium hover:bg-blue-50"
            >
              Registrati
            </Link>
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Menu"
          >
            <svg 
              className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
      </div>
      
      {/* Menu mobile */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-64 opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible'
        }`}
      >
        <div className="bg-blue-900/95 backdrop-blur-md px-4 py-2 space-y-1">
          <Link 
            to="/" 
            className="block py-3 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/catalogo" 
            className="block py-3 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Catalogo
          </Link>
          <div className="py-2 space-y-2">
            <Link 
              to="/login" 
              className="block py-3 px-4 text-center text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Accedi
            </Link>
            <Link 
              to="/registrati" 
              className="block py-3 px-4 text-center text-blue-900 bg-white hover:bg-blue-50 rounded-lg transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Registrati
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
