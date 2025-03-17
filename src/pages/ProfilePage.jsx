import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('prestiti');
  
  // In un'applicazione reale, questi dati verrebbero da un'API
  const userData = {
    nome: "Mario Rossi",
    email: "mario.rossi@example.com",
    telefono: "333-1234567",
    indirizzo: "Via Roma 123, 00123 Roma",
    tesseraId: "BIB-12345",
    dataRegistrazione: "15/06/2022",
    avatar: "https://placehold.co/200"
  };
  
  const loans = [
    { id: 1, title: "Il Nome della Rosa", author: "Umberto Eco", coverUrl: "https://placehold.co/100x150", borrowDate: "10/03/2023", dueDate: "10/04/2023", isOverdue: false },
    { id: 2, title: "1984", author: "George Orwell", coverUrl: "https://placehold.co/100x150", borrowDate: "25/02/2023", dueDate: "25/03/2023", isOverdue: true },
  ];
  
  const reservations = [
    { id: 3, title: "Il Piccolo Principe", author: "Antoine de Saint-Exupéry", coverUrl: "https://placehold.co/100x150", reservationDate: "01/04/2023", status: "In attesa" }
  ];
  
  const history = [
    { id: 4, title: "La Divina Commedia", author: "Dante Alighieri", coverUrl: "https://placehold.co/100x150", borrowDate: "05/01/2023", returnDate: "02/02/2023" },
    { id: 5, title: "Siddharta", author: "Hermann Hesse", coverUrl: "https://placehold.co/100x150", borrowDate: "10/11/2022", returnDate: "09/12/2022" },
    { id: 6, title: "Il Signore degli Anelli", author: "J.R.R. Tolkien", coverUrl: "https://placehold.co/100x150", borrowDate: "15/08/2022", returnDate: "14/10/2022" }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Sidebar con informazioni utente */}
        <div className="w-full md:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center mb-6">
              <img
                src={userData.avatar}
                alt="Avatar utente"
                className="w-32 h-32 rounded-full mb-4 object-cover"
              />
              <h1 className="text-xl font-bold">{userData.nome}</h1>
              <p className="text-gray-600">{userData.email}</p>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Tessera ID:</span>
                <span className="font-medium">{userData.tesseraId}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Telefono:</span>
                <span>{userData.telefono}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Indirizzo:</span>
                <span className="text-right">{userData.indirizzo}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Iscritto dal:</span>
                <span>{userData.dataRegistrazione}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Modifica profilo
              </button>
            </div>
          </div>
        </div>
        
        {/* Contenuto principale */}
        <div className="w-full md:w-2/3">
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex border-b">
              <button
                className={`px-6 py-3 font-medium focus:outline-none ${
                  activeTab === 'prestiti'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('prestiti')}
              >
                Prestiti attivi
              </button>
              <button
                className={`px-6 py-3 font-medium focus:outline-none ${
                  activeTab === 'prenotazioni'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('prenotazioni')}
              >
                Prenotazioni
              </button>
              <button
                className={`px-6 py-3 font-medium focus:outline-none ${
                  activeTab === 'cronologia'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('cronologia')}
              >
                Cronologia
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'prestiti' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Prestiti attivi</h2>
                  
                  {loans.length > 0 ? (
                    <div className="space-y-4">
                      {loans.map(loan => (
                        <div key={loan.id} className={`flex border rounded-lg overflow-hidden ${loan.isOverdue ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
                          <img
                            src={loan.coverUrl}
                            alt={`Copertina di ${loan.title}`}
                            className="w-20 h-30 object-cover"
                          />
                          <div className="flex-grow p-4">
                            <div className="flex justify-between">
                              <div>
                                <Link to={`/libro/${loan.id}`} className="font-bold hover:text-blue-600">
                                  {loan.title}
                                </Link>
                                <p className="text-gray-600">{loan.author}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500">Data prestito: {loan.borrowDate}</p>
                                <p className={`text-sm ${loan.isOverdue ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                                  Scadenza: {loan.dueDate}
                                  {loan.isOverdue && " (scaduto)"}
                                </p>
                              </div>
                            </div>
                            <div className="mt-3 flex justify-end">
                              <button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm">
                                Rinnova prestito
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Non hai libri in prestito al momento.</p>
                  )}
                </div>
              )}
              
              {activeTab === 'prenotazioni' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Prenotazioni</h2>
                  
                  {reservations.length > 0 ? (
                    <div className="space-y-4">
                      {reservations.map(reservation => (
                        <div key={reservation.id} className="flex border rounded-lg border-gray-200 overflow-hidden">
                          <img
                            src={reservation.coverUrl}
                            alt={`Copertina di ${reservation.title}`}
                            className="w-20 h-30 object-cover"
                          />
                          <div className="flex-grow p-4">
                            <div className="flex justify-between">
                              <div>
                                <Link to={`/libro/${reservation.id}`} className="font-bold hover:text-blue-600">
                                  {reservation.title}
                                </Link>
                                <p className="text-gray-600">{reservation.author}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500">Data prenotazione: {reservation.reservationDate}</p>
                                <p className="text-sm font-medium text-blue-600">
                                  Stato: {reservation.status}
                                </p>
                              </div>
                            </div>
                            <div className="mt-3 flex justify-end">
                              <button className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm">
                                Annulla prenotazione
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Non hai prenotazioni attive al momento.</p>
                  )}
                </div>
              )}
              
              {activeTab === 'cronologia' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Cronologia prestiti</h2>
                  
                  {history.length > 0 ? (
                    <div className="space-y-4">
                      {history.map(item => (
                        <div key={item.id} className="flex border rounded-lg border-gray-200 overflow-hidden">
                          <img
                            src={item.coverUrl}
                            alt={`Copertina di ${item.title}`}
                            className="w-20 h-30 object-cover"
                          />
                          <div className="flex-grow p-4">
                            <div className="flex justify-between">
                              <div>
                                <Link to={`/libro/${item.id}`} className="font-bold hover:text-blue-600">
                                  {item.title}
                                </Link>
                                <p className="text-gray-600">{item.author}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500">Prestato il: {item.borrowDate}</p>
                                <p className="text-sm text-gray-500">Restituito il: {item.returnDate}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Non ci sono prestiti nella tua cronologia.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
