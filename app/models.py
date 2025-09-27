from pydantic import BaseModel

class Test_Model(BaseModel):
    name: str

class TextChunk(BaseModel):
    text: str
    metadata: dict = {}
