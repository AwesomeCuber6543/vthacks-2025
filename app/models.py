from pydantic import BaseModel
from typing import Optional, Dict, Any

class Test_Model(BaseModel):
    name: str

class TextChunk(BaseModel):
    text: str
    metadata: Optional[Dict[str, Any]] = None
