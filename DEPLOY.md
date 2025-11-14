# Deploy to GitHub - Step by Step 🚀

Your repository is already connected to: `https://github.com/yksanjo/awesome-generative-ai.git`

## Step 1: Test Locally First

### Terminal 1 - Backend:
```bash
cd /Users/yoshikondo/awesome-generative-ai/ai-fortune-cookie/backend
pip install -r requirements.txt
python main.py
```

### Terminal 2 - Frontend:
```bash
cd /Users/yoshikondo/awesome-generative-ai/ai-fortune-cookie/frontend
npm install
npm start
```

### Test in Browser:
- Open http://localhost:3000
- Click cookie, test themes, styles, history
- Make sure everything works!

## Step 2: Check Git Status

```bash
cd /Users/yoshikondo/awesome-generative-ai
git status
```

You should see `ai-fortune-cookie/` as untracked.

## Step 3: Add Files to Git

```bash
# Add the entire ai-fortune-cookie directory
git add ai-fortune-cookie/

# Verify what will be committed
git status
```

## Step 4: Commit

```bash
git commit -m "Add AI Fortune Cookie app with enhanced features

- Interactive fortune cookie with particle effects
- 7 color themes with localStorage persistence
- Fortune style selector (wisdom, prediction, humor, etc.)
- Fortune history panel with save/recall
- Share and copy functionality
- Full responsive design
- Support for Ollama and Hugging Face AI providers"
```

## Step 5: Push to GitHub

```bash
# Check current branch
git branch

# Push to your branch (likely 'add-soundraw-section' or 'main')
git push origin add-soundraw-section

# OR if on main/master:
git push origin main
```

## Step 6: Verify on GitHub

1. Go to: https://github.com/yksanjo/awesome-generative-ai
2. Navigate to `ai-fortune-cookie/` folder
3. Verify all files are there
4. Check that `.env` is NOT there (it's in .gitignore ✅)

## What Gets Pushed?

✅ **Will be pushed:**
- All source code (`.js`, `.jsx`, `.py`, `.css`)
- Configuration files (`package.json`, `requirements.txt`)
- Documentation (`README.md`, `TESTING.md`, etc.)
- `.gitignore` files
- `env.example` (template, not secrets)

❌ **Will NOT be pushed** (in .gitignore):
- `.env` files (contains API keys)
- `node_modules/` (dependencies)
- `__pycache__/` (Python cache)
- `frontend/build/` (build output)
- `.DS_Store` (macOS files)

## Troubleshooting

### "Permission denied"
```bash
# Check your GitHub credentials
git config --global user.name
git config --global user.email

# If needed, set them:
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### "Branch is behind"
```bash
# Pull latest changes first
git pull origin main

# Resolve any conflicts, then push
git push origin add-soundraw-section
```

### "Large file" error
```bash
# Make sure node_modules is ignored
# Check .gitignore includes: node_modules/

# If already committed, remove it:
git rm -r --cached ai-fortune-cookie/frontend/node_modules
git commit -m "Remove node_modules from git"
```

## After Pushing

1. ✅ View on GitHub: https://github.com/yksanjo/awesome-generative-ai/tree/main/ai-fortune-cookie
2. ✅ Update main README.md to link to the app
3. ✅ Consider adding screenshots
4. ✅ Add repository topics: `react`, `fastapi`, `ai`, `fortune-cookie`

## Quick Command Summary

```bash
# 1. Test locally (2 terminals)
cd ai-fortune-cookie/backend && python main.py
cd ai-fortune-cookie/frontend && npm start

# 2. Add to git
cd /Users/yoshikondo/awesome-generative-ai
git add ai-fortune-cookie/

# 3. Commit
git commit -m "Add AI Fortune Cookie app"

# 4. Push
git push origin add-soundraw-section
```

That's it! 🎉

