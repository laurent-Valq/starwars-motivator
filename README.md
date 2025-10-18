# 🌌 Star Wars Motivator

Mini-app **Next.js + Tailwind + OpenAI** qui génère une citation inspirante de l’univers Star Wars.

---

## 🧱 Étape 1 – Mise en place du projet
- Initialisation du projet avec **Next.js**, **TypeScript** et **Tailwind CSS**
- Suppression du code par défaut et création d’une **landing page minimaliste**
- Mise en place de **Git** et du dépôt **GitHub**.
- Création de la branche `feat/landing-skeleton`.
- Première version du **README** et configuration du workflow.

---

## ✨ Étape 2 – Interface & Mock Quotes
Créer une interface simple et interactive pour permettre à l’utilisateur de générer une citation inspirante de l’univers Star Wars.

### 🧩 Réalisations
- Ajout d’un bouton **“Générer une citation”**.
- Intégration d’une liste de **citations simulées (mock quotes)**.
- Génération aléatoire d’une citation au clic.
- Mise en forme avec **Tailwind CSS** pour un rendu minimaliste et immersif.

### 🧠 Points techniques
- Utilisation du hook **`useState`** pour gérer la citation affichée.
- Gestion d’un **événement `onClick`** sur le bouton pour déclencher la génération.
- Structure du composant sous forme de **fonction React client-side**.

### ✅ Résultat
Une page responsive affichant un bouton et une citation différente à chaque clic.
---

## 🧩 Stack technique
Next.js • TypeScript • TailwindCSS • OpenAI API • Vercel • Git/GitHub

---


## 🚀 Étape 3 : Intégration de l’API OpenAI

### Objectif
Connecter le front-end à une route API interne pour générer en temps réel des citations inspirées de Star Wars grâce à OpenAI.

### Fichiers concernés
- `src/app/api/generate/route.ts`  
- `src/app/page.tsx`  
- `.env.local` (non versionné)

### Détails techniques
- Création d’un endpoint `/api/generate` utilisant le modèle **gpt-4o-mini**.  
- Le front appelle cette route via `fetch("/api/generate")`.  
- Gestion des erreurs 401 et 429 avec messages clairs dans la console.  
- Clé OpenAI stockée localement dans `.env.local` (jamais commitée).

### Tests
- Lancer `npm run dev`.  
- Cliquer sur **“Générer une citation”**.  
- Vérifier que la réponse renvoie une phrase motivante dans le style Star Wars.

### Résultat attendu
Une citation générée dynamiquement apparaît sous le bouton, confirmant la bonne communication front ↔ API ↔ OpenAI.

---


## 🚀 Démarrer le projet
```bash
npm install
npm run dev
