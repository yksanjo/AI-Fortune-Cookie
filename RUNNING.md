# 🚀 AI Fortune Cookie - Currently Running!

## ✅ Status

Both servers are running:
- **Backend**: http://localhost:8000
- **Frontend**: http://localhost:3000

## 🌐 Access the App

**Open in your browser:**
```
http://localhost:3000
```

The app should automatically open in your default browser. If not, manually navigate to the URL above.

## 🎯 Try These Features

1. **Click the Cookie** 🥠 - Generate your first fortune
2. **Change Themes** 🌈 - Try all 7 color themes
3. **Select Style** 🎲 - Choose wisdom, humor, prediction, etc.
4. **View History** 📜 - Click the history button (bottom-right)
5. **Share Fortune** 📋 - Copy or share your favorite fortunes

## ⚠️ Note About AI

The app will work even without Ollama or Hugging Face configured - it will use fallback fortunes. However, for AI-generated fortunes:

**Option 1: Install Ollama (Recommended - Free)**
```bash
# Install from https://ollama.ai
# Then pull a model:
ollama pull llama2
```

**Option 2: Use Hugging Face**
```bash
# Add to backend/.env:
HUGGINGFACE_API_KEY=your_key_here
```

## 🛑 Stop the Servers

To stop the servers, press `Ctrl+C` in the terminal windows, or:

```bash
# Kill backend
lsof -ti:8000 | xargs kill

# Kill frontend  
lsof -ti:3000 | xargs kill
```

## 📝 Troubleshooting

- **Can't access?** Make sure both servers are running
- **No fortunes?** Check backend logs for errors
- **Port already in use?** Stop other services using ports 8000 or 3000

Enjoy your fortunes! 🍀

