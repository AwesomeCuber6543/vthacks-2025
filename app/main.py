from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models import Test_Model, TextChunk
import chromadb
from chromadb.config import Settings
import uuid

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

collection = client.get_or_create_collection(name="text_chunks")

@app.get("/")
def hello():
    return {"test": "true"}

@app.post("/index-text")
def index_text(text_chunk: TextChunk):
    doc_id = str(uuid.uuid4())
    collection.add(
        documents=[text_chunk.text],
        metadatas=[text_chunk.metadata],
        ids=[doc_id]
    )
    return {"status": "success", "document_id": doc_id}

@app.get("/search-text")
def search_text(query: str, n_results: int = 5):
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

@app.get("/with-params")
def with_params_example(test_model: Test_Model):
    return {"test": f"my name is {test_model.name}"}

