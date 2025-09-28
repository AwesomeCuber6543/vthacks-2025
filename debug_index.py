#!/usr/bin/env python3
"""
Debug script to check index status and functionality
"""

import os
import sys
from dotenv import load_dotenv

# Add the app directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

# Load environment variables
load_dotenv()

from app.model_manager import model_manager

def debug_index():
    """Debug index functionality"""
    print("🔍 Debugging index functionality...")
    
    # Check if index directory exists
    index_dir = "./index/advisr"
    if os.path.exists(index_dir):
        print(f"✅ Index directory exists: {index_dir}")
        
        # List files in index directory
        files = os.listdir(index_dir)
        print(f"📁 Index files: {files}")
    else:
        print(f"❌ Index directory does not exist: {index_dir}")
        return
    
    # Try to get the model
    print("\n🤖 Testing model loading...")
    try:
        model = model_manager.get_model("advisr")
        print("✅ Model loaded successfully")
        print(f"Model type: {type(model)}")
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        return
    
    # Try to search
    print("\n🔎 Testing search...")
    try:
        results = model.search(
            query="multi-agent question generation",
            k=3,
            return_base64_results=True
        )
        print(f"✅ Search completed successfully")
        print(f"Results type: {type(results)}")
        print(f"Number of results: {len(results) if results else 0}")
        
        if results:
            for i, result in enumerate(results):
                print(f"Result {i+1}: {type(result)}")
                if isinstance(result, dict):
                    print(f"  Keys: {list(result.keys())}")
                else:
                    print(f"  Content: {str(result)[:100]}...")
        else:
            print("No results returned")
            
    except Exception as e:
        print(f"❌ Error during search: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    debug_index()
