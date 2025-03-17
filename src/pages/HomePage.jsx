import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // In un'applicazione reale, questi dati verrebbero da un'API
  const featuredBooks = [
    { id: 1, title: "Il Nome della Rosa", author: "Umberto Eco", cover: "https://placehold.co/200x300", category: "Romanzo storico" },
    { id: 2, title: "1984", author: "George Orwell", cover: "https://placehold.co/200x300", category: "Distopico" },
    { id: 3, title: "Il Piccolo Principe", author: "Antoine de Saint-Exupéry", cover: "https://placehold.co/200x300", category: "Favola" }
  ];

  const popularCategories = [
    { name: 'Romanzi', icon: '📚', color: 'from-blue-400 to-indigo-500', count: 245 },
    { name: 'Storia', icon: '🏛️', color: 'from-amber-400 to-orange-500', count: 132 },
    { name: 'Scienza', icon: '🔬', color: 'from-emerald-400 to-teal-500', count: 98 },
    { name: 'Filosofia', icon: '🧠', color: 'from-purple-400 to-indigo-500', count: 76 },
    { name: 'Arte', icon: '🎨', color: 'from-rose-400 to-pink-500', count: 105 },
    { name: 'Biografie', icon: '👤', color: 'from-cyan-400 to-blue-500', count: 89 },
    { name: 'Tecnologia', icon: '💻', color: 'from-gray-400 to-gray-600', count: 120 },
    { name: 'Poesia', icon: '✒️', color: 'from-violet-400 to-purple-500', count: 64 }
  ];

  const recentlyAdded = [
    { title: "La Storia Infinita", author: "Michael Ende", date: "3 giorni fa" },
    { title: "Il Maestro e Margherita", author: "Michail Bulgakov", date: "1 settimana fa" },
    { title: "Cent'anni di solitudine", author: "Gabriel García Márquez", date: "2 settimane fa" }
  ];

  const libraryStats = [
    { value: "25,000+", label: "Libri Digitali" },
    { value: "15,000+", label: "Utenti Attivi" },
    { value: "500+", label: "Nuovi Titoli Mensili" },
    { value: "98%", label: "Soddisfazione Utenti" }
  ];

  useEffect(() => {
    // Simulazione del caricamento della pagina
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Animazione per evidenziare testo alla digitazione
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative overflow-hidden pb-20">
      {/* Hero Section semplificata */}
      <div 
        className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-800 to-violet-900 mb-8 sm:mb-12 md:mb-16"
      >
        {/* Pattern geometrici animati nello sfondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${Math.random() * 30 + 5}px`,
                  height: `${Math.random() * 30 + 5}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.1,
                  animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`
                }}
              />
            ))}
          </div>
        </div>

        {/* Contenuto Hero */}
        <div className="absolute inset-0 flex items-center justify-center text-center p-4">
          <div className={`w-full max-w-4xl transition-all duration-1200 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Titolo con migliore gestione del testo su mobile */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg px-2">
              <span className="block mb-2">Esplora il Mondo</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-400 block">
                dei Libri Digitali
              </span>
            </h1>

            {/* Sottotitolo con padding e dimensioni ottimizzate */}
            <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-10 text-blue-50 max-w-3xl mx-auto leading-relaxed px-2">
              Scopri migliaia di titoli, classici senza tempo e nuove uscite. La tua biblioteca digitale, sempre con te.
            </p>
            
            {/* Barra di ricerca con migliore gestione su mobile */}
            <div className="relative max-w-xl sm:max-w-2xl mx-auto group px-2">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl">
                <div className="flex flex-col sm:flex-row">
                  <input 
                    type="text" 
                    placeholder="Cerca per titolo, autore o argomento" 
                    className="flex-grow px-4 py-3 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none border-0 focus:ring-0 text-sm sm:text-base"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button className="btn-gradient px-4 py-3 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none font-medium text-sm sm:text-base w-full sm:w-auto">
                    <span className="relative z-10 flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                      Cerca
                    </span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Tag con migliore gestione su mobile */}
            <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-2 px-2">
              {["Fantasy", "Classici", "Gialli", "Narrativa", "Avventura"].map((tag, index) => (
                <button 
                  key={index} 
                  onClick={() => setSearchQuery(tag)}
                  className="px-3 py-1.5 rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors text-xs sm:text-sm whitespace-nowrap"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        {/* Sezione statistiche animate */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 my-8 sm:my-12 transition-all duration-700 delay-200 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {libraryStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-xl p-4 sm:p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{stat.value}</div>
              <div className="text-gray-600 mt-2 text-sm sm:text-base">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Featured Books - sezione riprogettata */}
        <section className={`mb-12 sm:mb-20 transition-all duration-700 delay-300 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-10 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold relative inline-block">
                <span className="relative z-10">Libri in Evidenza</span>
                <span className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-blue-200 to-indigo-200 -z-10 rounded"></span>
              </h2>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">Scopri i titoli più amati dai nostri lettori</p>
            </div>
            <Link to="/catalogo" className="group flex items-center text-blue-600 font-medium bg-blue-50 hover:bg-blue-100 px-4 sm:px-5 py-2 rounded-full transition-colors text-sm sm:text-base w-full sm:w-auto justify-center">
              <span>Vedi tutti</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {featuredBooks.map((book, index) => (
              <div 
                key={book.id} 
                className="transform transition-all duration-500 hover-lift"
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  animation: `fadeSlideUp 0.8s ${index * 0.2}s both` 
                }}
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </section>
        
        {/* Sezione libri recenti */}
        <section className={`mb-12 sm:mb-20 transition-all duration-700 delay-400 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
            <div className="w-full md:w-1/2">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 sm:p-8 rounded-xl shadow-sm border border-blue-100 h-full">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-blue-900">
                  Aggiunti di Recente
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  {recentlyAdded.map((book, index) => (
                    <div 
                      key={index} 
                      className="flex items-center bg-white p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-blue-50 stagger-item"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 mr-3 sm:mr-4 text-lg sm:text-xl">
                        {book.title.charAt(0)}
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="font-medium text-blue-900 text-sm sm:text-base truncate">{book.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{book.author}</p>
                      </div>
                      <div className="text-xs text-gray-500 ml-2 sm:ml-4 bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap">{book.date}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link 
                    to="/catalogo?sort=recent" 
                    className="inline-block text-blue-700 hover:text-blue-800 font-medium underline decoration-2 decoration-blue-400 underline-offset-4 hover:decoration-blue-600 transition-all"
                  >
                    Visualizza tutte le nuove acquisizioni
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 sm:p-8 rounded-xl shadow-sm border border-purple-100 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full -mr-20 -mt-20 opacity-50"></div>
                <div className="relative">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-purple-900">
                    Entra nel Mondo della Lettura
                  </h2>
                  <p className="text-purple-800 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    La nostra biblioteca digitale offre accesso illimitato a migliaia di libri, articoli e risorse. Con un semplice abbonamento, avrai il mondo della conoscenza a portata di mano.
                  </p>
                  <div className="space-y-4 mb-8">
                    {[
                      "Accesso a oltre 25.000 titoli digitali",
                      "Lettura offline su qualsiasi dispositivo",
                      "Nuovi titoli aggiunti ogni settimana",
                      "Club del libro e discussioni letterarie"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start stagger-item" style={{ animationDelay: `${index * 150}ms` }}>
                        <svg className="w-5 h-5 text-purple-600 mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Link 
                      to="/login" 
                      className="btn-gradient py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium text-white text-center hover-lift text-sm sm:text-base"
                    >
                      Inizia Gratuitamente
                    </Link>
                    <Link 
                      to="/abbonamenti" 
                      className="bg-white text-purple-700 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium border border-purple-200 text-center hover:bg-purple-50 transition-colors text-sm sm:text-base"
                    >
                      Scopri i Piani
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categorie popolari riprogettate */}
        <section className={`mb-12 sm:mb-20 transition-all duration-700 delay-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 relative inline-block">
            <span className="relative z-10">Categorie Popolari</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-blue-200 to-indigo-200 -z-10 rounded"></span>
          </h2>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">Esplora la nostra vasta collezione di libri per categoria</p>
          
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {popularCategories.map((category, index) => (
              <Link 
                key={category.name}
                to={`/catalogo?categoria=${category.name}`}
                className={`group relative overflow-hidden rounded-xl transition-all duration-500 hover:shadow-xl stagger-item`}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} transition-all duration-500`}></div>
                <div className={`absolute inset-0 opacity-0 bg-gradient-to-br ${category.color} transition-all duration-500 ${hoveredCategory === index ? 'opacity-20' : ''}`}></div>
                
                <div className="relative p-4 sm:p-6 h-32 sm:h-44 flex flex-col items-center justify-center text-white">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3 transform transition-transform duration-500 group-hover:scale-125">{category.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-center">{category.name}</h3>
                  <div className="mt-1 sm:mt-2 text-xs sm:text-sm opacity-80">{category.count} libri</div>
                  
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className={`transition-all duration-700 delay-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-800 shadow-xl">
            <div className="absolute right-0 top-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute left-0 bottom-0 -mb-10 -ml-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            
            <div className="relative px-4 sm:px-8 py-8 sm:py-16 md:p-16 text-center md:text-left">
              <div className="md:flex items-center">
                <div className="md:w-2/3 mb-6 sm:mb-10 md:mb-0 md:pr-12">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Rimani Aggiornato</h2>
                  <p className="text-blue-100 text-sm sm:text-lg mb-0">Iscriviti alla nostra newsletter per ricevere aggiornamenti su nuovi libri, eventi e offerte speciali.</p>
                </div>
                
                <div className="md:w-1/3">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-1">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="p-1">
                        <input 
                          type="email" 
                          placeholder="Il tuo indirizzo email" 
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border-0 focus:ring-0 text-sm sm:text-base"
                        />
                      </div>
                      <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-2 sm:py-3 hover:from-blue-700 hover:to-indigo-700 transition-all text-sm sm:text-base">
                        Iscriviti
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-center mt-3 sm:mt-4 text-blue-100 opacity-80">Rispettiamo la tua privacy. Puoi annullare l'iscrizione in qualsiasi momento.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Stili globali */}
      <style jsx="true">{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Aggiungiamo breakpoint personalizzato per schermi molto piccoli */
        @media (max-width: 370px) {
          .text-3xl {
            font-size: 1.5rem;
          }
          .text-2xl {
            font-size: 1.25rem;
          }
          .text-xl {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </div>
  );
}
