export const profileData = {
  basicInfo: {
    name: "Ayush Dinesh Rathi",
    title: "Machine Learning Enthusiat & Web Developer",
    tagline:
      "Building intelligent, accessible experiences using machine learning, NLP, and web technologies.",
    bio: [
      "AI/ML engineer skilled in real-time sign language translation, recommendation systems, and privacy-first RAG agents.",
      "Experienced with transformers, computer vision, LangChain, and full-stack deployment using Python, Flask, and FastAPI.",
      "Passionate about building inclusive, scalable, and high-impact AI solutions that solve real-world communication challenges.",
    ],
    location: "Jabalpur, Madhya Pradesh, India",
    email: "ayushrathi955@gmail.com",
    availability: "Open to internships and collaborations",
    profileImage: "/src/assets/Ayush.jpg",
    resumeLink:
      "https://drive.google.com/file/d/1PcRtuvR7EAULdaNvCOptviXd2M47pO4n/view?usp=sharing",
  },

  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/AyushDineshRathi",
      label: "Code",
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/ayush-rathi-280295289/",
      label: "Professional",
    },
    {
      platform: "LeetCode",
      url: "https://leetcode.com/u/adam955/",
      label: "Coding Practice",
    },
    {
      platform: "instagram",
      url: "https://www.instagram.com/ayush_rathi95/",
      label: "Social",
    },
    {
      platform: "CodeChef",
      url: "https://www.codechef.com/users/ayush_rathi955/",
      label: "Competitive Programming",
    },
    {
      platform: "Medium",
      url: "https://medium.com/@aimlwork27/",
      label: "Blogs",
    },
  ],

  skills: [
    {
      category: "Programming Languages",
      items: [
        { name: "Python", level: "Intermediate" },
        { name: "C++", level: "Intermediate" },
        { name: "C", level: "Intermediate" },
      ],
    },
    {
      category: "Machine Learning & Deep Learning",
      items: [
        { name: "PyTorch", level: "Intermediate" },
        { name: "TensorFlow", level: "Intermediate" },
        { name: "Scikit-learn", level: "Intermediate" },
        { name: "RNNs", level: "Intermediate" },
        { name: "Transformers", level: "Intermediate" },
        { name: "Computer Vision", level: "Intermediate" },
        { name: "Mediapipe", level: "Intermediate" },
      ],
    },
    {
      category: "NLP & LLM Frameworks",
      items: [
        { name: "LangChain", level: "Intermediate" },
        { name: "Hugging Face Transformers", level: "Intermediate" },
        { name: "spaCy", level: "Intermediate" },
        { name: "NLTK", level: "Intermediate" },
      ],
    },
    {
      category: "Web Development & APIs",
      items: [
        { name: "Flask", level: "Intermediate" },
        { name: "FastAPI", level: "Intermediate" },
        { name: "Streamlit", level: "Intermediate" },
        { name: "React", level: "Beginner" },
        { name: "HTML", level: "Intermediate" },
        { name: "CSS", level: "Intermediate" },
      ],
    },
    {
      category: "Databases & Data Tools",
      items: [
        { name: "PostgreSQL", level: "Intermediate" },
        { name: "MySQL", level: "Intermediate" },
        { name: "SQLAlchemy", level: "Intermediate" },
        { name: "Pandas", level: "Intermediate" },
        { name: "xarray", level: "Intermediate" },
        { name: "Plotly", level: "Intermediate" },
      ],
    },
    {
      category: "Tools & DevOps",
      items: [
        { name: "Git", level: "Intermediate" },
        { name: "GitHub Actions", level: "Beginner" },
        { name: "VS Code", level: "Advanced" },
        { name: "Figma", level: "Intermediate" },
      ],
    },
    {
      category: "Operating Systems",
      items: [
        { name: "Linux", level: "Intermediate" },
        { name: "Windows", level: "Advanced" },
      ],
    },
    {
      category: "Embedded & Hardware",
      items: [
        { name: "STM32 (F4 Series)", level: "Beginner" },
        { name: "Embedded C", level: "Beginner" },
        { name: "Arduino", level: "Beginner" },
      ],
    },
  ],

  projects: [
    {
      id: "isl-translation-system",
      name: "AI-Powered Indian Sign Language Translation System",
      tagline:
        "A real-time multimodal ISL translation system using transformers and computer vision.",
      shortDescription:
        "A real-time system capable of translating ISL gestures into text and generating sign animations from spoken or typed input.",
      detailedDescription:
        "Developed a full-scale ISL translation pipeline featuring a custom dataset of 17 gesture classes with ~1200 images each, captured and annotated using Mediapipe Holistic keypoint extraction. Trained a transformer-based vision model for Sign → Text translation. For Text → Sign, created a curated dataset of 500+ sign-language videos where sentences are broken into tokens, processed using NLP techniques, and mapped to corresponding ISL video units. The system achieves <200ms latency using a Flask backend and a React front-end interface.",
      category: "Deep Learning · Computer Vision · Accessibility",
      techStack: [
        "Python",
        "Transformers",
        "Computer Vision",
        "Mediapipe",
        "Flask",
        "React",
      ],
      role: "Designed dataset, trained transformer model, built Text→Sign pipeline, and deployed with real-time UI.",
      highlights: [
        "Created custom dataset: 17 ISL gesture classes and ~1200 images for each class.",
        "Trained transformer-based image model for gesture-to-text translation.",
        "Generated Text→Sign output using a library of 500+ curated sign videos.",
        "Achieved <200ms real-time inference latency via Flask + React.",
      ],
      links: {
        github: "https://github.com/AyushDineshRathi/gestura",
        demo: "",
        paper: "",
      },
      timeline: "2024-2025",
      featured: true,
    },

    {
      id: "game-recommendation-system",
      name: "Game Recommendation System",
      tagline: "ML-based game similarity engine using TF-IDF and SVD.",
      shortDescription:
        "A recommendation engine built on an 80k+ game dataset to suggest similar games using NLP-based embeddings.",
      detailedDescription:
        "Designed an end-to-end recommendation pipeline that preprocesses an 80k+ game dataset using TF-IDF feature extraction followed by SVD-based dimensionality reduction. Achieved over 85% accuracy in similarity retrieval and 30% faster inference compared to baseline models. Deployed as a responsive web application used by over 1000 users.",
      category: "Machine Learning · NLP",
      techStack: ["Python", "TF-IDF", "SVD", "NLP", "HTML/CSS/JS"],
      role: "Developed ML pipeline and deployed frontend interface.",
      highlights: [
        "Processed 80k+ games using TF-IDF + SVD.",
        "85%+ recommendation accuracy.",
        "Responsive web deployment with 1000+ active users.",
      ],
      links: {
        github: "https://github.com/AyushDineshRathi/Game-Recommendation",
        demo: "",
        paper: "",
      },
      timeline: "2024",
      featured: false,
    },

    {
      id: "aqualogix",
      name: "AquaLogix — Conversational AI for Ocean Data",
      tagline: "A Text-to-SQL LLM agent for scientific oceanographic datasets.",
      shortDescription:
        "Conversational AI system to query 12+ structured ocean datasets using local LLM-powered Text-to-SQL.",
      detailedDescription:
        "Built a local LLM assistant using LangChain + Ollama capable of querying 12+ oceanographic datasets (25k+ measurements). Designed ingestion pipelines into PostgreSQL, built a reliable Text-to-SQL agent, and integrated it with FastAPI + Streamlit dashboards featuring interactive scientific visualizations.",
      category: "LLMs · Data Engineering · Scientific AI",
      techStack: [
        "Python",
        "LangChain",
        "Ollama",
        "FastAPI",
        "Streamlit",
        "PostgreSQL",
        "Plotly",
      ],
      role: "Created ingestion pipelines, LLM-based Text-to-SQL engine, and full-stack visualization tools.",
      highlights: [
        "Processed 25k+ ocean measurements across 12 datasets.",
        "Built reliable Text-to-SQL engine using LangChain + local LLM.",
        "Developed 4+ interactive dashboards with FastAPI + Streamlit.",
      ],
      links: {
        github: "https://github.com/AyushDineshRathi/AquaLogiX",
        demo: "",
        paper: "",
      },
      timeline: "2025",
      featured: false,
    },

    {
      id: "h002-cx-agent",
      name: "H-002: Context-Aware Customer Experience Agent",
      tagline:
        "A privacy-first, fully local RAG assistant for automated customer support.",
      shortDescription:
        "A secure RAG system with PII protection, personalized responses, and hybrid retrieval.",
      detailedDescription:
        "Engineered a 100% local RAG agent using LangChain, ChromaDB, and Ollama to automate customer support workflows. Built a PII Firewall using Microsoft Presidio + regex for masking sensitive details before LLM processing. Added a dynamic context engine that injects store-specific metadata (location, inventory, weather), enabling hyper-personalized responses. Integrated a Chainlit UI to trace retrieval, PII masking, and reasoning steps.",
      category: "LLMs · RAG · Privacy",
      techStack: [
        "Python",
        "LangChain",
        "ChromaDB",
        "Ollama",
        "Microsoft Presidio",
        "Chainlit",
      ],
      role: "Developed RAG pipeline, PII Firewall, and context engine.",
      highlights: [
        "Fully local DPDP/GDPR-compliant RAG architecture.",
        "PII Firewall for detection and redaction of sensitive data.",
        "Hybrid ChromaDB search reducing hallucinations.",
        "Chainlit UI for retrieval + reasoning traceability.",
      ],
      links: {
        github: "https://github.com/AyushDineshRathi/customer-experience-bot",
        demo: "",
        paper: "",
      },
      timeline: "2025",
      featured: false,
    },
  ],

  // === EXPERIENCE ===
  experience: [
    // Example - fill with your actual entries
    // {
    //   role: "Machine Learning Intern",
    //   organization: "Company Name",
    //   location: "Remote",
    //   start: "Jun 2024",
    //   end: "Aug 2024",
    //   type: "Internship",
    //   details: [
    //     "Worked on ...",
    //     "Implemented ..."
    //   ]
    // }
  ],

  // === EDUCATION ===
  education: [
    {
      degree: "B.Tech in Computer Science and Engineering",
      institution:
        "Indian Institute of Information Technology, Jabalpur (IIITDM Jabalpur)",
      location: "Jabalpur, Madhya Pradesh, India",
      startYear: "2023",
      endYear: "2027",
      details: [
        "CGPA: 8.5/10.",
        "Relevant coursework: Data Structures & Algorithms, Algorithms, Machine Learning, Artificial Intelligence, NLP, Operating Systems, DBMS, Computer Networks.",
        "Student Guide in the Counselling Committee and Dev Mentor in The Programming Club.",
        "Worked on major projects including AI-powered Indian Sign Language Translation System, Gamer Recommendation System, AquaLogix, and a privacy-first RAG Customer Experience Agent.",
        "Secured top positions in national-level hackathons (CanYouHackIt, Intellectus at IIT Roorkee).",
      ],
    },
    {
      degree: "Higher Secondary Certificate (HSC) — Class 12",
      institution: "Dr. R. P. Nath Junior College",
      location: "Chh. Sambhajinagar, India",
      startYear: "2021",
      endYear: "2023",
      details: [
        "Percentage: 86.33%.",
        "Focused on Physics, Chemistry, Mathematics.",
        "Participated in academic and technical activities during senior secondary education.",
      ],
    },
    {
      degree: "CBSE — Class 10",
      institution: "The Jain International School",
      location: "Chh. Sambhajinagar, India",
      startYear: "2020",
      endYear: "2021",
      details: [
        "Score: 97.6%.",
        "Strong foundational academic performance.",
        "Actively involved in school-level extracurricular and communication activities.",
      ],
    },
  ],

  // === ACHIEVEMENTS / CERTIFICATIONS ===
  achievements: [
    {
      title: "Top 3 Position - CanYouHackIt Hackathon",
      issuer: "Inter-college Hackathon",
      year: "2024",
      type: "Competition",
      description:
        "Achieved a top 3 position among 50+ participating teams in an innovation-driven hackathon.",
      link: "",
    },
    {
      title: "3rd Place - Intellectus, Cognizance",
      issuer: "IIT Roorkee",
      year: "2024",
      type: "Competition",
      description:
        "Secured 3rd place at the flagship technical event of Cognizance, IIT Roorkee.",
      link: "",
    },
    {
      title: "Global Rank 250 - Starters 190",
      issuer: "CodeChef",
      year: "2025",
      type: "Competitive Programming",
      description:
        "Ranked within the top 250 globally in CodeChef's rated Starters 190 contest.",
      link: "https://www.codechef.com/users/ayush_rathi955",
    },
    {
      title: "450+ Problems Solved",
      issuer: "LeetCode",
      year: "2025",
      type: "Competitive Programming",
      description:
        "Solved more than 450 algorithm and data-structure problems showcasing strong problem-solving ability.",
      link: "https://leetcode.com/u/adam955/",
    },
    {
      title: "Generative AI Professional",
      issuer: "Oracle Cloud Infrastructure",
      year: "2025",
      type: "Certification",
      description:
        "Certified in Generative AI, demonstrating proficiency in LLMs, prompt engineering, and AI workflows.",
      link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=DBB9DB5921784AA443E20F5EAD4F7FFB7D65109D422164BFCBAB5CD4CAB81600",
    },
    {
      title: "Data Science Professional",
      issuer: "Oracle Cloud Infrastructure",
      year: "2025",
      type: "Certification",
      description:
        "Certified in Data Science covering model development, deployment, MLOps, and applied analytics.",
      link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=640B30147EECA611D38417AE327F5D53812C32221258DEE6C7D16B2D2132831C",
    },
  ],

  // === BLOG POSTS (OPTIONAL) ===
  blogPosts: [
    {
      title:
        "Unlocking Document Insights with a Multi-PDF Chatbot: A Gen-AI Journey",
      publishedOn: "April 19, 2024",
      type: "Technical Blog",
      description:
        "Explained the process of building a Multi-PDF chatbot using Gen-AI, covering embeddings, vector search, context retrieval, and LLM orchestration.",
      link: "https://medium.com/@aimlwork27/unlocking-document-insights-with-a-multi-pdf-chatbot-a-gen-ai-journey-af72f6825dba",
    },
    {
      title: "Decoding ROC-AUC Curve",
      publishedOn: "July 21, 2024",
      type: "Technical Blog",
      description:
        "A detailed breakdown of the ROC-AUC metric, its interpretation, visualization, and importance in evaluating ML classification models.",
      link: "https://medium.com/@aimlwork27/decoding-roc-auc-curve-aed50765d0c3",
    },
  ],

  // === RESUME-LIKE EXTRA CONTEXT ===
  resumeMeta: {
    currentRole: "B.Tech CSE student",
    academicStatus: "3rd year (2023-2027)",
    graduationYear: "2027",
    cgpa: "8.5/10",
    portfolioSummary:
      "Aspiring ML & web developer focusing on accessibility, NLP, and real-time systems like speech-to-sign and sign language translation.",
  },

  strengths: [
    "Strong foundation in algorithms and data structures",
    "Hands-on experience with deep learning and NLP frameworks",
    "Good at breaking down complex systems into modular components",
  ],

  interests: [
    "Machine learning for accessibility",
    "Natural language processing",
    "Computer vision & gesture recognition",
    "Embedded systems and IoT",
    "Full-stack web development",
  ],

  languagesSpoken: [
    "English (fluent)",
    "Hindi (fluent)",
    "Marathi (native)",
    "Marwari (conversational)",
  ],

  extracurriculars: [
    {
      title: "Student Guide",
      org: "Counselling Committee, IIITDM Jabalpur",
      role: "Mentor",
      year: "2023-Present",
      description:
        "Guided juniors with academics, onboarding, and campus life; helped resolve student concerns.",
    },
    {
      title: "Dev Mentor",
      org: "The Programming Club, IIITDM Jabalpur",
      role: "Mentor",
      year: "2023-Present",
      description:
        "Mentored students in DSA, ML, and development; conducted coding guidance sessions.",
    },
    {
      title: "Treasurer",
      org: "Gavel's Club",
      role: "Event & Finance Coordinator",
      year: "2019-2021",
      description:
        "Managed club finances, coordinated events, and supported public-speaking activities.",
    },
    {
      title: "Hackathon Finalist & Mentor",
      org: "Various Inter-college Hackathons",
      role: "Participant & Problem Solver",
      year: "2023-2025",
      description:
        "Top 3 at CanYouHackIt and 3rd place at Intellectus, Cognizance (IIT Roorkee).",
    },
  ],

  faq: [
    {
      id: "career-goal",
      patterns: [
        "career goal",
        "future plan",
        "future goals",
        "where do you see yourself",
      ],
      answer:
        "I aim to work on real-time AI systems, especially in multimodal ML, LLMs, and accessibility tech. My long-term goal is to build AI solutions that bridge communication gaps—especially for the deaf and hard-of-hearing community.",
    },
    {
      id: "strength-weakness",
      patterns: ["strengths and weaknesses", "strength and weakness"],
      answer:
        "My strengths are rapid learning, building end-to-end AI systems, and mentoring peers. I am working on balancing deep technical perfectionism with faster iteration and shipping.",
    },
    {
      id: "best-project",
      patterns: ["best project", "favourite project", "favorite project"],
      answer:
        "My favorite project is the AI-powered Indian Sign Language Translation System—it combines computer vision, transformers, dataset creation, real-time inference, and accessibility impact.",
    },
    {
      id: "hackathons",
      patterns: ["hackathon", "competitions", "contests"],
      answer:
        "I have secured top positions in multiple hackathons, including Top 3 at CanYouHackIt and 3rd place at Intellectus, Cognizance (IIT Roorkee). I enjoy solving real-world problems with practical AI systems.",
    },
    {
      id: "skills-summary",
      patterns: ["skills", "what can you do", "technical skills"],
      answer:
        "My strengths include Python, Transformers, LangChain, Computer Vision, FastAPI, Flask, PostgreSQL, and building real-time ML systems. I also mentor juniors in DSA, ML, and full-stack development.",
    },
  ],

  // === CHAT ASSISTANT CONFIG ===
  chatConfig: {
    assistantName: "Ayush's Assistant",
    introMessage:
      "Hi! I'm Ayush's assistant. Ask me anything about Ayush, his skills, projects, and this site.",
    capabilities:
      "I can answer questions about Ayush's background, skills, projects, education, and how to contact him.",
    sampleQuestions: [
      "Tell me about Ayush.",
      "What projects has Ayush worked on?",
      "What is his sign language project?",
      "What technologies does Ayush know?",
      "How can I contact Ayush?",
    ],
  },
};
