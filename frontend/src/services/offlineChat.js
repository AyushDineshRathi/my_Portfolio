// src/services/offlineChat.js
// Smarter offline assistant that uses your full profileData

import { profileData } from "../data/profileData.js";

function containsGreeting(text) {
  const lower = normalize(text);
  const words = lower.split(/\W+/); // split on non-letters
  return (
    words.includes("hi") || words.includes("hello") || words.includes("hey")
  );
}

function normalize(str) {
  return str.toLowerCase();
}

// Simple helper to check if any keyword appears in the text
function includesAny(text, keywords) {
  const lower = normalize(text);
  return keywords.some((k) => lower.includes(k));
}

// Try to find a project by fuzzy matching its name or id in the question
function findProjectByText(text) {
  const lower = normalize(text);
  for (const project of profileData.projects || []) {
    if (
      lower.includes(project.name.toLowerCase()) ||
      lower.includes((project.id || "").toLowerCase())
    ) {
      return project;
    }
  }
  return null;
}

// Build a nice summary of all skills
function summarizeSkills() {
  const { skills } = profileData;
  if (!skills || !skills.length) return "My skills are not added yet.";

  const lines = skills.map((cat) => {
    const names = cat.items.map((s) => s.name).join(", ");
    return `${cat.category}: ${names}`;
  });

  return lines.join("\n");
}

// Find skills in a specific category based on keywords in the question
function skillsByCategory(text) {
  const { skills } = profileData;
  if (!skills || !skills.length) return null;
  const lower = normalize(text);

  for (const cat of skills) {
    const catName = cat.category.toLowerCase();
    if (lower.includes(catName)) {
      const names = cat.items.map((s) => s.name).join(", ");
      return `Here are my ${cat.category} skills: ${names}.`;
    }

    if (
      (lower.includes("web") || lower.includes("frontend")) &&
      catName.includes("web")
    ) {
      const names = cat.items.map((s) => s.name).join(", ");
      return `For web development, I use: ${names}.`;
    }

    if (
      (lower.includes("ml") ||
        lower.includes("machine learning") ||
        lower.includes("deep learning")) &&
      (catName.includes("machine") || catName.includes("deep"))
    ) {
      const names = cat.items.map((s) => s.name).join(", ");
      return `For machine learning and deep learning, I use: ${names}.`;
    }

    if (
      (lower.includes("nlp") || lower.includes("language")) &&
      catName.includes("nlp")
    ) {
      const names = cat.items.map((s) => s.name).join(", ");
      return `For NLP, I use: ${names}.`;
    }
  }

  return null;
}

// Answer about a specific technology mentioned
function skillsByTech(text) {
  const { skills } = profileData;
  if (!skills || !skills.length) return null;
  const lower = normalize(text);

  for (const cat of skills) {
    for (const skill of cat.items) {
      const skillName = skill.name.toLowerCase();
      if (lower.includes(skillName)) {
        return `${
          skill.name
        } is one of the technologies I use as part of my ${cat.category.toLowerCase()} skills.`;
      }
    }
  }
  return null;
}

// Answer from manual FAQ entries
function answerFromFAQ(text) {
  const { faq } = profileData;
  if (!faq || !faq.length) return null;
  const lower = normalize(text);

  for (const item of faq) {
    const patterns = item.patterns || [];
    if (includesAny(lower, patterns)) {
      return item.answer;
    }
  }
  return null;
}

export function offlineAnswer(message) {
  const text = normalize(message);
  const {
    basicInfo,
    skills,
    projects,
    experience,
    education,
    achievements,
    resumeMeta,
    strengths,
    interests,
    languagesSpoken,
    extracurriculars,
  } = profileData;

  // 0. Greetings
  if (containsGreeting(message) && !includesAny(text, ["who", "about"])) {
    return `Hi! I'm ${basicInfo.name}'s portfolio assistant. You can ask about his skills, projects, education, or experience.`;
  }

  // 1. About / intro
  if (
    includesAny(text, [
      "who are you",
      "who is ayush",
      "about you",
      "about ayush",
      "introduce",
      "tell me about yourself",
      "tell me about ayush",
      "your background",
      "summary about ayush",
      "short intro",
    ])
  ) {
    const bioText = basicInfo.bio.join(" ");
    const metaLine = resumeMeta?.academicStatus
      ? `He is currently ${resumeMeta.academicStatus}. `
      : "";
    return `I'm ${basicInfo.name}, ${basicInfo.title} based in ${basicInfo.location}.\n\n${metaLine}${bioText}`;
  }

  // 1a. "Give me a summary" / "resume summary"
  if (
    includesAny(text, [
      "resume summary",
      "profile summary",
      "summary of your profile",
      "about in short",
    ])
  ) {
    if (resumeMeta?.portfolioSummary) {
      return resumeMeta.portfolioSummary;
    }
    const bioText = basicInfo.bio.join(" ");
    return bioText;
  }

  // 2. What are you working on / current focus
  if (
    includesAny(text, [
      "what are you working on",
      "current work",
      "current project",
      "right now",
      "these days",
      "currently",
      "what are you doing these days",
    ])
  ) {
    const featured = projects?.filter((p) => p.featured) || [];
    if (!featured.length) {
      return "I'm currently exploring machine learning, NLP, and web development projects.";
    }
    const names = featured.map((p) => p.name).join(", ");
    return `I'm currently focused on projects like: ${names}. These involve accessibility, sign language, and machine learning.`;
  }

  // 3. Skills – general
  if (
    includesAny(text, [
      "skills",
      "tech stack",
      "technologies",
      "what do you know",
      "what technologies",
      "stack",
    ])
  ) {
    const summary = summarizeSkills();
    return `Here are some of my main skills:\n\n${summary}`;
  }

  // 3a. Skills – by category
  const catAnswer = skillsByCategory(text);
  if (catAnswer) {
    return catAnswer;
  }

  // 3b. Skills – by specific tech mention
  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function skillsByTech(text) {
    const { skills } = profileData;
    if (!skills || !skills.length) return null;
    const lower = normalize(text);

    for (const cat of skills) {
      for (const skill of cat.items) {
        const nameLower = skill.name.toLowerCase();

        // Avoid one-letter skills like "C" causing false matches everywhere
        if (nameLower.length <= 2) continue;

        const pattern = new RegExp(`\\b${escapeRegExp(nameLower)}\\b`);
        if (pattern.test(lower)) {
          return `${
            skill.name
          } is one of the technologies I use as part of my ${cat.category.toLowerCase()} skills.`;
        }
      }
    }
    return null;
  }

  // 4. Strengths
  if (
    includesAny(text, [
      "strengths",
      "strength",
      "what are you good at",
      "strong points",
    ])
  ) {
    if (!strengths || !strengths.length) {
      return "I haven't explicitly listed my strengths, but I enjoy solving complex problems and building end-to-end ML and web projects.";
    }
    return `Some of my key strengths are:\n\n- ${strengths.join("\n- ")}`;
  }

  // 5. Interests / domains
  if (
    includesAny(text, [
      "interests",
      "interest",
      "domains",
      "areas you like",
      "what do you like working on",
      "what domain",
    ])
  ) {
    if (!interests || !interests.length) {
      return "I'm mainly interested in machine learning, NLP, and web development.";
    }
    return `I'm particularly interested in:\n\n- ${interests.join("\n- ")}`;
  }

  // 6. Languages spoken
  if (
    includesAny(text, [
      "languages you speak",
      "speak",
      "spoken languages",
      "which languages do you speak",
      "what languages you know",
    ])
  ) {
    if (!languagesSpoken || !languagesSpoken.length) {
      return "I speak English and Hindi.";
    }
    return `I speak:\n\n- ${languagesSpoken.join("\n- ")}`;
  }

  // 7. CGPA / academics
  if (
    includesAny(text, [
      "cgpa",
      "pointer",
      "grade",
      "grades",
      "academic performance",
    ])
  ) {
    if (resumeMeta?.cgpa) {
      return `My current CGPA is ${resumeMeta.cgpa}.`;
    }
    return "I haven't listed my CGPA here, but I maintain a good academic record alongside projects.";
  }

  // 8. Year / batch / graduation
  if (
    includesAny(text, [
      "which year",
      "what year",
      "year of study",
      "semester",
      "sem",
      "graduation year",
      "passing year",
      "batch",
    ])
  ) {
    if (resumeMeta?.academicStatus || resumeMeta?.graduationYear) {
      const status = resumeMeta.academicStatus
        ? `I am currently ${resumeMeta.academicStatus}. `
        : "";
      const grad = resumeMeta.graduationYear
        ? `My expected graduation year is ${resumeMeta.graduationYear}.`
        : "";
      return status + grad;
    }
    return "I'm currently pursuing my degree in computer science.";
  }

  // 9. Projects – specific project by name
  const matchedProject = findProjectByText(text);
  if (matchedProject) {
    const tech = matchedProject.techStack.join(", ");
    const highlights = matchedProject.highlights?.join(" ") || "";
    return `${matchedProject.name}\n\n${
      matchedProject.shortDescription
    }\n\nCategory: ${
      matchedProject.category
    }\nTechnologies: ${tech}\n\nHighlights: ${
      highlights || "I can share more in a conversation."
    }`;
  }

  // 9a. Questions that mention "sign language" in general
  if (includesAny(text, ["sign language", "sign-language", "signlang"])) {
    const signProjects =
      projects?.filter((p) =>
        (p.category || "").toLowerCase().includes("accessibility")
      ) ||
      projects ||
      [];
    if (!signProjects.length) {
      return "I have been working on sign language related ideas, but they are not listed as projects here yet.";
    }
    const names = signProjects.map((p) => p.name).join(", ");
    return `I have worked on sign language-related projects such as: ${names}.\nYou can ask about any of them by name for more details.`;
  }

  // 9b. Projects – general
  if (includesAny(text, ["project", "projects", "work have you done"])) {
    if (!projects || !projects.length) {
      return "I have some projects, but they are not listed yet on this site.";
    }
    const names = projects.map((p) => p.name).join(", ");
    return `Some of my key projects are: ${names}.\n\nAsk about any one of them by name for more details.`;
  }

  // 10. Experience
  if (includesAny(text, ["experience", "work experience", "intern"])) {
    if (!experience || !experience.length) {
      return "I don't have formal work experience listed yet, but I have been actively working on projects and learning through them.";
    }
    const lines = experience.map(
      (e) =>
        `${e.role} at ${e.organization} (${e.start} – ${e.end || "Present"})`
    );
    const bullets = lines.join("\n");
    return `Here is a summary of my experience:\n\n${bullets}\n\nYou can ask about any specific role for more details.`;
  }

  // 11. Education
  if (
    includesAny(text, [
      "education",
      "study",
      "studies",
      "college",
      "university",
      "btech",
      "degree",
    ])
  ) {
    if (!education || !education.length) {
      return "My education details are not added yet.";
    }
    const edu = education[0];
    const details = edu.details?.join(" ") || "";
    return `I'm pursuing ${edu.degree} at ${edu.institution} in ${
      edu.location
    } (${edu.startYear} – ${edu.endYear || "Present"}).\n\n${details}`;
  }

  // 12. Achievements / Certifications
  if (
    includesAny(text, [
      "achievement",
      "achievements",
      "certification",
      "certifications",
      "awards",
    ])
  ) {
    if (!achievements || !achievements.length) {
      return "I haven't listed any achievements or certifications here yet, but I am continuously learning and improving.";
    }
    const lines = achievements.map(
      (a) =>
        `${a.title} (${a.year}) · ${a.issuer}${
          a.description ? ` – ${a.description}` : ""
        }`
    );
    return `Here are some of my achievements and certifications:\n\n${lines.join(
      "\n"
    )}`;
  }

  // 13. Extracurriculars / clubs / hackathons
  if (
    includesAny(text, [
      "club",
      "clubs",
      "extracurricular",
      "extra curricular",
      "hackathon",
      "hackathons",
      "activities",
    ])
  ) {
    if (!extracurriculars || !extracurriculars.length) {
      return "I haven't listed my extracurricular activities here yet.";
    }
    const lines = extracurriculars.map((e) => {
      const base = `${e.title} at ${e.org} (${e.year})`;
      return e.description ? `${base} – ${e.description}` : base;
    });
    return `Here are some of my extracurricular activities:\n\n${lines.join(
      "\n"
    )}`;
  }

  // 14. Contact
  if (
    includesAny(text, ["contact", "email", "reach you", "reach out", "connect"])
  ) {
    return `You can reach me at ${basicInfo.email}.\nYou can also connect with me on LinkedIn and GitHub using the links on this site.`;
  }

  // Skills By Tech
  const techAnswer = skillsByTech(text);
  if (techAnswer) {
    return techAnswer;
  }

  // 15. FAQ-based answers (fully manual)
  const faqAnswer = answerFromFAQ(text);
  if (faqAnswer) {
    return faqAnswer;
  }

  // 16. Meta: "what can you do"
  if (includesAny(text, ["what can you do", "who are you bot", "assistant"])) {
    return `I'm a small assistant built into Ayush's portfolio. I can answer questions about his background, skills, projects, education, achievements, extracurriculars, and how to contact him.`;
  }

  // 17. Fallback
  return (
    "I can answer questions about Ayush, his skills, projects, education, experience, interests, and how to contact him.\n\n" +
    "Try asking things like:\n" +
    "• Tell me about Ayush.\n" +
    "• What projects has Ayush worked on?\n" +
    "• What technologies does he know?\n" +
    "• What is his sign language project?\n" +
    "• Which year is he in and what's his CGPA?\n" +
    "• What are his strengths and interests?\n"
  );
}
