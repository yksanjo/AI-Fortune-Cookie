#!/bin/bash
# Start script for Render/Railway deployment

# Change to backend directory
cd "$(dirname "$0")"

# Set PYTHONPATH to include parent directory
export PYTHONPATH="${PYTHONPATH}:$(pwd)/.."

# Start the server
python -m uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}

