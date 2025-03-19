import React, { useState, useEffect, useRef } from 'react';

/**
 * Componente per la gestione degli effetti sonori durante lo sfoglio delle pagine
 * Fornisce vari suoni di sfoglio per un'esperienza più realistica
 */
const BookSound = ({ onPageTurn, soundEnabled = true }) => {
  const [isMuted, setIsMuted] = useState(!soundEnabled);
  const [volume, setVolume] = useState(0.5);
  
  // Utilizziamo più suoni diversi per maggiore varietà e realismo
  const pageTurnSounds = [
    '/sounds/page-flip-1.mp3',
    '/sounds/page-flip-2.mp3',
    '/sounds/page-flip-3.mp3',
    '/sounds/page-flip-4.mp3',
  ];
  
  // Suono per l'apertura del libro
  const bookOpenSound = '/sounds/book-open.mp3';
  
  // Riferimenti agli elementi audio
  const audioRefs = useRef([]);
  const openAudioRef = useRef(null);
  
  // Inizializzazione dei suoni
  useEffect(() => {
    // Precarica i suoni di sfoglio pagina
    audioRefs.current = pageTurnSounds.map((sound, index) => {
      const audio = new Audio(sound);
      audio.volume = volume;
      return audio;
    });
    
    // Precarica il suono di apertura libro
    openAudioRef.current = new Audio(bookOpenSound);
    openAudioRef.current.volume = volume;
    
    // Cleanup quando il componente viene smontato
    return () => {
      audioRefs.current.forEach(audio => {
        audio.pause();
        audio.src = '';
      });
      
      if (openAudioRef.current) {
        openAudioRef.current.pause();
        openAudioRef.current.src = '';
      }
    };
  }, []);
  
  // Aggiorna il volume quando cambia
  useEffect(() => {
    audioRefs.current.forEach(audio => {
      audio.volume = isMuted ? 0 : volume;
    });
    
    if (openAudioRef.current) {
      openAudioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);
  
  // Gestisce il cambio pagina e riproduce un suono casuale
  useEffect(() => {
    if (onPageTurn) {
      // Sovrascrivi la funzione onPageTurn per aggiungere il suono
      const originalOnPageTurn = onPageTurn;
      onPageTurn = () => {
        playPageTurnSound();
        if (typeof originalOnPageTurn === 'function') {
          originalOnPageTurn();
        }
      };
    }
  }, [onPageTurn]);
  
  // Funzione per riprodurre un suono casuale di sfoglio pagina
  const playPageTurnSound = () => {
    if (isMuted) return;
    
    // Seleziona un suono casuale tra quelli disponibili
    const randomIndex = Math.floor(Math.random() * audioRefs.current.length);
    const audio = audioRefs.current[randomIndex];
    
    // Riproduce il suono dall'inizio
    audio.currentTime = 0;
    audio.play().catch(error => {
      console.warn("Errore durante la riproduzione del suono:", error);
    });
  };
  
  // Funzione per riprodurre il suono di apertura del libro
  const playBookOpenSound = () => {
    if (isMuted || !openAudioRef.current) return;
    
    openAudioRef.current.currentTime = 0;
    openAudioRef.current.play().catch(error => {
      console.warn("Errore durante la riproduzione del suono di apertura:", error);
    });
  };
  
  // Esponi le funzioni al componente genitore
  if (typeof window !== 'undefined') {
    window.playPageTurnSound = playPageTurnSound;
    window.playBookOpenSound = playBookOpenSound;
  }
  
  // Alterna lo stato muto/non muto
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  // Cambia il volume
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };
  
  return (
    <div className="book-sound-control">
      <button 
        onClick={toggleMute}
        className="p-2 rounded-full hover:bg-white/20 transition-colors"
        aria-label={isMuted ? "Attiva suono" : "Disattiva suono"}
        title={isMuted ? "Attiva suono" : "Disattiva suono"}
      >
        {isMuted ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button>
      
      {/* Controllo volume (opzionale - mostrabile in un menu) */}
      <div className="hidden absolute top-full right-0 mt-2 p-2 bg-white rounded shadow z-10">
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.1" 
          value={volume} 
          onChange={handleVolumeChange}
          className="w-24"
        />
      </div>
    </div>
  );
};

export default BookSound; 