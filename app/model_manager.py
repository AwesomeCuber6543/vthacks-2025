from byaldi import RAGMultiModalModel
from typing import Dict, Optional
import time
import threading
import os

class ModelManager:
    def __init__(self):
        self.models: Dict[str, tuple[RAGMultiModalModel, float]] = {}
        self.cache_timeout = 3600  # 1 hour
        self._start_cleanup_thread()

    def _start_cleanup_thread(self):
        def cleanup_loop():
            while True:
                self.clear_cache()
                time.sleep(300)  

        cleanup_thread = threading.Thread(target=cleanup_loop, daemon=True)
        cleanup_thread.start()

    def get_model(self, index_name: str = "advisr", device: str = "mps") -> RAGMultiModalModel:
        current_time = time.time()
        
        # Check if model exists
        if index_name in self.models:
            model, _ = self.models[index_name]
            # Update timestamp on access
            self.models[index_name] = (model, current_time)
            return model    
        
        # Load new model
        model = RAGMultiModalModel.from_index(
            index_path="../index/advisr", 
            index_root="./index", 
            device=device
        )
        
        # Cache model with timestamp
        self.models[index_name] = (model, current_time)
        return model

    def add_to_index(self, input_path: str, index_name: str = "advisr") -> bool:
        """Add documents to the specified index"""
        try:
            model = self.get_model(index_name)
            model.add_to_index(
                input_item=input_path, 
                store_collection_with_index=True
            )
            return True
        except Exception as e:
            print(f"Error adding to index: {e}")
            return False

    def search(self, query: str, k: int = 3, index_name: str = "advisr", return_base64_results: bool = True):
        """Search the specified index"""
        try:
            model = self.get_model(index_name)
            return model.search(
                query=query, 
                k=k, 
                return_base64_results=return_base64_results
            )
        except Exception as e:
            print(f"Error searching index: {e}")
            return []

    def create_index(self, input_path: str, index_name: str = "advisr") -> bool:
        """Create a new index with documents"""
        try:
            model = self.get_model(index_name)
            model.index(
                input_path=input_path, 
                index_name=index_name, 
                store_collection_with_index=True
            )
            return True
        except Exception as e:
            print(f"Error creating index: {e}")
            return False

    def clear_cache(self):
        current_time = time.time()
        expired_keys = [
            key for key, (_, timestamp) in self.models.items() 
            if current_time - timestamp > self.cache_timeout
        ]
        for key in expired_keys:
            del self.models[key]
            print(f"Cleared model for index {key} from cache")

# Global model manager instance
model_manager = ModelManager()

    