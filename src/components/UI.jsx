import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";

// Atom per memorizzare la pagina corrente
export const pageAtom = atom(0);

// Atom per memorizzare l'array delle pagine (accessibile globalmente)
export const pagesDataAtom = atom([]);

// Simulazione di una chiamata API che rileva automaticamente le pagine disponibili
const fetchPagesFromApi = () => {
  return new Promise((resolve) => {
    // Simuliamo un ritardo di rete (500ms)
    setTimeout(() => {
      // Simuliamo una vera scansione di directory o query al database
      // In una vera implementazione backend, si farebbe qualcosa come:
      // const files = fs.readdirSync('/path/to/textures');
      // const pageFiles = files.filter(file => file.startsWith('page') && file.endsWith('.jpg'));
      
      // Poiché siamo nel browser e non possiamo leggere direttamente i file,
      // simulo l'elenco dei file che sappiamo esistere realmente nella cartella textures
      const simulatedDirectoryContents = [
        'book-cover.jpg',
        'book-cover-roughness.jpg',
        'book-back.jpg',
        'page1.jpg',
        'page2.jpg',
        'page3.jpg',
        'page4.jpg',
        'page5.jpg',
        'page6.jpg',
        'page7.jpg',
        'page8.jpg',
        'page9.jpg',
        'page10.jpg',
        'page11.jpg',
        'page12.jpg',
        'page13.jpg',
        'page14.jpg',
        'page15.jpg',
        'page16.jpg',
        'page17.jpg'
      ];
      
      // Estrai solo i file che iniziano con "page"
      const pageFiles = simulatedDirectoryContents.filter(
        file => file.startsWith('page') && file.endsWith('.jpg')
      );
      
      // Estrai i nomi delle pagine senza estensione
      const pagesFound = pageFiles.map(file => file.replace('.jpg', ''));
      
      console.log(`API: Scansione completa. Rilevate ${pagesFound.length} pagine disponibili`);
      
      const apiResponse = {
        status: "success",
        data: {
          pages: pagesFound,
          totalCount: pagesFound.length,
          message: `Trovate ${pagesFound.length} pagine`
        }
      };
      
      resolve(apiResponse);
    }, 500);
  });
};

// Esporta un array di pagine vuoto che verrà aggiornato dopo il caricamento
// Questo è necessario per Book.jsx che importa questo valore
export const pages = [];

// Componente principale dell'UI
export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const [pictures, setPictures] = useState([]);
  const [pagesLoaded, setPagesLoaded] = useState(false);
  const [, setPagesData] = useAtom(pagesDataAtom);
  
  // Carica le pagine dalla nostra "API" simulata
  useEffect(() => {
    const loadPages = async () => {
      try {
        // Simuliamo una chiamata API
        console.log("Chiamata API in corso per caricare le pagine...");
        const response = await fetchPagesFromApi();
        
        if (response.status === "success") {
          // Otteniamo le pagine dalla risposta
          const pagesFromApi = response.data.pages;
          
          // Ordiniamo le pagine numericamente
          const sortedPages = pagesFromApi.sort((a, b) => {
            const numA = parseInt(a.replace('page', ''));
            const numB = parseInt(b.replace('page', ''));
            return numA - numB;
          });
          
          console.log("Pagine caricate dall'API:", sortedPages);
          setPictures(sortedPages);
          
          // Aggiorniamo lo stato globale con le pagine trovate
          setPagesData(sortedPages);
          
          // Aggiorniamo anche l'array esportato (per compatibilità con Book.jsx)
          pages.length = 0; // Svuotiamo l'array
          
          // Generiamo le pagine nel formato richiesto da Book.jsx
          pages.push({
            front: "book-cover",
            back: sortedPages[0] || "page1",
          });
          
          for (let i = 1; i < sortedPages.length - 1; i += 2) {
            pages.push({
              front: sortedPages[i % sortedPages.length],
              back: sortedPages[(i + 1) % sortedPages.length],
            });
          }
          
          if (sortedPages.length > 0) {
            pages.push({
              front: sortedPages[sortedPages.length - 1],
              back: "book-back",
            });
          }
          
          console.log("Array 'pages' aggiornato per Book.jsx:", pages);
        } else {
          throw new Error("Errore nella risposta dell'API");
        }
      } catch (error) {
        console.error("Errore durante il caricamento delle pagine:", error);
        // Fallback in caso di errore
        const fallback = Array.from({ length: 17 }, (_, i) => `page${i + 1}`);
        console.log("Errore API, uso dati di fallback:", fallback);
        setPictures(fallback);
        setPagesData(fallback);
        
        // Aggiorniamo anche l'array esportato per il fallback
        pages.length = 0;
        
        pages.push({
          front: "book-cover",
          back: fallback[0],
        });
        
        for (let i = 1; i < fallback.length - 1; i += 2) {
          pages.push({
            front: fallback[i],
            back: fallback[i + 1],
          });
        }
        
        pages.push({
          front: fallback[fallback.length - 1],
          back: "book-back",
        });
      } finally {
        setPagesLoaded(true);
      }
    };
    
    loadPages();
  }, [setPagesData]);
  
  // Genera le pagine del libro per l'interfaccia UI
  const bookPages = [
    {
      front: "book-cover",
      back: pictures[0] || "page1",
    },
  ];
  
  for (let i = 1; i < pictures.length - 1; i += 2) {
    bookPages.push({
      front: pictures[i % pictures.length],
      back: pictures[(i + 1) % pictures.length],
    });
  }
  
  if (pictures.length > 0) {
    bookPages.push({
      front: pictures[pictures.length - 1],
      back: "book-back",
    });
  }

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play().catch(e => console.log("Audio non riprodotto:", e));
  }, [page]);

  // Mostra un loader durante il caricamento dall'API
  if (!pagesLoaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="text-white">Caricamento delle pagine dall'API...</div>
      </div>
    );
  }

  return (
    <>
      <main className="pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col">
        <div className="w-full overflow-auto pointer-events-auto flex justify-center">
          <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
            {[...bookPages].map((_, index) => (
              <button
                key={index}
                className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
                  index === page
                    ? "bg-white/90 text-black"
                    : "bg-black/30 text-white"
                }`}
                onClick={() => setPage(index)}
              >
                {index === 0 ? "Copertina" : `Pagina ${index}`}
              </button>
            ))}
            <button
              className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
                page === bookPages.length
                  ? "bg-white/90 text-black"
                  : "bg-black/30 text-white"
              }`}
              onClick={() => setPage(bookPages.length)}
            >
              Retro Copertina
            </button>
          </div>
        </div>
      </main>
    </>
  );
}; 