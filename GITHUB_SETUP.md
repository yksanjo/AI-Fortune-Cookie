# GitHub Setup Guide - AI Fortune Cookie 🥠

This guide will help you push the AI Fortune Cookie project to GitHub.

## Prerequisites

- Git installed and configured
- GitHub account
- Project tested and working locally (see TESTING.md)

## Step 1: Verify Git Status

First, check what files need to be committed:

```bash
cd /Users/yoshikondo/awesome-generative-ai
git status
```

## Step 2: Add the Project Files

Add the ai-fortune-cookie directory to git:

```bash
# Add all new files
git add ai-fortune-cookie/

# Verify what will be committed
git status
```

## Step 3: Commit the Changes

```bash
git commit -m "Add AI Fortune Cookie app with themes, history, and particle effects

Features:
- Interactive fortune cookie with crack animation
- 7 beautiful color themes with persistence
- Fortune style selector (wisdom, prediction, humor, etc.)
- Fortune history with localStorage
- Share and copy functionality
- Particle effects on cookie crack
- Full responsive design
- Support for Ollama and Hugging Face AI providers"
```

## Step 4: Push to GitHub

### Option A: Push to Existing Repository

If this is part of the awesome-generative-ai repository:

```bash
# Check current branch
git branch

# Push to current branch
git push origin <branch-name>

# Or push to main/master
git push origin main
# or
git push origin master
```

### Option B: Create New Repository

If you want to create a separate repository for just the fortune cookie app:

```bash
# Navigate to the project
cd ai-fortune-cookie

# Initialize git (if not already done)
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: AI Fortune Cookie app"

# Create a new repository on GitHub (via web interface)
# Then add remote and push:
git remote add origin https://github.com/YOUR_USERNAME/ai-fortune-cookie.git
git branch -M main
git push -u origin main
```

## Step 5: Verify on GitHub

1. Go to your GitHub repository
2. Verify all files are present
3. Check that `.env` files are NOT included (they're in .gitignore)
4. Verify `node_modules/` is NOT included

## Important Files to Verify

Make sure these are committed:
- ✅ All source code files
- ✅ `package.json` and `requirements.txt`
- ✅ `README.md` and documentation
- ✅ `.gitignore` files
- ✅ `env.example` (NOT `.env`)

Make sure these are NOT committed (in .gitignore):
- ❌ `.env` files
- ❌ `node_modules/`
- ❌ `__pycache__/`
- ❌ `frontend/build/`
- ❌ `.DS_Store`

## Adding a GitHub Actions Workflow (Optional)

Create `.github/workflows/test.yml` for automated testing:

```yaml
name: Test AI Fortune Cookie

on: [push, pull_request]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.9'
      - name: Install dependencies
        run: |
          cd ai-fortune-cookie/backend
          pip install -r requirements.txt
      - name: Test imports
        run: |
          cd ai-fortune-cookie/backend
          python -c "from backend.core import fortune_generator; print('✓ Backend imports OK')"

  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: |
          cd ai-fortune-cookie/frontend
          npm install
      - name: Build
        run: |
          cd ai-fortune-cookie/frontend
          npm run build
```

## Adding a README Badge (Optional)

Add to your README.md:

```markdown
![GitHub](https://img.shields.io/github/license/YOUR_USERNAME/awesome-generative-ai)
![Python](https://img.shields.io/badge/python-3.9+-blue.svg)
![React](https://img.shields.io/badge/react-18.2-blue.svg)
```

## Creating a Release (Optional)

For version releases:

```bash
# Tag a version
git tag -a v1.0.0 -m "AI Fortune Cookie v1.0.0 - Initial release with all features"

# Push tags
git push origin v1.0.0
```

Then create a release on GitHub with release notes.

## Troubleshooting

### "Permission denied" error
- Check your GitHub credentials: `git config --global user.name` and `git config --global user.email`
- Use SSH instead of HTTPS: `git remote set-url origin git@github.com:USERNAME/REPO.git`

### Large file errors
- Make sure `node_modules/` is in .gitignore
- If already committed: `git rm -r --cached node_modules/` then commit

### Merge conflicts
- Pull latest changes: `git pull origin main`
- Resolve conflicts, then commit and push

## Next Steps

After pushing to GitHub:
1. ✅ Add a description to the repository
2. ✅ Add topics/tags (e.g., `react`, `fastapi`, `ai`, `fortune-cookie`)
3. ✅ Consider adding a demo screenshot
4. ✅ Enable GitHub Pages if you want to host it
5. ✅ Add CONTRIBUTING.md if accepting contributions

## Quick Commands Reference

```bash
# Check status
git status

# Add files
git add ai-fortune-cookie/

# Commit
git commit -m "Your message"

# Push
git push origin main

# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1
```

Happy coding! 🚀

