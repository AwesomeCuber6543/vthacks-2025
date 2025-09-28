from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from app.models import (
    Test_Model, TextChunk, PerplexityQuery, UserCreate, UserUpdate, 
    FinancialData, TuitionData, ChatCreate, TableSchemaQuery, DocumentQuery, GeminiQuery
)
from app.database import db_manager
from app.document_service import document_service
import chromadb
from chromadb.config import Settings
import uuid
from datetime import datetime
import requests
import os
from dotenv import load_dotenv

load_dotenv()

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

@app.post("/query-perplexity")
def query_perplexity(perplexity_query: PerplexityQuery):
    try:
        api_key = os.getenv("PERPLEXITY_API_KEY")
        if not api_key:
            return {"status": "error", "message": "Perplexity API key not found"}
            
        url = "https://api.perplexity.ai/chat/completions"
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": "llama-3.1-sonar-small-128k-online",
            "messages": [
                {
                    "role": "user",
                    "content": perplexity_query.query
                }
            ],
            "max_tokens": 1000,
            "temperature": 0.2
        }
        
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        
        result = response.json()
        
        return {
            "status": "success",
            "query": perplexity_query.query,
            "response": result["choices"][0]["message"]["content"],
            "usage": result.get("usage", {})
        }
        
    except requests.exceptions.RequestException as e:
        return {"status": "error", "message": f"Request failed: {str(e)}"}
    except Exception as e:
        return {"status": "error", "message": f"Unexpected error: {str(e)}"}


@app.get("/db/schema/{table_name}")
def get_table_schema(table_name: str):
    """Get schema information for a specific table"""
    try:
        schema = db_manager.get_table_schema(table_name)
        return {"status": "success", "schema": schema}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting schema: {str(e)}")

@app.post("/db/users")
def create_user(user: UserCreate):
    """Create a new user"""
    try:
        user_data = user.dict()
        user_id = db_manager.upsert_user(user_data)
        return {"status": "success", "user_id": user_id, "message": "User created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating user: {str(e)}")

@app.get("/db/users")
def get_all_users():
    """Get all users"""
    try:
        users = db_manager.get_all_users()
        return {"status": "success", "users": users}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting users: {str(e)}")

@app.get("/db/users/{user_id}")
def get_user(user_id: int):
    """Get user by ID"""
    try:
        user = db_manager.get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return {"status": "success", "user": user}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting user: {str(e)}")

@app.put("/db/users/{user_id}")
def update_user(user_id: int, user_update: UserUpdate):
    """Update user information"""
    try:
        # Check if user exists
        existing_user = db_manager.get_user_by_id(user_id)
        if not existing_user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Update only provided fields
        update_data = {k: v for k, v in user_update.dict().items() if v is not None}
        if not update_data:
            return {"status": "success", "message": "No fields to update"}
        
        # Build dynamic update query
        set_clauses = [f"{k} = %s" for k in update_data.keys()]
        query = f"UPDATE user SET {', '.join(set_clauses)}, updated_at = CURRENT_TIMESTAMP WHERE user_id = %s"
        params = list(update_data.values()) + [user_id]
        
        rows_affected = db_manager.execute_update(query, tuple(params))
        return {"status": "success", "message": f"User updated successfully", "rows_affected": rows_affected}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating user: {str(e)}")

@app.get("/db/users/{user_id}/financial")
def get_financial_data(user_id: int):
    """Get financial data for a user"""
    try:
        # Check if user exists
        user = db_manager.get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        financial_data = db_manager.get_financial_data(user_id)
        return {"status": "success", "financial": financial_data}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting financial data: {str(e)}")

@app.post("/db/users/{user_id}/financial")
def upsert_financial_data(user_id: int, financial: FinancialData):
    """Add or update financial data for a user"""
    try:
        # Check if user exists
        user = db_manager.get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        financial_data = financial.dict()
        result = db_manager.upsert_financial(user_id, financial_data)
        return {"status": "success", "message": "Financial data updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating financial data: {str(e)}")

@app.get("/db/users/{user_id}/tuition")
def get_tuition_data(user_id: int):
    """Get tuition data for a user"""
    try:
        # Check if user exists
        user = db_manager.get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        tuition_data = db_manager.get_tuition_data(user_id)
        return {"status": "success", "tuition": tuition_data}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting tuition data: {str(e)}")

@app.post("/db/users/{user_id}/tuition")
def upsert_tuition_data(user_id: int, tuition: TuitionData):
    """Add or update tuition data for a user"""
    try:
        # Check if user exists
        user = db_manager.get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        tuition_data = tuition.dict()
        result = db_manager.upsert_tuition(user_id, tuition_data)
        return {"status": "success", "message": "Tuition data updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating tuition data: {str(e)}")

@app.post("/db/chat")
def add_chat(chat: ChatCreate):
    """Add a new chat entry"""
    try:
        # Check if user exists
        user = db_manager.get_user_by_id(chat.user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        chat_id = db_manager.add_chat(chat.user_id, chat.summary, chat.content)
        return {"status": "success", "chat_id": chat_id, "message": "Chat added successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding chat: {str(e)}")

@app.get("/db/users/{user_id}/chats")
def get_user_chats(user_id: int):
    """Get all chats for a specific user"""
    try:
        # Check if user exists
        user = db_manager.get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        chats = db_manager.get_user_chats(user_id)
        return {"status": "success", "chats": chats}
    except HTTPException:
        raise
    except Exception as e:
        print("error getting chats: ", e)
        raise HTTPException(status_code=500, detail=f"Error getting chats: {str(e)}")

# Document Processing APIs

@app.post("/documents/upload")
async def upload_document(file: UploadFile = File(...)):
    """Upload a document and add it to the index"""
    try:
        # Read file content
        file_content = await file.read()
        
        # Save to temp_documents
        temp_path = document_service.save_uploaded_file(file_content, file.filename)
        
        # Copy to all_documents for permanent storage
        all_docs_path = document_service.copy_to_all_documents(temp_path, file.filename)
        
        # Add to index
        success = document_service.add_to_index(temp_path)
        
        if success:
            # Clean up temp file
            document_service.cleanup_temp_file(temp_path)
            return {
                "status": "success", 
                "message": "Document uploaded and indexed successfully",
                "filename": file.filename,
                "stored_at": all_docs_path
            }
        else:
            # Clean up temp file even if indexing failed
            document_service.cleanup_temp_file(temp_path)
            raise HTTPException(status_code=500, detail="Failed to add document to index")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading document: {str(e)}")

@app.post("/documents/search")
def search_documents(query_data: DocumentQuery):
    """Search documents using ColPali"""
    try:
        results = document_service.search_documents(query_data.query, query_data.k)
        return {
            "status": "success",
            "query": query_data.query,
            "results": results
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching documents: {str(e)}")

@app.post("/documents/query-gemini")
def query_gemini_with_documents(gemini_query: GeminiQuery):
    """Query Gemini with base64 encoded images from document search"""
    try:
        response = document_service.process_with_gemini(
            gemini_query.query, 
            gemini_query.base64_images
        )
        return {
            "status": "success",
            "query": gemini_query.query,
            "response": response
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error querying Gemini: {str(e)}")

@app.get("/documents/indexed")
def get_indexed_documents():
    """Get list of all indexed documents"""
    try:
        documents = document_service.get_indexed_documents()
        return {
            "status": "success",
            "documents": documents,
            "count": len(documents)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting indexed documents: {str(e)}")

@app.post("/documents/search-and-analyze")
def search_and_analyze_documents(query_data: DocumentQuery):
    """Search documents and analyze results with Gemini in one call"""
    try:
        # Search documents
        search_results = document_service.search_documents(query_data.query, query_data.k)
        
        if not search_results:
            return {
                "status": "success",
                "query": query_data.query,
                "message": "No documents found",
                "search_results": [],
                "gemini_analysis": "No documents found to analyze."
            }
        
        # Extract base64 images from search results
        base64_images = []
        for result in search_results:
            if 'base64' in result or 'image' in result:
                # Assuming the result contains base64 data
                base64_images.append(result.get('base64', result.get('image', '')))
        
        # Analyze with Gemini
        gemini_response = document_service.process_with_gemini(
            query_data.query, 
            base64_images
        )
        
        return {
            "status": "success",
            "query": query_data.query,
            "search_results": search_results,
            "gemini_analysis": gemini_response
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in search and analyze: {str(e)}")

@app.get("/with-params")
def with_params_example(test_model: Test_Model):
    return {"test": f"my name is {test_model.name}"}

