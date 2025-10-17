import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  const prompt = "Génère une courte citation inspirante dans le style Star Wars.";

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const quote = response.choices[0].message.content;
    return new Response(JSON.stringify({ quote }), { status: 200 });
  } catch (error) {
    console.error("Erreur OpenAI :", error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la génération.' }), { status: 500 });
  }
}
