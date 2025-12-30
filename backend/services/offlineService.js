const Fuse = require("fuse.js");
const profileData = require("../data/profileData");

// Flatten profile data into searchable "intents"
const intents = [];

// Helper to add intent
function addIntent(id, keywords, response, category, scoreBoost = 1.0) {
  intents.push({
    id,
    keywords,
    response,
    category,
    boost: scoreBoost, // Used for manual weighting if needed
  });
}

// === 1. Greetings & Meta ===
addIntent(
  "greeting",
  ["hi", "hello", "hey", "good morning", "greetings"],
  `Hi! I'm ${profileData.basicInfo.name}'s portfolio assistant. You can ask about his skills, projects, education, or experience.`,
  "meta"
);

addIntent(
  "intro",
  ["who are you", "who is ayush", "about ayush", "tell me about yourself", "intro", "introduction"],
  `I'm ${profileData.basicInfo.name}, ${profileData.basicInfo.title}. ${profileData.basicInfo.bio[0]}`,
  "meta"
);

addIntent(
  "contact",
  ["contact", "email", "reach out", "connect", "phone", "hire"],
  `You can reach me at ${profileData.basicInfo.email}. Check out the social links on the site to connect also!`,
  "meta"
);

// === 2. Projects ===
profileData.projects.forEach((p) => {
  const keywords = [
    p.name,
    p.id,
    ...(p.techStack || []),
    "project",
    "work",
    "built",
  ];
  const response = `${p.name}\n\n${p.shortDescription}\n\nTech Stack: ${p.techStack.join(", ")}.`;
  addIntent(`project-${p.id}`, keywords, response, "project");
});

// General Project Inquiry
addIntent(
  "projects-all",
  ["projects", "what have you built", "show me your work", "portfolio"],
  `I've worked on several projects like: ${profileData.projects.map(p => p.name).join(", ")}. Ask about any specific one!`,
  "project"
);

// === 3. Skills ===
// Group by category first
profileData.skills.forEach((cat) => {
  const allSkills = cat.items.map((s) => s.name).join(", ");
  const keywords = [cat.category, ...cat.items.map((s) => s.name)];
  
  addIntent(
    `skill-cat-${cat.category}`,
    keywords,
    `In ${cat.category}, I work with: ${allSkills}.`,
    "skill"
  );
});

addIntent(
  "skills-all",
  ["skills", "technologies", "tech stack", "what do you know"],
  "I have skills in Python, Machine Learning, Web Development, and more. Ask about a specific technology!",
  "skill"
);

// === 4. Experience & Education ===
addIntent(
  "experience",
  ["experience", "work history", "internships", "jobs"],
  profileData.experience.length > 0 
    ? "I have experience working as " + profileData.experience.map(e => e.role).join(", ") 
    : "I focus mainly on projects and research, but I'm open to opportunities!",
  "experience"
);

addIntent(
  "education",
  ["education", "college", "degree", "university", "study", "cgpa"],
  `I am currently pursuing ${profileData.education[0].degree} at ${profileData.education[0].institution}.`,
  "education"
);

// === 5. FAQ ===
profileData.faq.forEach((item) => {
  addIntent(`faq-${item.id}`, item.patterns, item.answer, "faq");
});


// === Fuse Setup ===
const fuseOptions = {
  isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  keys: ["keywords"],
  threshold: 0.5, // Relaxed threshold
  ignoreLocation: true, // IMPORTANT: Match anywhere in the string
  minMatchCharLength: 3,
};

const fuse = new Fuse(intents, fuseOptions);

/**
 * Normalizes text: lowercase, remove punctuation.
 */
function normalize(text) {
  return text.toLowerCase().replace(/[^\w\s]/g, "");
}

/**
 * Find best matching intent for a query.
 * Strategies:
 * 1. Exact/Partial Keyword Token Match (Highest Priority)
 * 2. Fuzzy Match (Fuse.js)
 * @param {string} query 
 * @returns {object|null} { intent, score } or null
 */
function findBestMatch(query) {
  const normQuery = normalize(query);
  const words = normQuery.split(/\s+/);
  
  // Strategy 1: Direct Keyword Token Match (Best for "How can I contact you")
  // We check if any of the intent's keywords appear as a whole word in the user's query.
  // We prioritize "longer" and "specific" keywords.
  
  let bestKeywordMatch = null;
  
  for (const intent of intents) {
    for (const keyword of intent.keywords) {
      const normKeyword = normalize(keyword);
      
      // Check if keyword exists in query
      if (normQuery.includes(normKeyword)) {
        // Boost score if it's a whole word match or valid substring
        // We assign a "simulated fuse score"
        // 0.01 = Perfect match
        // 0.1 = Good match
        
        let score = 0.5; // default fallback
        
        // Whole word check
        if (words.includes(normKeyword)) {
          score = 0.05; // Excellent
        } else {
          score = 0.2; // Substring match
        }
        
        if (!bestKeywordMatch || score < bestKeywordMatch.score) {
          bestKeywordMatch = { intent, score };
        }
      }
    }
  }
  
  // If we found a very strong keyword match, return it
  if (bestKeywordMatch && bestKeywordMatch.score < 0.1) {
    return bestKeywordMatch;
  }
  
  // Strategy 2: Fuse.js Fuzzy Search (For typos like "contat")
  const results = fuse.search(query);
  if (results.length > 0) {
    const fuseMatch = {
      intent: results[0].item,
      score: results[0].score,
    };
    
    // If we have both, prefer the better score
    if (bestKeywordMatch && bestKeywordMatch.score < fuseMatch.score) {
      return bestKeywordMatch;
    }
    return fuseMatch;
  }
  
  return bestKeywordMatch || null;
}

/**
 * Get all intents (for Gemini to select from)
 */
function getAllIntents() {
  return intents.map(i => ({
    id: i.id,
    keywords: i.keywords.slice(0, 5) // Limit keywords to save tokens
  }));
}

/**
 * Get response by ID
 */
function getResponseById(id) {
  const found = intents.find(i => i.id === id);
  return found ? found.response : null;
}

module.exports = {
  findBestMatch,
  getAllIntents,
  getResponseById
};
