"""
Hugging Face Inference API Provider - Free tier available
"""
import aiohttp
import os
from typing import List, Dict, AsyncIterator
from .ai_provider import AIProvider, AIProviderError


class HuggingFaceProvider(AIProvider):
    """Hugging Face Inference API provider"""
    
    def __init__(self, api_key: str = None, model: str = None):
        self.api_key = api_key or os.getenv("HUGGINGFACE_API_KEY")
        self.model = model or os.getenv("DEFAULT_MODEL", "gpt2")
        self.base_url = "https://api-inference.huggingface.co/models"
    
    async def is_available(self) -> bool:
        """Check if Hugging Face API is available"""
        return self.api_key is not None
    
    async def chat(self, messages: List[Dict[str, str]], **kwargs) -> str:
        """Send messages and get a response"""
        if not await self.is_available():
            raise AIProviderError("Hugging Face API key not set")
        
        model = kwargs.get("model", self.model)
        
        # Get the last user message
        user_messages = [msg for msg in messages if msg.get("role") == "user"]
        if not user_messages:
            raise AIProviderError("No user message found")
        
        prompt = user_messages[-1].get("content", "")
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{self.base_url}/{model}",
                headers=headers,
                json={"inputs": prompt},
                timeout=aiohttp.ClientTimeout(total=30)
            ) as resp:
                if resp.status == 503:
                    # Model is loading, wait a bit
                    raise AIProviderError("Model is loading, please try again in a moment")
                elif resp.status != 200:
                    error_text = await resp.text()
                    raise AIProviderError(f"Hugging Face API error: {resp.status} - {error_text}")
                
                data = await resp.json()
                
                # Handle different response formats
                if isinstance(data, list) and len(data) > 0:
                    if "generated_text" in data[0]:
                        return data[0]["generated_text"]
                    elif "summary_text" in data[0]:
                        return data[0]["summary_text"]
                
                return str(data)
    
    async def stream_chat(self, messages: List[Dict[str, str]], **kwargs) -> AsyncIterator[str]:
        """Stream chat responses (Hugging Face doesn't support streaming well, so we simulate it)"""
        response = await self.chat(messages, **kwargs)
        # Simulate streaming by yielding chunks
        words = response.split()
        for word in words:
            yield word + " "
    
    def get_model_info(self) -> Dict:
        """Get information about the current model"""
        return {
            "provider": "huggingface",
            "model": self.model,
            "free_tier": True,
            "requires_api_key": True
        }
    
    def get_default_model(self) -> str:
        return "gpt2"

