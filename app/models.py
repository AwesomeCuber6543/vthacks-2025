from pydantic import BaseModel
from typing import Optional

class Test_Model(BaseModel):
    name: str

class TextChunk(BaseModel):
    text: str
    metadata: Optional[dict] = {}
