# 🌿 FloraCare Frontend

Welcome to the frontend application for **FloraCare**, an AI-powered digital garden assistant. This repository contains the beautifully designed, highly interactive React user interface that users interact with to manage their plants, talk to the AI, and monitor their digital garden.

🔗 **Looking for the Backend?** 
The backend handles the AI agents, the RAG knowledge base, and the web-socket server. You can find the backend repository here: [FloraCare Backend Repository](https://github.com/thezenigma/floracare-app-backend)

---

## 🏗️ Architecture Overview

The FloraCare frontend is a modern Single Page Application (SPA) built for blazing-fast performance and a premium user experience.

### Core Technologies
- **React 18 & Vite:** The core framework and build tool for lightning-fast hot-module replacement and optimized production builds.
- **TailwindCSS:** Provides the comprehensive utility-first design system.
- **Framer Motion:** Powers the fluid, premium micro-animations and page transitions across the application.
- **Supabase JS Client:** Handles secure user authentication, bucket storage (for plant images), and direct structured database queries.
- **WebSocket Integration:** Enables a real-time, streaming conversational interface with the Flora AI, complete with keep-alive ping filtering to prevent dropped connections.

---

## 🚀 Setup & Installation

Follow these steps to run the FloraCare frontend locally on your machine.

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- A running instance of the [FloraCare Backend](https://github.com/thezenigma/floracare-app-backend) (either locally or via an Ngrok tunnel)

### 1. Clone the Repository
```bash
git clone https://github.com/thezenigma/floracare-app.git
cd floracare-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root of the project:
```bash
touch .env
```
Add your required configuration variables to the `.env` file. These connect the frontend to both Supabase and your Python backend:
```ini
VITE_SUPABASE_URL="your-supabase-project-url"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"

# The URL to your backend API. 
# If running the backend locally: http://localhost:8000
# If you are deploying this frontend to Vercel, this MUST be your Ngrok URL (e.g. https://abc-123.ngrok-free.app)
VITE_API_URL="http://localhost:8000"
```

### 4. Start the Development Server
Run the Vite development server to view the app locally.
```bash
npm run dev
```
The application will now be live at `http://localhost:5173`. 

---

## 🪴 Key Features

- **Digital Garden Dashboard:** A visually stunning grid displaying all of your integrated plants, their current health status, and images pulled dynamically from Supabase Storage.
- **"Integrate Plant" Wizard:** A seamless modal that allows users to upload a photo, search for a species, and have the backend automatically link the exact care schedule (watering, sunlight) for that specific plant.
- **Conversational AI (Flora):** A persistent chat interface that connects directly to the backend LLM via WebSockets. Flora remembers your plants and can provide highly specific, RAG-backed advice on plant health and troubleshooting.

---

## 🔐 Security & Best Practices
- **Public API Keys:** The `VITE_SUPABASE_ANON_KEY` is completely safe to expose to the frontend. It operates securely under Supabase's Row Level Security (RLS) policies, ensuring users can only read and write data that belongs to them.
- **Dynamic API Routing:** The application dynamically falls back to environment variables (`VITE_API_URL`) to allow seamless transitions between local development (`localhost`) and production environments (Vercel + Ngrok).
