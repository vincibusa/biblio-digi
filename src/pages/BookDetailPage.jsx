import { useState, useEffect } from 'react';
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
        description: "Nel novembre del 1327 il frate francescano Guglielmo da Baskerville giunge in un'abbazia benedettina situata sulle Alpi, accompagnato dal novizio Adso da Melk, per partecipare a una disputa tra francescani e domenicani sulla povertà di Cristo. Il suo arrivo coincide con una serie di misteriosi omicidi all'interno dell'abbazia, ed egli viene incaricato dall'abate di indagare per scoprire il colpevole prima che giunga la delegazione papale guidata dall'inquisitore domenicano Bernardo Gui.",
        reviews: [
          { id: 1, user: "Marco B.", rating: 5, text: "Un capolavoro della letteratura, assolutamente da leggere! La trama è avvincente e i personaggi sono incredibilmente ben caratterizzati.", date: "12/03/2023", avatar: "https://placehold.co/40" },
          { id: 2, user: "Giulia R.", rating: 4, text: "Affascinante trama e personaggi ben sviluppati, anche se alcune parti sono molto dense.", date: "05/01/2023", avatar: "https://placehold.co/40" },
        ],
        themes: ["Medioevo", "Mistero", "Religione", "Filosofia", "Conoscenza"],
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
    setActiveTab(tab);
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
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-700 text-center">Libro non trovato</h1>
        <p className="mb-6 text-gray-500 max-w-md text-center">Il libro che stai cercando non è disponibile o potrebbe essere stato rimosso.</p>
        <div className="flex space-x-4">
          <button 
            onClick={() => navigate(-1)} 
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg flex items-center transition-colors"
          >
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
      <div className="mb-6 text-sm">
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

      {/* Header del libro */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Copertina del libro */}
          <div className="w-full lg:w-1/3 p-6 sm:p-8">
            <div className="relative mx-auto max-w-xs">
              <img 
                src={book.cover} 
                alt={`Copertina di ${book.title}`} 
                className="w-full h-auto rounded-xl shadow-md"
              />
            </div>
            
            {/* Pulsante per la visualizzazione 3D */}
            <Link to="/3d-viewer">
              <button 
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Sfoglia in 3D
              </button>
            </Link>
          </div>
          
          {/* Dettagli del libro */}
          <div className="w-full lg:w-2/3 p-6 sm:p-8">
            <h1 className="text-3xl font-bold mb-2 text-blue-700">
              {book.title}
            </h1>
            <h2 className="text-xl text-gray-600 mb-4">di {book.author}</h2>
            
            <div className="mb-6">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
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
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="border-b mb-6">
        <nav className="flex space-x-8">
          <button 
            onClick={() => handleTabChange('descrizione')}
            className={`py-4 px-2 font-medium border-b-2 ${activeTab === 'descrizione' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:border-gray-300 text-gray-600'}`}
          >
            Descrizione
          </button>
          <button 
            onClick={() => handleTabChange('recensioni')}
            className={`py-4 px-2 font-medium border-b-2 ${activeTab === 'recensioni' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:border-gray-300 text-gray-600'}`}
          >
            Recensioni ({book.reviews.length})
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="mb-12">
        {activeTab === 'descrizione' && (
          <div>
            <h3 className="text-xl font-bold mb-4">Sinossi</h3>
            <p className="text-gray-700 leading-relaxed">
              {book.description}
            </p>
          </div>
        )}
        
        {activeTab === 'recensioni' && (
          <div>
            <h3 className="text-xl font-bold mb-4">Recensioni dei lettori</h3>
            
            {book.reviews.length > 0 ? (
              <div className="space-y-6 mb-8">
                {book.reviews.map((review) => (
                  <div 
                    key={review.id} 
                    className="border-b pb-4"
                  >
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">{review.user}</div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                    <div className="flex mb-2">
                      {renderRatingStars(review.rating)}
                    </div>
                    <p className="text-gray-700">{review.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mb-8">Nessuna recensione disponibile per questo libro.</p>
            )}
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h4 className="text-lg font-bold mb-4">Lascia una recensione</h4>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium">Valutazione</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <button 
                        key={rating} 
                        type="button"
                        onClick={() => setReviewRating(rating)}
                        className="focus:outline-none"
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
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Invia recensione
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
