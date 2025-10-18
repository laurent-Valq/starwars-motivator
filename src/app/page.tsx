"use client";

import { useState } from "react";

export default function Home() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate");
      if (!res.ok) throw new Error("Erreur serveur");
      const data = await res.json();
      setQuote(data.quote);
    } catch (error) {
      console.error("Erreur OpenAI :", error);
      setQuote("Impossible de communiquer avec la Force...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen space-y-6 bg-black text-yellow-400">
      <h1 className="text-5xl font-bold tracking-widest animate-fade-in">
        STAR WARS MOTIVATOR
      </h1>
  
      <button
        onClick={generateQuote}
        disabled={loading}
        className="bg-yellow-400 text-black font-bold px-6 py-2 rounded-lg shadow-md hover:bg-yellow-300 hover:scale-105 transition-transform duration-300"
      >
        {loading ? "Connexion à la Force..." : "Générer une citation"}
      </button>
  
      {quote && (
        <p className="mt-8 text-lg text-yellow-300 animate-fade-in max-w-lg">
          “{quote}”
        </p>
      )}
    </main>
  );
  
}
