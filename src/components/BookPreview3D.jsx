import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { Experience } from "./Experience";
import { UI } from "./UI";
import { useAtom } from "jotai";
import { pageAtom } from "./UI";

const BookPreview3D = ({ onClose }) => {
  // Reset della pagina quando si apre il visualizzatore
  const [_, setPage] = useAtom(pageAtom);
  
  useEffect(() => {
    // Resetta alla prima pagina quando si apre
    setPage(0);
    
    // Impedisci lo scroll della pagina quando il modale è aperto
    document.body.style.overflow = 'hidden';
    
    // Ripristina lo scroll quando si chiude
    return () => {
      document.body.style.overflow = '';
    };
  }, [setPage]);
  
  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Pulsante di chiusura */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-50 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
        aria-label="Chiudi anteprima"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <UI />
      <Loader />
      <Canvas 
        shadows 
        camera={{
          position: [-0.5, 1, window.innerWidth > 800 ? 4 : 9],
          fov: 45,
        }}
      >
        <color attach="background" args={['#0a0a0a']} />
        <group position-y={0}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </group>
      </Canvas>
    </div>
  );
};

export default BookPreview3D; 