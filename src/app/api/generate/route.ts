import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
    const startAPI = Date.now();
    const prompt = "Génère une citation courte et inspirante de l'univers Star Wars. Mais n'utilise pas trop souvent les mots obscurité et ombre, ou même lumière.";
  
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
