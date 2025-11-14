# Testing Guide - AI Fortune Cookie 🥠

This guide will help you test the AI Fortune Cookie application locally and prepare it for GitHub.

## Prerequisites

Before testing, make sure you have:
- **Python 3.9+** installed
- **Node.js 16+** and npm installed
- (Optional) **Ollama** installed for free local AI

## Quick Test Setup

### Step 1: Set Up Backend

```bash
cd ai-fortune-cookie/backend

# Install Python dependencies
pip install -r requirements.txt

# Copy environment file (optional - only needed for Hugging Face)
cp env.example .env

# If using Hugging Face, edit .env and add your API key
# HUGGINGFACE_API_KEY=your_key_here
```

### Step 2: Set Up Ollama (Recommended - Free!)

Ollama is the easiest way to test - it's 100% free and runs locally:

```bash
# Install Ollama from https://ollama.ai
# Then pull a model:
ollama pull llama2
# or
ollama pull mistral
```

### Step 3: Start Backend Server

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

**Keep this terminal open!**

### Step 4: Set Up Frontend

Open a **new terminal**:

```bash
cd ai-fortune-cookie/frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The app will automatically open at `http://localhost:3000`

## Testing Features

### 1. Basic Fortune Generation
- ✅ Click the fortune cookie
- ✅ Watch the crack animation with particle effects
- ✅ Verify the fortune appears

### 2. Theme Selector
- ✅ Click different theme buttons (🌈, 🌅, 🌊, etc.)
- ✅ Verify background changes smoothly
- ✅ Refresh page - theme should persist

### 3. Style Selector
- ✅ Open the style dropdown
- ✅ Select different fortune styles (Wisdom, Prediction, etc.)
- ✅ Click cookie and verify fortune matches selected style
- ✅ Try "Random" option

### 4. Fortune History
- ✅ Generate multiple fortunes
- ✅ Click the history button (📜) in bottom-right
- ✅ Verify all fortunes are saved
- ✅ Click a past fortune to view it again
- ✅ Test "Clear" button

### 5. Share & Copy
- ✅ Generate a fortune
- ✅ Click "📋 Copy" button
- ✅ Paste in a text editor - should include fortune text
- ✅ If on mobile/supported browser, test "📤 Share" button

### 6. Error Handling
- ✅ Stop the backend server
- ✅ Try to get a fortune
- ✅ Verify error message appears
- ✅ Restart backend and try again

## Testing Checklist

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Cookie click generates fortune
- [ ] Particle effects appear on crack
- [ ] All 7 themes work and persist
- [ ] Style selector works for all styles
- [ ] Fortune history saves and displays
- [ ] Copy button works
- [ ] Share button works (if supported)
- [ ] Error handling works when backend is down
- [ ] Mobile responsive (test on phone or resize browser)

## Troubleshooting

### Backend won't start
- Check Python version: `python --version` (need 3.9+)
- Install dependencies: `pip install -r requirements.txt`
- Check if port 8000 is in use: `lsof -i :8000`

### Frontend won't start
- Check Node version: `node --version` (need 16+)
- Install dependencies: `npm install`
- Check if port 3000 is in use: `lsof -i :3000`
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

### "No AI provider available"
- Install Ollama: https://ollama.ai
- Pull a model: `ollama pull llama2`
- Make sure Ollama is running: `ollama serve`
- Or set up Hugging Face API key in `.env`

### Fortune generation is slow
- Ollama models run locally - first generation might be slow
- Hugging Face free tier has rate limits
- Try a smaller model: `ollama pull llama2:7b`

## Performance Testing

- Test with multiple rapid clicks (should handle gracefully)
- Test with slow network (throttle in browser DevTools)
- Test with many fortunes in history (should limit to 20)

## Browser Compatibility

Test in:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Ready for GitHub!

Once all tests pass, you're ready to push to GitHub! See the GitHub setup instructions.

