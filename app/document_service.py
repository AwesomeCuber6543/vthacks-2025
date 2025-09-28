import os
import shutil
from pathlib import Path
import google.generativeai as genai
from typing import List, Dict, Any
import base64
from dotenv import load_dotenv
from app.model_manager import model_manager

# Load environment variables
load_dotenv()

class DocumentService:
    def __init__(self):
        
        # Initialize Gemini
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        self.gemini_model = genai.GenerativeModel('gemini-1.5-flash')
        
        # Create necessary directories
        self.temp_dir = Path("./temp_documents")
        self.all_docs_dir = Path("./all_documents")
        self.indexed_docs_dir = Path("./indexed_docs")
        
        for directory in [self.temp_dir, self.all_docs_dir, self.indexed_docs_dir]:
            directory.mkdir(exist_ok=True)
    
    def save_uploaded_file(self, file_content: bytes, filename: str) -> str:
        """Save uploaded file to temp_documents folder"""
        temp_path = self.temp_dir / filename
        with open(temp_path, "wb") as f:
            f.write(file_content)
        return str(temp_path)
    
    def copy_to_all_documents(self, file_path: str, filename: str) -> str:
        """Copy file to all_documents folder for permanent storage"""
        all_docs_path = self.all_docs_dir / filename
        shutil.copy2(file_path, all_docs_path)
        return str(all_docs_path)
    
    def add_to_index(self, file_path: str) -> bool:
        """Add document to the RAG index"""
        try:
            return model_manager.add_to_index(file_path, "advisr")
        except Exception as e:
            print(f"Error adding to index: {e}")
            return False
    
    def cleanup_temp_file(self, file_path: str) -> None:
        """Delete file from temp_documents folder"""
        try:
            os.remove(file_path)
        except Exception as e:
            print(f"Error cleaning up temp file: {e}")
    
    def search_documents(self, query: str, k: int = 3) -> List[Dict[str, Any]]:
        """Search documents and return base64 results"""
        try:
            return model_manager.search(query, k, "advisr", True)
        except Exception as e:
            print(f"Error searching documents: {e}")
            return []
    
    def process_with_gemini(self, query: str, base64_images: List[str]) -> str:
        """Process query and base64 images with Gemini"""
        try:
            # Prepare content for Gemini
            content_parts = [f"Query: {query}\n\nPlease analyze the following images and provide insights:"]
            
            for i, base64_img in enumerate(base64_images):
                content_parts.append({
                    "mime_type": "image/jpeg",  # Assuming JPEG, could be made dynamic
                    "data": base64_img
                })
            
            response = self.gemini_model.generate_content(content_parts)
            return response.text
        except Exception as e:
            print(f"Error processing with Gemini: {e}")
            return f"Error processing with Gemini: {str(e)}"
    
    def get_indexed_documents(self) -> List[str]:
        """Get list of all indexed documents"""
        try:
            if self.indexed_docs_dir.exists():
                return [f.name for f in self.indexed_docs_dir.iterdir() if f.is_file()]
            return []
        except Exception as e:
            print(f"Error getting indexed documents: {e}")
            return []

# Global document service instance
document_service = DocumentService()
