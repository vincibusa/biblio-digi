import { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Dati di esempio (in un'applicazione reale verrebbero da un database/API)
  const books = [
    { id: 1, title: "Il Nome della Rosa", author: "Umberto Eco", cover: "https://placehold.co/200x300", category: "Romanzo storico" },
    { id: 2, title: "1984", author: "George Orwell", cover: "https://placehold.co/200x300", category: "Distopico" },
    { id: 3, title: "Il Piccolo Principe", author: "Antoine de Saint-Exupéry", cover: "https://placehold.co/200x300", category: "Favola" },
    { id: 4, title: "Orgoglio e Pregiudizio", author: "Jane Austen", cover: "https://placehold.co/200x300", category: "Romanzo" },
    { id: 5, title: "La Divina Commedia", author: "Dante Alighieri", cover: "https://placehold.co/200x300", category: "Poesia" },
    { id: 6, title: "Il Signore degli Anelli", author: "J.R.R. Tolkien", cover: "https://placehold.co/200x300", category: "Fantasy" },
    { id: 7, title: "Sapiens: Da animali a dei", author: "Yuval Noah Harari", cover: "https://placehold.co/200x300", category: "Storia" },
    { id: 8, title: "Siddharta", author: "Hermann Hesse", cover: "https://placehold.co/200x300", category: "Filosofia" },
    { id: 9, title: "Il Codice da Vinci", author: "Dan Brown", cover: "https://placehold.co/200x300", category: "Thriller" },
  ];

  const categories = ["Romanzo", "Romanzo storico", "Distopico", "Favola", "Poesia", "Fantasy", "Storia", "Filosofia", "Thriller"];

  // Filtraggio dei libri
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? book.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  const handleCategoryChange = (category) => {
    setActiveFilter(true);
    setTimeout(() => {
      setSelectedCategory(category);
      setShowMobileFilters(false);
    }, 300);
    setTimeout(() => setActiveFilter(false), 600);
  };

  const resetFilters = () => {
    setActiveFilter(true);
    setTimeout(() => {
      setSearchQuery('');
      setSelectedCategory('');
    }, 300);
    setTimeout(() => setActiveFilter(false), 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header con titolo e statistiche */}
      <div className={`transition-all duration-700 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 mb-6">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Esplora il Catalogo
            </h1>
            <p className="text-blue-100 text-sm sm:text-base md:text-lg max-w-2xl">
              Scopri la nostra vasta collezione di libri digitali. Trova il tuo prossimo libro preferito tra migliaia di titoli.
            </p>
          </div>
        </div>
      </div>

      {/* Barra di ricerca e filtri */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`bg-white rounded-2xl shadow-lg mb-8 overflow-hidden transition-all duration-700 delay-150 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="p-4 sm:p-6">
            {/* Barra di ricerca e toggle filtri mobile */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mb-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Cerca per titolo o autore"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" 
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="sm:hidden flex items-center justify-center px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                </svg>
                Filtri
              </button>

              <select 
                className="hidden sm:block w-48 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: `right 0.5rem center`,
                  backgroundRepeat: `no-repeat`,
                  backgroundSize: `1.5em 1.5em`,
                  paddingRight: `2.5rem`
                }}
              >
                <option value="">Tutte le categorie</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Filtri mobile */}
            <div className={`sm:hidden overflow-hidden transition-all duration-300 ${showMobileFilters ? 'max-h-96' : 'max-h-0'}`}>
              <div className="py-4 space-y-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Categorie</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleCategoryChange('')}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 
                              ${selectedCategory === '' 
                                ? 'bg-blue-600 text-white shadow-md' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    Tutti
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 
                                ${selectedCategory === category 
                                  ? 'bg-blue-600 text-white shadow-md' 
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tag delle categorie desktop */}
            <div className="hidden sm:flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryChange('')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 
                          ${selectedCategory === '' 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                Tutti
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 
                            ${selectedCategory === category 
                              ? 'bg-blue-600 text-white shadow-md' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Risultati */}
        <div className={`transition-all duration-500 delay-300 transform 
                        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                        ${activeFilter ? 'opacity-50 scale-98' : 'opacity-100 scale-100'}`}>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600 font-medium">
              {filteredBooks.length} {filteredBooks.length === 1 ? 'libro trovato' : 'libri trovati'}
            </p>
            
            {(searchQuery || selectedCategory) && (
              <button 
                className="text-blue-600 flex items-center hover:text-blue-800 transition-colors"
                onClick={resetFilters}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Resetta filtri
              </button>
            )}
          </div>
          
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {filteredBooks.map((book, index) => (
                <div 
                  key={book.id} 
                  className="transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <p className="text-gray-500 text-lg mb-4">Nessun libro trovato con i criteri di ricerca selezionati.</p>
              <button 
                className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                onClick={resetFilters}
              >
                Resetta filtri
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stili CSS per il pattern di sfondo */}
      <style jsx="true">{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        @media (max-width: 370px) {
          .xs\\:grid-cols-2 {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
}
