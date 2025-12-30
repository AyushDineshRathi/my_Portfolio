const offlineService = require("../services/offlineService");
const geminiService = require("../services/geminiService");
const NodeCache = require("node-cache");

// Cache for Gemini results (TTL: 1 hour) -- saves API calls for repeated queries
const responseCache = new NodeCache({ stdTTL: 3600 });

async function handleChat(req, res) {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ reply: "Please say something!" });
  }

  const query = message.trim();
  console.log(`[Chat] Received: "${query}"`);

  // 1. Try Offline Matching First
  // Fuse.js returns score: 0 (perfect) to 1 (no match)
  const offlineMatch = offlineService.findBestMatch(query);
  
  // Thresholds
  const HIGH_CONFIDENCE_THRESHOLD = 0.3; // Very good match
  const LOW_CONFIDENCE_THRESHOLD = 0.6;  // Okay match (fuzzy)

  // LOGIC BRANCH 1: Strong Offline Match
  if (offlineMatch && offlineMatch.score < HIGH_CONFIDENCE_THRESHOLD) {
    console.log(`[Chat] Strong Offline Match: ${offlineMatch.intent.id} (Score: ${offlineMatch.score.toFixed(2)})`);
    return res.json({ 
      reply: offlineMatch.intent.response,
      source: "offline-high-confidence",
      intent: offlineMatch.intent.id
    });
  }

  // LOGIC BRANCH 2: Check Cache for previous Gemini result
  const cachedIntentId = responseCache.get(query.toLowerCase());
  if (cachedIntentId) {
    console.log(`[Chat] Cache Hit: ${cachedIntentId}`);
    const r = offlineService.getResponseById(cachedIntentId);
    if (r) {
      return res.json({ 
        reply: r,
        source: "cache",
        intent: cachedIntentId
      });
    }
  }

  // LOGIC BRANCH 3: Gemini Classification (if offline was weak or non-existent)
  // We only call Gemini if offline score is worse than 0.3
  try {
    console.log(`[Chat] low confidence or no match. Calling Gemini Classifier...`);
    const allIntents = offlineService.getAllIntents();
    const geminiIntentId = await geminiService.classifyIntent(query, allIntents);

    if (geminiIntentId) {
      const response = offlineService.getResponseById(geminiIntentId);
      if (response) {
        console.log(`[Chat] Gemini classified as: ${geminiIntentId}`);
        
        // Cache this result
        responseCache.set(query.toLowerCase(), geminiIntentId);

        return res.json({
          reply: response,
          source: "gemini",
          intent: geminiIntentId
        });
      }
    }
  } catch (err) {
    console.error("[Chat] Gemini error:", err);
    // Proceed to fallback
  }

  // LOGIC BRANCH 4: Fallback (Weak Offline Match or Generic)
  if (offlineMatch && offlineMatch.score < LOW_CONFIDENCE_THRESHOLD) {
     console.log(`[Chat] Fallback to Weak Offline Match: ${offlineMatch.intent.id}`);
     return res.json({
       reply: offlineMatch.intent.response,
       source: "offline-fallback",
       intent: offlineMatch.intent.id
     });
  }

  // LOGIC BRANCH 5: No clue
  console.log("[Chat] No match found.");
  return res.json({
    reply: "I'm not sure about that. Try asking about Ayush's projects, skills, or contact info!",
    source: "none"
  });
}

module.exports = { handleChat };
