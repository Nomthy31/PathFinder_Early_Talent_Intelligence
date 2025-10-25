<<<<<<< HEAD
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======
# 🌍 Pathfinder – Early Talent Intelligence System

> **Theme:** Jobs & Economic Resilience  
> **Hackathon:** FNB App Of The Year Hackathon

## 🧠 Overview

**Pathfinder** is an adaptive learning platform for Grades 1–9 that integrates CAPS-aligned curriculum (Math, Languages, and Arts) while detecting each child’s natural learning stream — whether they are more **artistic/creative** or **analytical/mathematical** or **balanced**— based on daily digital learning patterns.

Our mission is to reimagine early education in South Africa by aligning how children learn with who they are — creating a future workforce that is both **skilled** and **fulfilled**.

---

## 💡 Inspiration / What Inspired the Project

South Africa faces a **high unemployment rate**, especially among young people. One major contributing factor is that **many students choose subjects and university courses that do not align with their natural abilities or interests**. This often leads to poor performance, low motivation, and, ultimately, career dissatisfaction or unemployment.

We realised that these decisions are often made **too late** — usually in high school — when learners already have limited options based on subjects selected earlier.

**Pathfinder** was inspired by the idea that if we could help children **discover their strengths earlier**, we could:

- Guide them toward the right learning streams before Grade 10.  
- Improve their confidence and performance in subjects that fit them best.  
- Reduce skill mismatches in the job market.

Additionally, building and deploying Pathfinder creates jobs by requiring:

- **Software developers and data analysts** to develop and maintain the platform.  
- **Trainers and digital educators** to teach teachers, parents, and learners how to use the dashboard.  
- **Education facilitators** who interpret learner reports and guide learners based on their strengths.

Pathfinder therefore addresses unemployment in the long term while **creating digital jobs and building capacity** in the short term.

---

## 🚀 Features

### 🧩 Adaptive Activity Engine
- Interactive CAPS-aligned learning activities.
- Same concepts presented in artistic (visual) and analytical (logical) forms.
- Tracks *how* learners interact — not just *what* they answer.

### 📊 Cognitive Pattern Recognition
- Detects learning preferences through click, draw, retry, and time data.
- Builds a cognitive profile: `artistic vs analytical` score.

### 👨‍👩‍👧 Parent & Teacher Dashboards
- Visual reports of learner strengths and growth.
- Actionable insights and personalised recommendations.

### 🎮 Gamified Learning
- Badges for different thinking styles.
- Daily learning quests to keep engagement high.

### 🔤 Multilingual & Offline-first
- Supports multiple South African languages.
- Optimised for low-bandwidth and offline classrooms.

---

## 💰 Business Model

### Revenue Streams
1. **Parent subscriptions** — R99–R149 / month  
2. **School licensing** — R80–R120 per learner / year  
3. **Government & NGO contracts**  
4. **Corporate CSR sponsorships**  
5. **Anonymised data insights** for education policy (ethical & compliant)  
6. **Premium talent-nurture courses** (art, math, coding)

**Why it matters:**  
By helping children find their natural strengths early, we reduce skill mismatches and build a resilient future workforce.

---

## 📈 Impact Metrics

- Learner engagement & growth rates  
- Early talent identification accuracy  
- School adoption rate  
- Correlation to future subject performance

---

## 🧰 Tech Stack (Recommended)

- **Frontend:** React (Web), React Native (Mobile / Expo)  
- **Backend:** Node.js + Express / Python Flask  
- **Database:** Firebase / PostgreSQL  
- **AI / Logic:** TensorFlow.js or scikit-learn (starter classifiers)  
- **Visualization:** Chart.js / Recharts  
- **Hosting:** Firebase Hosting / Vercel

---

## 🧠 AI Logic (Simplified Example)

``js
// Simple heuristic classifier (demo)
let score = { artistic: 0, analytical: 0 };

if (usedDrawingTools) score.artistic += 2;
if (solvedVisually) score.artistic += 1;
if (solvedUsingNumbers) score.analytical += 2;
if (completionTime < avgTime) score.analytical += 1;

---

## 🧑‍💻 How to Run Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Nomthy31/Pathfinder_Early_Talent_Intelligence.git
cd pathfinder-early-talent-intelligence
```
### 2️⃣ Install dependencies

**Frontend**
```
cd frontend
npm install
```
**Backend (open a new terminal or go back to repo root)**
```
cd ../backend
npm install
```
### 3️⃣ Start servers

**Frontend**
```bash
cd pathfinder-early-talent-intelligence/frontend
npm start
```
**Backend**
```bash
cd pathfinder-early-talent-intelligence/backend
npm run dev
```


## 🧑‍🤝‍🧑 Team

| Name                       | Role                         | Focus                              |
|---------------------------:|-----------------------------:|-----------------------------------:|
| **Koketso Ratlou**         | Project Lead / Frontend Dev  | Architecture, UX, Strategy         |
| **Ntokozo Ndlovu**         | Frontend Dev                 | React components, dashboard        |
| **Thato Mphahlele**        | UI-UX Designer/ Frontend Dev               | Gamification, child-friendly UI    |
| **Nomcebo Nkomo**          | Backend Dev                  | API development, AI logic          |
| **Phumlile Mtshali**       | Backend Dev                  | API development, Database logic     |
| **Nomthandazo Mabena**     | Backend Dev                  | API development, Server-side validation|



## 🧭 Vision

“Every child deserves to discover their natural potential early —
so they can learn, create, and work in ways that make them thrive.”

Pathfinder is not just an edtech tool — it’s a future talent discovery system for Africa. 🌍

## 📜 License

MIT License © 2025 Pathfinder Team

>>>>>>> 69e16f2d63366607f488b6b667921f679043ee30
