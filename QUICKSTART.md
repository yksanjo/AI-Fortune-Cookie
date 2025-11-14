# Quick Start Guide - AI Fortune Cookie 🥠

Get your AI Fortune Cookie app running in minutes!

## Prerequisites

- Python 3.9+ installed
- Node.js 16+ installed
- (Optional) Ollama installed for free local AI

## Step 1: Set Up Backend

```bash
cd ai-fortune-cookie/backend

# Install Python dependencies
pip install -r requirements.txt

# Copy environment file (optional - only needed for Hugging Face)
cp env.example .env

# If using Hugging Face, edit .env and add your API key
# HUGGINGFACE_API_KEY=your_key_here
```

## Step 2: Set Up Ollama (Recommended - Free!)

Ollama is the easiest way to get started - it's 100% free and runs locally:

```bash
# Install Ollama from https://ollama.ai
# Then pull a model:
ollama pull llama2
# or
ollama pull mistral
```

## Step 3: Start Backend Server

```bash
# Make sure you're in the backend directory
cd ai-fortune-cookie/backend

# Start the server
python main.py
```

You should see:
```
✓ Fortune generator initialized with Ollama
INFO:     Uvicorn running on http://0.0.0.0:8000
```

## Step 4: Set Up Frontend

Open a new terminal:

```bash
cd ai-fortune-cookie/frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open automatically at `http://localhost:3000`

## Step 5: Crack Your First Fortune! 🎉

1. Click on the fortune cookie
2. Watch it crack open with a beautiful animation
3. Read your AI-generated fortune!
4. Click "Get Another Fortune" to try again

## Troubleshooting

### "No AI provider is available"

**Solution 1: Use Ollama (Recommended)**
```bash
# Install Ollama
# macOS: brew install ollama
# Linux: curl -fsSL https://ollama.ai/install.sh | sh
# Windows: Download from https://ollama.ai

# Pull a model
ollama pull llama2

# Make sure Ollama is running
ollama serve
```

**Solution 2: Use Hugging Face**
1. Sign up at https://huggingface.co
2. Get your API token from https://huggingface.co/settings/tokens
3. Add to `backend/.env`: `HUGGINGFACE_API_KEY=your_token_here`
4. Restart the backend server

### Backend won't start

- Make sure Python 3.9+ is installed: `python --version`
- Install dependencies: `pip install -r requirements.txt`
- Check if port 8000 is already in use

### Frontend won't start

- Make sure Node.js 16+ is installed: `node --version`
- Install dependencies: `npm install`
- Check if port 3000 is already in use

### Fortune generation is slow

- Ollama models run locally, so first generation might be slow
- Hugging Face free tier has rate limits
- Try a smaller model like `llama2:7b` instead of `llama2:13b`

## Enjoy Your Fortunes! 🥠✨

The app supports different fortune styles:
- 🧠 Wisdom
- 🔮 Prediction
- 💪 Motivation
- 😄 Humor
- ❤️ Love
- ⭐ Success
- 🌍 Adventure

Have fun cracking cookies and discovering your AI-generated fortunes!



