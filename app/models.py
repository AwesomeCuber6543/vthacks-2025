from pydantic import BaseModel
from typing import Optional, Dict, Any, List

class Test_Model(BaseModel):
    name: str

class TextChunk(BaseModel):
    text: str
    metadata: Optional[Dict[str, Any]] = None

class PerplexityQuery(BaseModel):
    query: str

class UserCreate(BaseModel):
    first: str
    last: str
    school: Optional[str] = None
    grad_year: Optional[int] = None
    major: Optional[str] = None
    instate: Optional[bool] = False
    state: Optional[str] = None
    country: Optional[str] = "USA"

class UserUpdate(BaseModel):
    first: Optional[str] = None
    last: Optional[str] = None
    school: Optional[str] = None
    grad_year: Optional[int] = None
    major: Optional[str] = None
    instate: Optional[bool] = None
    state: Optional[str] = None
    country: Optional[str] = None

class FinancialData(BaseModel):
    salary: Optional[float] = None
    credit_score: Optional[int] = None
    savings: Optional[float] = None

class TuitionData(BaseModel):
    tuition_full: float
    scholarship: Optional[float] = 0

class ChatCreate(BaseModel):
    user_id: int
    summary: str
    content: str

class TableSchemaQuery(BaseModel):
    table_name: str

class DocumentQuery(BaseModel):
    query: str
    k: int = 3

class GeminiQuery(BaseModel):
    query: str
    base64_images: List[str]
