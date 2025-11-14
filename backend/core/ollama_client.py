"""
Ollama AI Provider - Free, local AI models
"""
import aiohttp
import os
from typing import List, Dict, AsyncIterator
from .ai_provider import AIProvider, AIProviderError


class OllamaProvider(AIProvider):
    """Ollama provider for local AI models"""
    
    def __init__(self, base_url: str = None, model: str = None):
        self.base_url = base_url or os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
        self.model = model or os.getenv("DEFAULT_MODEL", "llama2")
        self._available = None
    
    async def _check_availability(self) -> bool:
        """Check if Ollama is running"""
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(f"{self.base_url}/api/tags", timeout=aiohttp.ClientTimeout(total=2)) as resp:
                    return resp.status == 200
        except:
            return False
    
    async def is_available(self) -> bool:
        """Check if Ollama is available"""
        if self._available is None:
            self._available = await self._check_availability()
        return self._available
    
    async def chat(self, messages: List[Dict[str, str]], **kwargs) -> str:
        """Send messages and get a response"""
        if not await self.is_available():
            raise AIProviderError("Ollama is not available. Make sure it's running.")
        
        model = kwargs.get("model", self.model)
        temperature = kwargs.get("temperature", 0.8)
        
        # Convert messages to Ollama format
        prompt = self._format_messages(messages)
        
        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{self.base_url}/api/generate",
                json={
                    "model": model,
                    "prompt": prompt,
                    "stream": False,
                    "options": {
                        "temperature": temperature
                    }
                }
            ) as resp:
                if resp.status != 200:
                    raise AIProviderError(f"Ollama API error: {resp.status}")
                data = await resp.json()
                return data.get("response", "")
    
    async def stream_chat(self, messages: List[Dict[str, str]], **kwargs) -> AsyncIterator[str]:
        """Stream chat responses"""
        if not await self.is_available():
            raise AIProviderError("Ollama is not available. Make sure it's running.")
        
        model = kwargs.get("model", self.model)
        temperature = kwargs.get("temperature", 0.8)
        
        prompt = self._format_messages(messages)
        
        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{self.base_url}/api/generate",
                json={
                    "model": model,
                    "prompt": prompt,
                    "stream": True,
                    "options": {
                        "temperature": temperature
                    }
                }
            ) as resp:
                if resp.status != 200:
                    raise AIProviderError(f"Ollama API error: {resp.status}")
                
                async for line in resp.content:
                    if line:
                        try:
                            import json
                            data = json.loads(line)
                            if "response" in data:
                                yield data["response"]
                        except:
                            continue
    
    def _format_messages(self, messages: List[Dict[str, str]]) -> str:
        """Format messages for Ollama prompt"""
        formatted = []
        for msg in messages:
            role = msg.get("role", "user")
            content = msg.get("content", "")
            if role == "user":
                formatted.append(f"User: {content}")
            elif role == "assistant":
                formatted.append(f"Assistant: {content}")
        formatted.append("Assistant:")
        return "\n".join(formatted)
    
    def get_model_info(self) -> Dict:
        """Get information about the current model"""
        return {
            "provider": "ollama",
            "model": self.model,
            "base_url": self.base_url,
            "local": True,
            "free": True
        }
    
    def get_default_model(self) -> str:
        return "llama2"



