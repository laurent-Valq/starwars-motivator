"use client";

import { useState } from "react";

// ⬇️ FONCTION POUR GENERER LES ETOILES
const generateStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: ['star-small', 'star-medium', 'star-large'][Math.floor(Math.random() * 3)],
    delay: Math.random() * 3
  }));
};

export default function Home() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const stars = generateStars(200); // ⬅️ LIRE LE NOMBRE D'ETOILES

  const generateQuote = async () => {
    const startFront = performance.now();
    setLoading(true);
    setShowScroll(false);
    
    try {
      const res = await fetch("/api/generate");
      console.log(`⏱️ Frontend: ${(performance.now() - startFront).toFixed(0)}ms`);
      
      if (!res.ok) throw new Error("Erreur serveur");
      const data = await res.json();
      setQuote(data.quote);
      setShowScroll(true);
    } catch (error) {
      console.error("Erreur:", error);
      setQuote("Impossible de communiquer avec la Force...");
      setShowScroll(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ⬇️ AJOUTEZ CE BLOC AVANT <main> */}
      <div className="starfield">
        {stars.map(star => (
          <div
            key={star.id}
            className={`star ${star.size}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              animationDelay: `${star.delay}s`
            }}
          />
        ))}
      </div>

      
    <main className="flex flex-col items-center justify-start pt-160 min-h-screen bg-black text-yellow-400 overflow-hidden">

      {/* ⬇️ Overlay noir AJOUTÉ ICI */}
      <div className="fixed bottom-0 left-0 w-full h-44 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none"></div>


      
      <h1 className="text-6xl font-bold tracking-widest animate-fade-in mb-8 title-crawl relative z-30 star-wars-font text-black"
          style={{ textShadow: '0 0 4px rgba(255, 232, 31, 0.5), 0 0 8px rgba(255, 232, 31, 0.25)', 
            WebkitTextStroke: '2px #FFE81F'  /* ⬅️ Contour jaune de 2px */
          }}>
        STAR WARS 
        <br />
        motivator
      </h1>
  
      <button
        onClick={generateQuote}
        disabled={loading}
        className="text-black font-bold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-300 hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative z-20"
        style={{ transform: 'perspective(500px) rotateX(40deg)', backgroundColor: '#FFE81F' }}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin">⚡</span>
            Connexion à la Force...
          </span>
        ) : (
          "Générer une citation"
        )}
      </button>
  
      {/* Container pour le défilement */}
      {showScroll && quote && (
        <div className="scroll-container">
          <div className="scroll-content">
            <p className="text-5xl leading-relaxed font-bold"
            style={{ color: '#FFE81F', textShadow: '0 0 6px rgba(255, 232, 31, 0.6), 0 0 12px rgba(255, 232, 31, 0.3)' }}>
              {quote}
            </p>
          </div>
        </div>
      )}
    </main>
    </>
  );
}