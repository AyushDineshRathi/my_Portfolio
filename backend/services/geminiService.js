const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-1.5-flash" }) : null;

/**
 * Uses Gemini to classify the user's query into one of the available intents.
 * @param {string} query - The user's message
 * @param {Array} intents - List of { id, keywords }
 * @returns {Promise<string|null>} - The best matching Intent ID or null
 */
async function classifyIntent(query, intents) {
  if (!model) {
    console.warn("Gemini API not configured.");
    return null;
  }

  // Construct a concise prompt
  // limiting to top 20 possible intents if list is huge (though our list is small)
  // or sending specific categories if needed. For now, send key ones.
  const intentListString = intents
    .map((i) => `- ID: "${i.id}", Keywords: [${i.keywords.join(", ")}]`)
    .join("\n");

  const prompt = `
    You are an intent classifier for a portfolio chatbot.
    User Query: "${query}"
    
    Match this query to the BEST single intent ID from the list below.
    If the user is asking about something unrelated or if you are unsure, return "unknown".
    
    Do NOT generate a conversational response. ONLY return the ID string.
    
    Available Intents:
    ${intentListString}
    
    Best Intent ID:
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    
    // Cleanup response (remove quotes or markdown)
    const cleanId = text.replace(/["`]/g, "").trim();
    
    if (cleanId.toLowerCase().includes("unknown")) return null;
    
    return cleanId;
  } catch (error) {
    console.error("Gemini classification failed:", error);
    return null;
  }
}

module.exports = {
  classifyIntent
};
