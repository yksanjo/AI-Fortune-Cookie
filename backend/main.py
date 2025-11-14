"""
FastAPI backend for AI Fortune Cookie
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv

from backend.core.ollama_client import OllamaProvider
from backend.core.huggingface_client import HuggingFaceProvider
from backend.core.fortune_generator import FortuneGenerator

# Load environment variables
load_dotenv()

app = FastAPI(title="AI Fortune Cookie API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize providers
ollama_provider = OllamaProvider()
hf_provider = HuggingFaceProvider()

# Fortune generator (will be initialized with available provider)
fortune_generator = None


class FortuneRequest(BaseModel):
    style: Optional[str] = None
    provider: Optional[str] = None


class FortuneResponse(BaseModel):
    fortune: str
    style: str
    provider: str


@app.on_event("startup")
async def startup():
    """Initialize fortune generator on startup"""
    global fortune_generator
    # Check providers asynchronously
    ollama_available = await ollama_provider.is_available()
    hf_available = await hf_provider.is_available()
    
    if ollama_available:
        fortune_generator = FortuneGenerator(ollama_provider)
        print("✓ Fortune generator initialized with Ollama")
    elif hf_available:
        fortune_generator = FortuneGenerator(hf_provider)
        print("✓ Fortune generator initialized with Hugging Face")
    else:
        print("⚠ Warning: No AI provider available. Fortunes will use fallback messages.")


@app.get("/")
async def root():
    return {
        "message": "AI Fortune Cookie API",
        "status": "running",
        "fortune_generator_ready": fortune_generator is not None
    }


@app.get("/health")
async def health():
    """Check health of AI providers"""
    ollama_available = await ollama_provider.is_available()
    hf_available = await hf_provider.is_available()
    
    return {
        "ollama": ollama_available,
        "huggingface": hf_available,
        "providers_available": sum([ollama_available, hf_available]),
        "fortune_generator_ready": fortune_generator is not None
    }


@app.post("/fortune", response_model=FortuneResponse)
async def get_fortune(request: FortuneRequest = FortuneRequest()):
    """Generate a fortune cookie message"""
    # Determine which provider to use
    provider = None
    provider_name = request.provider or os.getenv("DEFAULT_PROVIDER", "ollama")
    
    if provider_name == "ollama" and await ollama_provider.is_available():
        provider = ollama_provider
    elif provider_name == "huggingface" and await hf_provider.is_available():
        provider = hf_provider
    else:
        # Try to find any available provider
        if await ollama_provider.is_available():
            provider = ollama_provider
            provider_name = "ollama"
        elif await hf_provider.is_available():
            provider = hf_provider
            provider_name = "huggingface"
    
    if not provider:
        raise HTTPException(
            status_code=503,
            detail="No AI provider is available. Please set up Ollama or Hugging Face API key."
        )
    
    # Create fortune generator with selected provider
    generator = FortuneGenerator(provider)
    
    # Generate fortune
    try:
        result = await generator.generate_fortune(style=request.style)
        return FortuneResponse(
            fortune=result["fortune"],
            style=result["style"],
            provider=provider_name
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating fortune: {str(e)}")


@app.get("/styles")
async def get_styles():
    """Get available fortune styles"""
    from backend.core.fortune_generator import FortuneGenerator
    return {
        "styles": FortuneGenerator.FORTUNE_STYLES,
        "descriptions": {
            "wisdom": "Life advice and philosophical insights",
            "prediction": "Fun predictions about your day",
            "motivation": "Inspirational messages",
            "humor": "Light-hearted, funny fortunes",
            "love": "Relationship and friendship advice",
            "success": "Messages about achievement and growth",
            "adventure": "Messages about exploration and new experiences"
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

