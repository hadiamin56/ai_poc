const OpenAI = require("openai");
const config = require("../config/config");

async function parseInvoiceWithLLM(ocrText) {
  const { llm } = config;
  if (!llm || !llm.api_key) throw new Error("LLM API key missing in config");

  console.log("🔎 Calling OpenAI LLM for invoice parsing...");
  console.log("🔑 Using LLM key:", config.llm.api_key, "...");

  const prompt = llm.prompt_template.replace("{{text}}", ocrText);

  // Correct way to instantiate client in CommonJS
  const openai = new OpenAI({
    apiKey: llm.api_key,
  });

  const model = llm.model || "gpt-3.5-turbo";

  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0,
    });

    const rawOutput = response.choices[0].message.content.trim();

    try {
      return JSON.parse(rawOutput);
    } catch {
      return { raw_text: rawOutput };
    }
  } catch (err) {
    console.error("❌ LLM API error:", err.message);
    throw err;
  }
}

module.exports = { parseInvoiceWithLLM };
