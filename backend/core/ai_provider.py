"""
Base AI Provider interface
"""
from abc import ABC, abstractmethod
from typing import List, Dict, AsyncIterator


class AIProviderError(Exception):
    """Exception raised by AI providers"""
    pass


class AIProvider(ABC):
    """Base class for AI providers"""
    
    @abstractmethod
    async def is_available(self) -> bool:
        """Check if the provider is available"""
        pass
    
    @abstractmethod
    async def chat(self, messages: List[Dict[str, str]], **kwargs) -> str:
        """Send messages and get a response"""
        pass
    
    @abstractmethod
    async def stream_chat(self, messages: List[Dict[str, str]], **kwargs) -> AsyncIterator[str]:
        """Stream chat responses"""
        pass
    
    @abstractmethod
    def get_model_info(self) -> Dict:
        """Get information about the current model"""
        pass
    
    @abstractmethod
    def get_default_model(self) -> str:
        """Get the default model name"""
        pass

