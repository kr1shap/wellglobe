
---

# 🌍 WellGlobe

**Stay alive, stay healthy, and travel smart.**

WellGlobe is a full-stack travel health advisory app designed to help travelers stay safe by providing real-time health alerts, vaccine recommendations, local clinic information, and interactive destination-specific health guidance powered by Gemini AI.

---

## ✨ Features

* 🌐 Input your **departure** and **destination** countries
* ⚠️ View **urgent health advisories** and **disease outbreaks**
* 💉 Get a **personalized list of vaccines** and travel safety tips
* 🏥 See **nearby clinics and hospitals** using your **current location**
* 🤖 Chat with a **Gemini-powered AI assistant** for health guidance

---

## 💌 Tech Stack

**Frontend**

* React + Vite + TypeScript
* TailwindCSS, Bootstrap
* Framer Motion for animations

**Backend**

* FastAPI
* Gemini API (chatbot)
* Google Maps API
* EmergencyAPI & other health data sources

---

## ⁉️ Getting Started

### 1. Fork & Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/wellglobe.git
cd wellglobe
```

---

### 2. Set Up the Frontend

```bash
cd frontend
npm install
npm run dev
```

This starts the frontend development server at `http://localhost:5173`.

---

### 3. Set Up the Backend

```bash
cd ../backend
pip install -r requirements.txt
uvicorn main:app --reload
```

This runs the FastAPI backend server at `http://localhost:8000`.

---

### 4. Add a `.env` File

Inside the `backend` directory, create a `.env` file and add the following:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

These keys are required for the Gemini AI chatbot and Google Maps services.
Note that this project is not deployed (i.e. uses CORS). So, it utilizes your localhost dev server instead. 

---

## 🌱 Sample `.env` File

```dotenv
# backend/.env

GEMINI_API_KEY=AIza...
GOOGLE_MAPS_API_KEY=AIza...
```

---

## ‼️ Scripts

| Command                     | Description                    |
| --------------------------- | ------------------------------ |
| `npm install`               | Installs frontend dependencies |
| `npm run dev`               | Runs Vite development server   |
| `uvicorn main:app --reload` | Starts FastAPI backend         |

---

