import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function BookDetailPage() {
  const { id } = useParams();
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
        cover: "https://placehold.co/400x600",
        category: "Romanzo storico",
        publishedDate: "1980",
        publisher: "Bompiani",
        pages: 512,
        isbn: "9788845292613",
        language: "Italiano",
        available: true,
        description: "Nel novembre del 1327 il frate francescano Guglielmo da Baskerville giunge in un'abbazia benedettina situata sulle Alpi, accompagnato dal novizio Adso da Melk, per partecipare a una disputa tra francescani e domenicani sulla povertà di Cristo. Il suo arrivo coincide con una serie di misteriosi omicidi all'interno dell'abbazia, ed egli viene incaricato dall'abate di indagare per scoprire il colpevole prima che giunga la delegazione papale guidata dall'inquisitore domenicano Bernardo Gui.",
        reviews: [
          { id: 1, user: "Marco B.", rating: 5, text: "Un capolavoro della letteratura, assolutamente da leggere!", date: "12/03/2023" },
          { id: 2, user: "Giulia R.", rating: 4, text: "Affascinante trama e personaggi ben sviluppati, anche se alcune parti sono molto dense.", date: "05/01/2023" }
        ],
        similarBooks: [
          { id: 2, title: "Il Pendolo di Foucault", author: "Umberto Eco", cover: "https://placehold.co/200x300" },
          { id: 3, title: "Il Cimitero di Praga", author: "Umberto Eco", cover: "https://placehold.co/200x300" }
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
    alert('Recensione inviata con successo!');
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

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-20">
        <div className="spinner mb-4"></div>
        <p className="text-gray-500 animate-pulse">Caricamento in corso...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Libro non trovato</h1>
        <p className="mb-6">Il libro che stai cercando non è disponibile.</p>
        <Link to="/catalogo" className="btn-gradient px-6 py-2 rounded-lg inline-block">
          Torna al catalogo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header del libro con animazione */}
      <div className={`flex flex-col md:flex-row gap-8 mb-8 transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="w-full md:w-1/3">
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img 
              src={book.cover} 
              alt={`Copertina di ${book.title}`} 
              className="w-full h-auto rounded-lg shadow-md transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {book.available ? (
            <button className="w-full mt-4 btn-gradient py-3 px-4 rounded-lg font-bold hover-lift">
              Prenota ora
            </button>
          ) : (
            <button disabled className="w-full mt-4 bg-gray-400 text-white py-3 px-4 rounded-lg font-bold cursor-not-allowed">
              Non disponibile
            </button>
          )}
        </div>
        
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-900">
            {book.title}
          </h1>
          <h2 className="text-xl text-gray-600 mb-4">di {book.author}</h2>
          
          <div className="mb-6">
            <span className="badge">
              {book.category}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-6 text-sm mb-6 bg-gray-50 p-5 rounded-lg border border-gray-100">
            <div>
              <p className="flex justify-between border-b border-gray-200 py-2">
                <span className="font-semibold text-gray-500">Editore:</span> 
                <span>{book.publisher}</span>
              </p>
              <p className="flex justify-between border-b border-gray-200 py-2">
                <span className="font-semibold text-gray-500">Anno:</span> 
                <span>{book.publishedDate}</span>
              </p>
              <p className="flex justify-between py-2">
                <span className="font-semibold text-gray-500">Pagine:</span> 
                <span>{book.pages}</span>
              </p>
            </div>
            <div>
              <p className="flex justify-between border-b border-gray-200 py-2">
                <span className="font-semibold text-gray-500">Lingua:</span> 
                <span>{book.language}</span>
              </p>
              <p className="flex justify-between border-b border-gray-200 py-2">
                <span className="font-semibold text-gray-500">ISBN:</span> 
                <span className="font-mono">{book.isbn}</span>
              </p>
              <p className="flex justify-between py-2">
                <span className="font-semibold text-gray-500">Disponibilità:</span> 
                <span className={book.available ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                  {book.available ? 'Disponibile' : 'Non disponibile'}
                </span>
              </p>
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