"""
Fortune Generator - Creates AI-powered fortunes
"""
import random
from typing import List, Dict
from .ai_provider import AIProvider


class FortuneGenerator:
    """Generates creative fortunes using AI"""
    
    # Fortune templates and styles
    FORTUNE_STYLES = [
        "wisdom",
        "prediction",
        "motivation",
        "humor",
        "love",
        "success",
        "adventure"
    ]
    
    SYSTEM_PROMPTS = {
        "wisdom": "You are a wise fortune cookie writer. Write a short, profound piece of wisdom (1-2 sentences) that inspires reflection. Keep it under 20 words.",
        "prediction": "You are a fortune cookie writer. Write a fun, lighthearted prediction about the future (1-2 sentences). Keep it under 20 words.",
        "motivation": "You are a motivational fortune cookie writer. Write an inspiring, uplifting message (1-2 sentences). Keep it under 20 words.",
        "humor": "You are a funny fortune cookie writer. Write a humorous, witty fortune (1-2 sentences). Keep it under 20 words.",
        "love": "You are a romantic fortune cookie writer. Write a sweet message about love, friendship, or relationships (1-2 sentences). Keep it under 20 words.",
        "success": "You are a fortune cookie writer focused on success. Write an encouraging message about achievement and growth (1-2 sentences). Keep it under 20 words.",
        "adventure": "You are a fortune cookie writer. Write an exciting message about adventure, exploration, or new experiences (1-2 sentences). Keep it under 20 words."
    }
    
    def __init__(self, ai_provider: AIProvider):
        self.ai_provider = ai_provider
    
    async def generate_fortune(self, style: str = None) -> Dict[str, str]:
        """
        Generate a fortune using AI
        
        Args:
            style: Optional style of fortune (wisdom, prediction, etc.)
                   If None, randomly selects a style
        
        Returns:
            Dictionary with 'fortune' text and 'style' name
        """
        if style is None:
            style = random.choice(self.FORTUNE_STYLES)
        
        if style not in self.SYSTEM_PROMPTS:
            style = "wisdom"
        
        system_prompt = self.SYSTEM_PROMPTS[style]
        
        # Create messages for AI
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": "Generate a fortune cookie message now."}
        ]
        
        try:
            # Get AI response
            response = await self.ai_provider.chat(
                messages,
                temperature=0.9  # Higher temperature for more creativity
            )
            
            # Clean up the response
            fortune = self._clean_fortune(response)
            
            return {
                "fortune": fortune,
                "style": style
            }
        except Exception as e:
            # Fallback to a default fortune if AI fails
            return {
                "fortune": self._get_fallback_fortune(style),
                "style": style,
                "error": str(e)
            }
    
    def _clean_fortune(self, text: str) -> str:
        """Clean and format the fortune text"""
        # Remove quotes if present
        text = text.strip().strip('"').strip("'")
        
        # Remove common prefixes
        prefixes = ["Fortune:", "Your fortune:", "Fortune cookie says:", "Here's your fortune:"]
        for prefix in prefixes:
            if text.lower().startswith(prefix.lower()):
                text = text[len(prefix):].strip()
        
        # Limit length (fortune cookies are short!)
        if len(text) > 150:
            # Try to cut at a sentence boundary
            sentences = text.split('.')
            if len(sentences) > 1:
                text = '. '.join(sentences[:2]).strip()
                if not text.endswith('.'):
                    text += '.'
            else:
                text = text[:147] + "..."
        
        return text
    
    def _get_fallback_fortune(self, style: str) -> str:
        """Get a fallback fortune if AI generation fails"""
        fallbacks = {
            "wisdom": "The journey of a thousand miles begins with a single step.",
            "prediction": "A pleasant surprise awaits you in the near future.",
            "motivation": "Your determination will lead you to great success.",
            "humor": "You will find great joy in the simple things... like fortune cookies!",
            "love": "A new friendship will bring you happiness and joy.",
            "success": "Your hard work will soon pay off in unexpected ways.",
            "adventure": "An exciting opportunity will present itself when you least expect it."
        }
        return fallbacks.get(style, fallbacks["wisdom"])



