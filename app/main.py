from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models import Test_Model, TextChunk
import chromadb
from chromadb.config import Settings
import uuid
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = chromadb.Client(Settings(
    persist_directory="./chroma_db",
    anonymized_telemetry=False
))

def get_collection():
    return client.get_or_create_collection(name="text_chunks")

@app.get("/")
def hello():
    return {"test": "true"}

@app.post("/index-text")
def index_text(text_chunk: TextChunk):
    doc_id = str(uuid.uuid4())
    collection = get_collection()
    
    # ChromaDB requires non-empty metadata, so we add a default field if empty
    if not text_chunk.metadata:
        metadata = {"indexed_at": datetime.now().isoformat()}
    else:
        metadata = text_chunk.metadata
    
    collection.add(
        documents=[text_chunk.text],
        metadatas=[metadata],
        ids=[doc_id]
    )
    return {"status": "success", "document_id": doc_id}

@app.get("/search-text")
def search_text(query: str, n_results: int = 5):
    collection = get_collection()
    results = collection.query(
        query_texts=[query],
        n_results=n_results
    )
    return {
        "query": query,
        "results": [
            {
                "text": doc,
                "metadata": meta,
                "distance": dist
            }
            for doc, meta, dist in zip(
                results["documents"][0],
                results["metadatas"][0],
                results["distances"][0]
            )
        ]
    }

@app.delete("/delete-index")
def delete_index():
    try:
        client.delete_collection(name="text_chunks")
        return {"status": "success", "message": "Index deleted successfully"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/with-params")
def with_params_example(test_model: Test_Model):
    return {"test": f"my name is {test_model.name}"}

