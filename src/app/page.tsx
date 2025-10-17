"use client";
import { useState } from "react";

export default function Home() {
  const mockQuotes = [
    "Que la Force soit avec toi.",
    "Fais-le ou ne le fais pas, il n’y a pas d’essai.",
    "Ton focus détermine ta réalité.",
    "Luke arrête de chialer.",
  ];

  const [quote, setQuote] = useState("");

  const generateQuote = async () => {
    try {
      const res = await fetch("/api/generate");
      if (!res.ok) throw new Error("Erreur serveur");
      const data = await res.json();
      setQuote(data.quote);
    } catch (error) {
      console.error("Erreur :", error);
      setQuote("Impossible de générer la citation.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-yellow-400 p-8">
      <h1 className="text-4xl font-bold mb-8">Star Wars Motivator</h1>

      <button
        onClick={generateQuote}
        className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
      >
        Générer une citation
      </button>

      <p className="mt-6 text-xl italic text-center">{quote}</p>
    </main>
  );
}

