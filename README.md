# Ayush Rathi – Personal Portfolio

Welcome to the repository for my personal portfolio website! This project is built to showcase my work, skills, experience, and projects in a clean, interactive, and highly maintainable way. 

👉 **[Live Portfolio](https://my-portfolio-one-gamma-14.vercel.app/)**

---

## 🌟 Key Features

* **Modern UI**: Built with **React + Vite** for blazing-fast performance and a smooth, responsive design.
* **Offline AI Assistant**: A built-in, rule-based chat widget that knows everything about my profile and can intelligently answer questions—without needing a live backend!
* **Centralized Configuration**: All social links, emails, and base URLs are statically managed in a single `constants.js` file, making global updates effortless.
* **Dynamic Profile Data**: All content (projects, skills, achievements) is driven by a central `profileData.js` architecture.
* **Working Contact Form**: Powered by EmailJS, allowing visitors to reach out directly.

---

## 🧑‍💻 About Me

Hi! I’m **Ayush Dinesh Rathi**, a passionate learner and developer currently exploring:

* Machine Learning & Deep Learning
* NLP & Large Language Models
* Web Development
* Real-time AI systems
* Accessibility technologies

I love building solutions that make communication easier—especially my recent work on **Sign Language Recognition (Vyakt)** and privacy-first RAG agents.

---

## 🚀 Local Development Setup

If you want to run this project locally to explore the codebase or adapt it:

### Prerequisites
* Node.js (v16 or higher)
* npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/AyushDineshRathi/my_Portfolio.git
cd my_Portfolio
```

### 2. Frontend Setup
The frontend is a React application built with Vite.

```bash
cd frontend
npm install
npm run dev
```
The site will be running at `http://localhost:5173`.

### 3. Backend Setup (Optional)
The project includes a lightweight Node/Express backend that shares the same data structures. 

```bash
cd backend
npm install
npm run start
```

---

## ⚙️ How It Works (Architecture)

To ensure privacy and maintainability, this portfolio uses a centralized configuration system:

* `src/data/constants.js`: Stores all sensitive or frequently changing base URLs (e.g., GitHub username, LinkedIn profile). Change a username here, and it updates globally across all components and project links!
* `src/data/profileData.js`: The brain of the portfolio. It imports variables from `constants.js` and exports a massive structured object containing all my projects, skills, and resume details.
* `src/services/offlineChat.js`: A smart local routing engine that uses fuzzy text matching to answer chat queries using `profileData.js` without any external API calls.

---

## 🤝 Let's Connect!

Thank you for taking the time to explore my work. If you'd like to suggest improvements, collaborate, or just talk about tech, I’m always open!

* **Email:** ayushrathi955@gmail.com
* **LinkedIn:** [Ayush Rathi](https://www.linkedin.com/in/ayush-rathi-280295289/)
* **GitHub:** [@AyushDineshRathi](https://github.com/AyushDineshRathi)
