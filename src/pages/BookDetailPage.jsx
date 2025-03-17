import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState(null);
  const [activeTab, setActiveTab] = useState('descrizione');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [animate, setAnimate] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const shareMenuRef = useRef(null);
  const [favorited, setFavorited] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Chiudi menu condivisione quando si clicca fuori
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
        setShowShareMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // In un'applicazione reale, questi dati verrebbero da un'API
  useEffect(() => {
    // Simulazione di caricamento da API
    setTimeout(() => {
      const bookData = {
        id: parseInt(id),
        title: "Il Nome della Rosa",
        author: "Umberto Eco",
        authorBio: "Umberto Eco (1932-2016) è stato un semiologo, filosofo e scrittore italiano di fama mondiale. Professore di semiotica all'Università di Bologna, è noto per i suoi studi sulla cultura medievale e per i suoi celebri romanzi.",
        cover: "https://placehold.co/400x600",
        category: "Romanzo storico",
        publishedDate: "1980",
        publisher: "Bompiani",
        pages: 512,
        isbn: "9788845292613",
        language: "Italiano",
        available: true,
        rating: 4.7,
        totalRatings: 1287,
        description: "Nel novembre del 1327 il frate francescano Guglielmo da Baskerville giunge in un'abbazia benedettina situata sulle Alpi, accompagnato dal novizio Adso da Melk, per partecipare a una disputa tra francescani e domenicani sulla povertà di Cristo. Il suo arrivo coincide con una serie di misteriosi omicidi all'interno dell'abbazia, ed egli viene incaricato dall'abate di indagare per scoprire il colpevole prima che giunga la delegazione papale guidata dall'inquisitore domenicano Bernardo Gui.\n\nDurante la sua indagine, Guglielmo scopre che tutti gli omicidi sono in qualche modo collegati alla biblioteca dell'abbazia, un labirinto inaccessibile che custodisce migliaia di volumi, tra cui molti considerati eretici. Grazie alle sue capacità deduttive e alla sua vasta cultura, il francescano inizia a delineare una teoria sugli omicidi, mentre nel monastero crescono le tensioni e le paure.\n\nIl romanzo è ambientato nel tardo medioevo e affronta temi universali come la ricerca della verità, il conflitto tra fede e ragione, la lotta per il potere e la conoscenza. Attraverso una narrazione ricca di riferimenti storici, filosofici e teologici, Eco costruisce un giallo intellettuale che ha affascinato lettori di tutto il mondo.",
        excerpts: [
          "Ero come al termine di un pellegrinaggio che mi avesse portato al cospetto di una creatura di perfezione indicibile, la cui bellezza fosse ineffabile armonia di parti con il tutto, stupenda concordia di misure vicendevoli.",
          "I libri non sono fatti per crederci, ma per essere sottoposti a indagine. Di fronte a un libro non dobbiamo chiederci cosa dica ma cosa vuole dire.",
          "La biblioteca è un grande labirinto, segno del labirinto del mondo. Entri e non sai se ne uscirai."
        ],
        reviews: [
          { id: 1, user: "Marco B.", rating: 5, text: "Un capolavoro della letteratura, assolutamente da leggere! La trama è avvincente e i personaggi sono incredibilmente ben caratterizzati.", date: "12/03/2023", avatar: "https://placehold.co/40" },
          { id: 2, user: "Giulia R.", rating: 4, text: "Affascinante trama e personaggi ben sviluppati, anche se alcune parti sono molto dense. La ricostruzione storica è impeccabile e l'atmosfera medievale è resa perfettamente.", date: "05/01/2023", avatar: "https://placehold.co/40" },
          { id: 3, user: "Alberto M.", rating: 5, text: "Un libro che ti fa riflettere su molti aspetti della vita e della conoscenza. La prosa di Eco è magistrale, anche se richiede una certa concentrazione per essere apprezzata appieno.", date: "22/11/2022", avatar: "https://placehold.co/40" }
        ],
        similarBooks: [
          { id: 2, title: "Il Pendolo di Foucault", author: "Umberto Eco", cover: "https://placehold.co/200x300", year: 1988, rating: 4.5 },
          { id: 3, title: "Il Cimitero di Praga", author: "Umberto Eco", cover: "https://placehold.co/200x300", year: 2010, rating: 4.2 },
          { id: 4, title: "Il Codice da Vinci", author: "Dan Brown", cover: "https://placehold.co/200x300", year: 2003, rating: 4.1 },
          { id: 5, title: "In Nome della Rosa", author: "Jean-Jacques Annaud", cover: "https://placehold.co/200x300", year: 1986, rating: 4.3, isMovie: true }
        ],
        themes: ["Medioevo", "Mistero", "Religione", "Filosofia", "Conoscenza"],
        formats: [
          { type: "Cartaceo", price: 15.90, availability: "Disponibile" },
          { type: "eBook", price: 8.99, availability: "Disponibile" },
          { type: "Audiolibro", price: 12.50, availability: "Disponibile" }
        ]
      };
      
      setBook(bookData);
      setIsLoading(false);
      
      // Attiva le animazioni dopo un breve ritardo
      setTimeout(() => {
        setAnimate(true);
      }, 100);
    }, 800);
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // In un'applicazione reale, qui ci sarebbe una chiamata API per salvare la recensione
    const newReview = {
      id: Math.random(),
      user: "Tu",
      rating: reviewRating,
      text: reviewText,
      date: new Date().toLocaleDateString(),
      avatar: "https://placehold.co/40"
    };
    
    setBook(prev => ({
      ...prev,
      reviews: [newReview, ...prev.reviews]
    }));
    
    setReviewText('');
    setReviewRating(5);
  };

  const handleTabChange = (tab) => {
    setAnimate(false);
    setTimeout(() => {
      setActiveTab(tab);
      setAnimate(true);
    }, 200);
  };

  const shareBook = (platform) => {
    const shareUrl = window.location.href;
    const shareText = `Sto leggendo "${book.title}" di ${book.author}`;
    
    let shareLink;
    switch(platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
        break;
      case 'email':
        shareLink = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        alert('Link copiato negli appunti!');
        setShowShareMenu(false);
        return;
      default:
        return;
    }
    
    window.open(shareLink, '_blank');
    setShowShareMenu(false);
  };

  const renderRatingStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg 
            key={star} 
            className={`w-5 h-5 ${star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const toggleFavorite = () => {
    setFavorited(!favorited);
  };

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col justify-center items-center py-20">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 animate-pulse border-t-4 border-blue-500 border-opacity-50 rounded-full"></div>
          <div className="absolute inset-0 animate-spin border-t-4 border-blue-600 rounded-full" style={{animationDuration: '1.5s'}}></div>
        </div>
        <p className="text-gray-500 mt-6 animate-pulse">Caricamento del libro...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center py-12 px-4">
        <svg className="w-20 h-20 text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20h.01m-10.173-4a15.95 15.95 0 01-.672-4 15.95 15.95 0 01.672-4m20.346 0a15.95 15.95 0 01.672 4 15.95 15.95 0 01-.672 4M6 12a6 6 0 110-12 6 6 0 010 12zm12 0a6 6 0 110-12 6 6 0 010 12zm-8 7a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-700 text-center">Libro non trovato</h1>
        <p className="mb-6 text-gray-500 max-w-md text-center">Il libro che stai cercando non è disponibile o potrebbe essere stato rimosso.</p>
        <div className="flex space-x-4">
          <button 
            onClick={() => navigate(-1)} 
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg flex items-center transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Torna indietro
          </button>
          <Link 
            to="/catalogo" 
            className="btn-gradient px-6 py-3 rounded-lg inline-flex items-center"
          >
            Esplora il catalogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className={`mb-6 text-sm transition-all duration-500 transform ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-500 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <Link to="/catalogo" className="ml-1 text-gray-500 hover:text-blue-600 md:ml-2">
                  Catalogo
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-1 text-gray-500 md:ml-2 font-medium truncate">{book.title}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Header del libro con animazione */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
        <div className={`flex flex-col lg:flex-row gap-8 transition-all duration-700 transform ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Copertina del libro */}
          <div className="w-full lg:w-1/3 p-6 sm:p-8">
            <div className="relative group mx-auto max-w-xs">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img 
                  src={book.cover} 
                  alt={`Copertina di ${book.title}`} 
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                />
                {readingProgress > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
                      style={{ width: `${readingProgress}%` }}
                    ></div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-center">
                  <span className="text-sm font-medium">Anteprima</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>




            </div>
          </div>
          
          {/* Dettagli del libro */}
          <div className="w-full lg:w-2/3 p-6 sm:p-8">
            <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-900">
              {book.title}
            </h1>
            <h2 className="text-xl text-gray-600 mb-4">di {book.author}</h2>
            
            <div className="mb-6">
              <span className="badge">
                {book.category}
              </span>
            </div>
            
            <div className="mb-6 bg-gray-50 p-5 rounded-lg border border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 text-sm">
                <div>
                  <p className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 py-2">
                    <span className="font-semibold text-gray-500 mb-1 sm:mb-0">Editore:</span> 
                    <span className="text-right">{book.publisher}</span>
                  </p>
                  <p className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 py-2">
                    <span className="font-semibold text-gray-500 mb-1 sm:mb-0">Anno:</span> 
                    <span className="text-right">{book.publishedDate}</span>
                  </p>
                  <p className="flex flex-col sm:flex-row sm:justify-between py-2">
                    <span className="font-semibold text-gray-500 mb-1 sm:mb-0">Pagine:</span> 
                    <span className="text-right">{book.pages}</span>
                  </p>
                </div>
                <div>
                  <p className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 py-2">
                    <span className="font-semibold text-gray-500 mb-1 sm:mb-0">Lingua:</span> 
                    <span className="text-right">{book.language}</span>
                  </p>
                  <p className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 py-2">
                    <span className="font-semibold text-gray-500 mb-1 sm:mb-0">ISBN:</span> 
                    <span className="font-mono text-right break-all">{book.isbn}</span>
                  </p>
                  <p className="flex flex-col sm:flex-row sm:justify-between py-2">
                    <span className="font-semibold text-gray-500 mb-1 sm:mb-0">Disponibilità:</span> 
                    <span className={`text-right ${book.available ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>
                      {book.available ? 'Disponibile' : 'Non disponibile'}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center mb-6">
              {renderRatingStars(book.rating)}
              <span className="ml-2 text-gray-600">{book.rating.toFixed(1)} ({book.totalRatings} valutazioni)</span>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">Temi</h3>
              <div className="flex flex-wrap gap-2">
                {book.themes.map((theme) => (
                  <span key={theme} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">{theme}</span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">Biografia dell'autore</h3>
              <p className="text-gray-700 leading-relaxed">{book.authorBio}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation con animazioni */}
      <div className={`border-b mb-6 transition-all duration-500 delay-100 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <nav className="flex space-x-8">
          <button 
            onClick={() => handleTabChange('descrizione')}
            className={`py-4 px-2 font-medium border-b-2 relative ${activeTab === 'descrizione' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:border-gray-300 text-gray-600'}`}
          >
            Descrizione
            {activeTab === 'descrizione' && (
              <span className="absolute inset-x-0 -bottom-[2px] h-[2px] bg-gradient-to-r from-blue-600 to-indigo-600"></span>
            )}
          </button>
          <button 
            onClick={() => handleTabChange('recensioni')}
            className={`py-4 px-2 font-medium border-b-2 relative ${activeTab === 'recensioni' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:border-gray-300 text-gray-600'}`}
          >
            Recensioni ({book.reviews.length})
            {activeTab === 'recensioni' && (
              <span className="absolute inset-x-0 -bottom-[2px] h-[2px] bg-gradient-to-r from-blue-600 to-indigo-600"></span>
            )}
          </button>
          <button 
            onClick={() => handleTabChange('libri-simili')}
            className={`py-4 px-2 font-medium border-b-2 relative ${activeTab === 'libri-simili' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:border-gray-300 text-gray-600'}`}
          >
            Libri simili
            {activeTab === 'libri-simili' && (
              <span className="absolute inset-x-0 -bottom-[2px] h-[2px] bg-gradient-to-r from-blue-600 to-indigo-600"></span>
            )}
          </button>
        </nav>
      </div>
      
      {/* Tab Content con animazioni */}
      <div className={`mb-12 tab-content transition-all duration-500 ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {activeTab === 'descrizione' && (
          <div>
            <h3 className="text-xl font-bold mb-4 relative inline-block">
              <span>Sinossi</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-200 to-indigo-200 rounded"></span>
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {book.description}
            </p>
          </div>
        )}
        
        {activeTab === 'recensioni' && (
          <div>
            <h3 className="text-xl font-bold mb-4 relative inline-block">
              <span>Recensioni dei lettori</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-200 to-indigo-200 rounded"></span>
            </h3>
            
            {book.reviews.length > 0 ? (
              <div className="space-y-6 mb-8">
                {book.reviews.map((review, index) => (
                  <div 
                    key={review.id} 
                    className="border-b pb-4 stagger-item"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">{review.user}</div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700">{review.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mb-8">Nessuna recensione disponibile per questo libro.</p>
            )}
            
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
              <h4 className="text-lg font-bold mb-4 text-blue-800">Lascia una recensione</h4>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium">Valutazione</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <button 
                        key={rating} 
                        type="button"
                        onClick={() => setReviewRating(rating)}
                        className="focus:outline-none transform transition-transform hover:scale-110"
                      >
                        <svg className={`w-8 h-8 ${rating <= reviewRating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="review" className="block mb-2 font-medium">La tua recensione</label>
                  <textarea 
                    id="review"
                    rows="4"
                    className="w-full border rounded-lg px-4 py-2 focus:border-blue-300"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Condividi i tuoi pensieri su questo libro..."
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="btn-gradient px-6 py-2 rounded-lg hover-lift"
                >
                  Invia recensione
                </button>
              </form>
            </div>
          </div>
        )}
        
        {activeTab === 'libri-simili' && (
          <div>
            <h3 className="text-xl font-bold mb-4 relative inline-block">
              <span>Libri simili</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-200 to-indigo-200 rounded"></span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {book.similarBooks.map((similarBook, index) => (
                <Link 
                  key={similarBook.id} 
                  to={`/libro/${similarBook.id}`} 
                  className="group stagger-item"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="book-card">
                    <div className="overflow-hidden">
                      <img 
                        src={similarBook.cover} 
                        alt={`Copertina di ${similarBook.title}`}
                        className="w-full h-48 object-cover" 
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold group-hover:text-blue-600 transition-colors">{similarBook.title}</h3>
                      <p className="text-gray-600">{similarBook.author}</p>
                      <div className="flex items-center mt-2">
                        {renderRatingStars(similarBook.rating)}
                        <span className="ml-2 text-gray-600 text-sm">{similarBook.rating.toFixed(1)}</span>
                      </div>
                      <p className="text-gray-500 text-sm mt-1">{similarBook.year}</p>
                      {similarBook.isMovie && (
                        <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">Film</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}