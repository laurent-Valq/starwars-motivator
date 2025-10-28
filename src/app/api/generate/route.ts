import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    const startAPI = Date.now();
    const { language } = await req.json();

    const prompt = language === "fr" 
    ? "Génère une citation courte et inspirante de l'univers Star Wars. Mais n'utilise pas trop souvent les mots obscurité et ombre, ou même lumière." 
    : "Generate a short and inspiring quote from the Star Wars universe. But don't use the words darkness and shadow too often, or even light.";
  
    try {
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 20,
        temperature: 0.7,
      });
  
      console.log(`⏱️ Temps API: ${Date.now() - startAPI}ms`);
  
      const quote = response.choices[0].message.content;
      return Response.json({ quote });
    } catch (error) {
      console.error("Erreur:", error);
      return Response.json({ error: 'Erreur' }, { status: 500 });
    }
  }
