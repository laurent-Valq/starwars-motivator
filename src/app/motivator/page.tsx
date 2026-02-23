"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

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
  const [isWriting, setIsWriting] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [stars, setStars] = useState<any[]>([]);
  const [language, setLanguage] = useState<"fr" | "en">("fr");
  const [isLiked, setIsLiked] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  
  const ambianceRef = useRef<HTMLAudioElement | null>(null);
  const quoteRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  

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
  
  // Cleanup: arrêter toutes les musiques quand on quitte la page
  useEffect(() => {
    return () => {
      if (ambianceRef.current) {
        ambianceRef.current.pause();
        ambianceRef.current.currentTime = 0;
      }
      if (quoteRef.current) {
        quoteRef.current.pause();
        quoteRef.current.currentTime = 0;
      }
      // Nettoyer les timeouts
      timeoutRefs.current.forEach(t => clearTimeout(t));
    }
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch("/api/auth/session")
      const session = await res.json()
      setIsLoggedIn(!!session?.user)

      // Vérifier si admin
      if (session?.user?.email) {
        const userRes = await fetch("/api/user/role", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: session.user.email })
        })
        const userData = await userRes.json()
        setIsAdmin(userData.role === "admin")
      }
    }
    checkSession()
  }, [])

  const handleLike = async () => {
    if (!isLoggedIn) return
  
    const res = await fetch("/api/quotes/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quote })
    })
  
    const data = await res.json()
    setIsLiked(data.liked)
  }

  const generateQuote = async () => {
    if (isWriting || loading) return;
    setIsLiked(false)
    // Clear old timeouts
    timeoutRefs.current.forEach(t => clearTimeout(t));
    timeoutRefs.current = [];
    setIsWriting(true);
    const startFront = performance.now();
    setLoading(true);
    setShowScroll(false);
    
    // Arrêter l'ambiance et lancer la musique de citation
    ambianceRef.current?.pause();
    if (quoteRef.current && isSoundOn) {
      quoteRef.current.currentTime = 0;
      quoteRef.current.play();
    }
    
    setIsScrolling(true);

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
      
      const t1 = setTimeout(() => {
        setShowScroll(true);
      }, 5000);

      const t2 = setTimeout(() => {
        setShowScroll(false);
        setIsScrolling(false);
        quoteRef.current?.pause();
        if (isSoundOn) {
          ambianceRef.current?.play();
        }
        setIsWriting(false);
        setLoading(false);
      }, 50000);
      timeoutRefs.current = [t1, t2];
      
    } catch (error) {
      console.error("Erreur:", error);
      setQuote(language === "fr"
        ? "Impossible de communiquer avec la Force..."
        : "Unable to communicate with the Force..."
      );
      
      const t1 = setTimeout(() => {
        setShowScroll(true);
      }, 5000);

      const t2 = setTimeout(() => {
        setShowScroll(false);
        setIsScrolling(false);
        quoteRef.current?.pause();
        if (isSoundOn) {
          ambianceRef.current?.play();
        }
        setIsWriting(false);
        setLoading(false);
      }, 50000);
      timeoutRefs.current = [t1, t2];
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

        <h1 className={`text-6xl font-bold tracking-widest animate-fade-in mb-8 title-crawl relative z-30 star-wars-font text-black transition-opacity duration-5000 px-8 ${showScroll ? 'opacity-20' : 'opacity-100'}`}
            style={{ 
              textShadow: '0 0 4px rgba(255, 232, 31, 0.5), 0 0 8px rgba(255, 232, 31, 0.25)', 
              WebkitTextStroke: '2px #FFE81F'
            }}>
          STAR WARS 
          <br />
          motivator
        </h1>

        {/* Home Button - Top Left */}
        <div className="absolute top-6 left-6">
          <Link 
            href="/"
            className="px-6 py-3 bg-cyan-500/20 backdrop-blur-sm text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/30 transition-colors border-2 border-cyan-400"
            style={{ boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)' }}
          >
            ← Home
          </Link>
        </div>

        {/* Language and Sound Toggle Switches - Top Right */}
        <div className="absolute top-6 right-6 flex flex-col gap-4">
          {/* 🌍 Language Toggle Switch */}
          <button
            onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
            disabled={loading || isWriting}
            className={`relative w-20 h-10 bg-yellow-300 rounded-full flex items-center justify-between px-2 transition-all duration-300 shadow-md border border-yellow-300 ${
              loading || isWriting ? "opacity-50 cursor-not-allowed" : ""
            }`}
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

          {/* 🔊 Sound Toggle Switch */}
          <button
            onClick={() => {
              if (isSoundOn) {
                ambianceRef.current?.pause();
                quoteRef.current?.pause();
                setIsSoundOn(false);
              } else {
                if (isWriting || loading) {
                  quoteRef.current?.play();
                } else if (quote) {  // ← Vérifie qu'il y a une quote générée
                  ambianceRef.current?.play();
                }
                setIsSoundOn(true);
              }
            }}
            className="relative w-20 h-10 bg-yellow-300 rounded-full flex items-center justify-between px-2 transition-all duration-300 shadow-md border border-yellow-300"
          >
            {/* Sound ON */}
            <span className="text-black text-lg">
              🔊
            </span>
            
            {/* Sound OFF */}
            <span className="text-black text-lg">
              🔇
            </span>
            
            {/* Sliding indicator */}
            <span
              className={`absolute top-1 w-8 h-8 bg-black rounded-full shadow-lg transform transition-all duration-300 ${
                isSoundOn ? "translate-x-0" : "translate-x-8"
              }`}
            ></span>
          </button>
        </div>


    
        <button
          onClick={generateQuote}
          disabled={loading || isWriting}
          className={`
            text-black font-bold px-6 py-3 rounded-lg shadow-md relative z-20
            transition-transform duration-300
            ${loading || isWriting
              ? "opacity-18 cursor-not-allowed bg-[#FFE81F]"
              : "hover:bg-yellow-300 hover:scale-105 bg-[#FFE81F]"}
          `}
          style={{ transform: 'perspective(500px) rotateX(40deg)' }}
        >
          {loading || isWriting ? (
            <span className="flex items-center gap-2">
              <span className="animate-pulse"></span>
              {language === "fr"
                ? "Méditer tu dois, jeune padawan...écoute la Force..."
                : "Meditate you must, young padawan...listen to the Force..."}
            </span>
          ) : (
            language === "fr" ? "Générer une citation" : "Generate a quote"
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

        {/* Bouton Like - visible uniquement si connecté et quote générée */}
        {quote && isLoggedIn && !isAdmin &&(
          <button
            onClick={handleLike}
            className="fixed bottom-28 right-10 text-4xl transition-transform hover:scale-125 z-50"
            title={isLiked ? "Unlike" : "Like"}
          >
            {isLiked ? "❤️" : "🤍"}
          </button>
        )}

        {isScrolling && (
          <button
            onClick={() => {
              timeoutRefs.current.forEach(t => clearTimeout(t));
              timeoutRefs.current = [];
              setShowScroll(false);
              setIsScrolling(false);
              setIsWriting(false);
              setQuote("");
              if (quoteRef.current) {
                quoteRef.current.pause();
                quoteRef.current.currentTime = 0;
              }
              if (isSoundOn) {
                ambianceRef.current?.play();
              }
              setLoading(false);
            }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#FFE81F] hover:bg-[#FFE81F] text-black font-bold px-5 py-3 rounded-lg shadow-lg transition-all duration-300 z-50 opacity-60 hover:opacity-90"
            style={{ transform: 'perspective(500px) rotateX(40deg)' }}
          >
            {language === "fr" ? "La force est puissante en moi ⏏︎" : "The force is strong in me ⏏︎"}
          </button>
        )}
      </main>
    </>
  );
}