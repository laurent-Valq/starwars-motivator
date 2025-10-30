"use client";

import { useState, useEffect, useRef } from "react";

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
  const [stars, setStars] = useState<any[]>([]);
  const [language, setLanguage] = useState<"fr" | "en">("fr");
  
  const ambianceRef = useRef<HTMLAudioElement | null>(null);
  const quoteRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setStars(generateStars(200));
    
    // Musique d'ambiance
    ambianceRef.current = new Audio('/starwars-ambiance.mp3');
    ambianceRef.current.loop = true;
    ambianceRef.current.volume = 0.2;
    {/*ambianceRef.current.play();*/}
    
    // Musique de citation
    quoteRef.current = new Audio('/starwars-theme.mp3');
    quoteRef.current.volume = 0.5;
  }, []);

  const generateQuote = async () => {
    const startFront = performance.now();
    setLoading(true);
    setShowScroll(false);
    
    // Arrêter l'ambiance et lancer la musique de citation
    ambianceRef.current?.pause();
    if (quoteRef.current) {
      quoteRef.current.currentTime = 0;
      quoteRef.current.play();
    }
    
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language }),
      });
      console.log(`⏱️ Frontend: ${(performance.now() - startFront).toFixed(0)}ms`);
      
      if (!res.ok) throw new Error("Erreur serveur");
      const data = await res.json();
      setQuote(data.quote);
      
      setTimeout(() => {
        setShowScroll(true);
      }, 5000);

      setTimeout(() => {
        setShowScroll(false);
        quoteRef.current?.pause();
        ambianceRef.current?.play();
      }, 50000);
      
    } catch (error) {
      console.error("Erreur:", error);
      setQuote(language === "fr"
        ? "Impossible de communiquer avec la Force..."
        : "Unable to communicate with the Force..."
      );
      
      setTimeout(() => {
        setShowScroll(true);
      }, 5000);

      setTimeout(() => {
        setShowScroll(false);
        quoteRef.current?.pause();
        ambianceRef.current?.play();
      }, 50000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {stars.length > 0 && (
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
      )}

      <main className="flex flex-col items-center justify-start pt-160 min-h-screen bg-black text-yellow-400 overflow-hidden">

        <div className="fixed bottom-0 left-0 w-full h-44 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none"></div>

        <h1 className={`text-6xl font-bold tracking-widest animate-fade-in mb-8 title-crawl relative z-30 star-wars-font text-black transition-opacity duration-5000 ${showScroll ? 'opacity-20' : 'opacity-100'}`}
            style={{ 
              textShadow: '0 0 4px rgba(255, 232, 31, 0.5), 0 0 8px rgba(255, 232, 31, 0.25)', 
              WebkitTextStroke: '2px #FFE81F'
            }}>
          STAR WARS 
          <br />
          motivator
        </h1>

        {/* 🌍 Language Toggle Switch */}
        <div className="absolute top-6 right-6">
          <button
            onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
            className="relative w-20 h-10 bg-yellow-300 rounded-full flex items-center justify-between px-2 transition-all duration-300 shadow-md border border-yellow-300"
          >
            {/* Drapeau FR */}
            <span className={`text-black text-lg transition-opacity duration-300 ${
              language === "fr" ? "opacity-100" : "opacity-100"
            }`}>
              🇫🇷
            </span>
            
            {/* Drapeau EN */}
            <span className={`text-black text-lg transition-opacity duration-300 ${
              language === "en" ? "opacity-100" : "opacity-100"
            }`}>
              🇬🇧
            </span>
            
            {/* Pastille coulissante */}
            <span
              className={`absolute top-1 w-8 h-8 bg-black rounded-full shadow-lg transform transition-all duration-300 ${
                language === "fr" ? "translate-x-0" : "translate-x-8"
              }`}
            ></span>
          </button>
        </div>


    
        <button
          onClick={generateQuote}
          disabled={loading}
          className="text-black font-bold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-300 hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative z-20"
          style={{ transform: 'perspective(500px) rotateX(40deg)', backgroundColor: '#FFE81F' }}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⚡</span>
              {language === "fr" ? "Connexion à la Force..." : "Connecting to the Force..."}
              {/*Connexion à la Force... */}
            </span>
          ) : (
            language === "fr" 
              ? "Générer une citation" 
              : "Generate a quote"
          )}
        </button>
    
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