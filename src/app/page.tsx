"use client";

import { useState } from "react";

export default function Home() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

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
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-yellow-400 overflow-hidden">
      <h1 className="text-5xl font-bold tracking-widest animate-fade-in mb-8">
        STAR WARS MOTIVATOR
      </h1>
  
      <button
  onClick={generateQuote}
  disabled={loading}
  className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-300 hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10"
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
            <p className="text-2xl text-yellow-300 leading-relaxed">
              {quote}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}