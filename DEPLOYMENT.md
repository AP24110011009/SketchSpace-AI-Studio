# SketchSpace AI — Deployment & Live Hosting Guide

SketchSpace AI is structured as a **single unified full-stack application**. The FastAPI backend serves the React production SPA, the REST API endpoints, the Project Report, and the PDF downloads from a single port (`8000` or `$PORT`).

---

## 🚀 Option 1: Instant Live Public URL (Recommended for GPU Demos & Interviews)
* **Cost:** $0 (Free)
* **Hardware:** Uses your Laptop's **NVIDIA RTX 3050 GPU (6GB VRAM)**
* **Setup Time:** 30 seconds

Because your laptop possesses an actual NVIDIA RTX 3050 GPU, running the server locally while exposing it through a secure public tunnel gives recruiters and clients **real-time AI generation on your real hardware**.

### Step-by-Step:
1. Ensure your local server is running (double-click `run_app.bat` or run `cd backend && python -m uvicorn main:app --host 127.0.0.1 --port 8000`).
2. Double-click `tunnel_live.bat` (or in terminal: `npx localtunnel --port 8000`).
3. You will receive an instant public HTTPS URL, for example:
   ```
   your url is: https://gentle-rooms-relax.loca.lt
   ```
4. Open the link on your mobile phone or share it with anyone!
*(Note: When visiting a localtunnel URL for the first time, click "Click to Continue" or enter your public IP if prompted).*

---

## ☁️ Option 2: 24/7 Free Cloud Hosting (Render / Railway)
* **Cost:** Free tier available
* **Hardware:** Cloud Linux CPU Container (Runs with the Hybrid Inversion Engine in ~2.5s)
* **Setup Time:** 5 minutes

### Deploy to Render:
1. Create a free account at [render.com](https://render.com).
2. Push your project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for SketchSpace AI"
   git remote add origin https://github.com/AP24110011009/SketchSpace-AI.git
   git push -u origin main
   ```
3. In Render Dashboard, click **New +** -> **Web Service**.
4. Connect your GitHub repository.
5. Render will automatically detect `render.yaml` or you can enter:
   - **Environment:** Python
   - **Build Command:** `pip install -r backend/requirements.txt && cd frontend && npm install && npm run build && cd ..`
   - **Start Command:** `cd backend && python -m uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Click **Create Web Service**. Your live URL will be ready: `https://sketchspace-ai.onrender.com`.

---

## 🤗 Option 3: Hugging Face Spaces (Best for ML & AI Portfolio)
* **Cost:** Free CPU, with optional GPU grants
* **Setup Time:** 5 minutes

1. Go to [huggingface.co/spaces](https://huggingface.co/spaces) and click **Create new Space**.
2. Space SDK: Select **Docker** (Blank).
3. Clone your Space repo locally and copy the `Dockerfile`, `backend/`, and `frontend/` into it.
4. Git push to Hugging Face:
   ```bash
   git add .
   git commit -m "Deploy to HF Spaces"
   git push
   ```
5. Hugging Face will automatically build the Docker container and give you a permanent URL like `https://huggingface.co/spaces/<username>/sketchspace-ai`.

---

## 🐳 Option 4: Production Docker Container
Run anywhere with Docker installed:
```bash
docker build -t sketchspace-ai .
docker run -p 8000:8000 sketchspace-ai
```
Visit `http://localhost:8000`.
