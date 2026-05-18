import dotenv from "dotenv";
dotenv.config();

const openRouterurl = "https://openrouter.ai/api/v1/chat/completions";
const model = "openai/gpt-4o-mini";

export const generateResponse = async (prompt) => {
  const apiKey = (process.env.OPEN_ROUTER_API_KEY || '').trim();
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is missing or empty in Server/.env");
  }

  const res = await fetch(openRouterurl, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "X-Title": "Website Builder"
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: "Respond with ONLY valid JSON object. No other text." },
        { role: "user", content: prompt }
      ],
      temperature: 0.1,
      max_tokens: 6000
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter API error: ${err}`);
  }

  const data = await res.json();

  if (!data?.choices?.[0]?.message?.content) {
    throw new Error("Invalid OpenRouter response structure");
  }

  return data.choices[0].message.content;
};