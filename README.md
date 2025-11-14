# AI Fortune Cookie 🥠

A delightful, interactive web app that generates AI-powered fortunes in the style of traditional fortune cookies. Crack open a virtual fortune cookie and receive personalized, creative fortunes powered by generative AI!

## Features

- 🥠 **Interactive Fortune Cookie**: Click to crack open and reveal your fortune
- ✨ **AI-Generated Fortunes**: Creative, personalized fortunes powered by AI
- 🎨 **Beautiful Animations**: Smooth, delightful cookie cracking animation
- 🎲 **Daily Fortunes**: Get a new fortune every time you crack a cookie
- 🆓 **Free AI Models**: Works with Ollama (local) or Hugging Face (free tier)
- 📱 **Responsive Design**: Works beautifully on desktop and mobile
- 🌈 **Themes**: Multiple color themes for different moods

## Architecture

```
ai-fortune-cookie/
├── backend/          # FastAPI server for fortune generation
├── frontend/         # React web interface
├── core/             # Shared AI logic
└── docs/             # Documentation
```

## Quick Start

### Prerequisites

- Python 3.9+
- Node.js 16+
- (Optional) Ollama installed locally for free AI

### Installation

1. **Backend Setup:**
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Add your API keys to .env (optional for Ollama)
python main.py
```

2. **Frontend Setup:**
```bash
cd frontend
npm install
npm start
```

3. **Open the app:**
   - Navigate to `http://localhost:3000`
   - Click the fortune cookie to crack it open!
   - Get your AI-generated fortune

## Configuration

### Free AI Options

1. **Ollama** (100% free, runs locally)
   - Install: https://ollama.ai
   - Run: `ollama pull llama2` or `ollama pull mistral`
   - No API key needed!

2. **Hugging Face Inference API** (Free tier available)
   - Sign up at https://huggingface.co
   - Get your API token
   - Add to `.env`: `HUGGINGFACE_API_KEY=your_key`

## Usage

1. Launch the app
2. Click on the fortune cookie
3. Watch it crack open with a delightful animation
4. Read your personalized AI-generated fortune
5. Click "Get Another Fortune" to crack another cookie!

## Fortune Types

The AI generates various types of fortunes:
- **Wisdom**: Life advice and philosophical insights
- **Predictions**: Fun predictions about your day
- **Motivation**: Inspirational messages
- **Humor**: Light-hearted, funny fortunes
- **Love**: Relationship and friendship advice

## Tech Stack

- **Frontend**: React + CSS animations
- **Backend**: FastAPI
- **AI**: Ollama / Hugging Face Inference API
- **Styling**: CSS with animations

## License

MIT

