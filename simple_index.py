#!/usr/bin/env python3
"""
Simple script to index documents using ColPali directly
"""

import os
import sys
from pathlib import Path
from dotenv import load_dotenv

# Add the app directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

# Load environment variables
load_dotenv()

def simple_index():
    """Simple indexing using ColPali directly"""
    print("🚀 Starting simple document indexing...")
    
    try:
        from byaldi.RAGModel import RAGMultiModalModel
        
        # Initialize the model
        print("🤖 Loading ColPali model...")
        model = RAGMultiModalModel.from_pretrained("vidore/colpali-v1.3", device="cpu")
        print("✅ Model loaded successfully")
        
        # Check docs directory
        docs_dir = Path("./docs")
        if not docs_dir.exists():
            print("❌ Error: docs directory does not exist!")
            return False
        
        # Get PDF files
        pdf_files = list(docs_dir.glob("*.pdf"))
        if not pdf_files:
            print("❌ No PDF files found in docs directory!")
            return False
        
        print(f"📁 Found {len(pdf_files)} PDF files to index")
        
        # Create index directory
        index_dir = Path("./index/advisr")
        index_dir.mkdir(parents=True, exist_ok=True)
        
        # Index each PDF
        for pdf_file in pdf_files:
            print(f"📖 Indexing {pdf_file.name}...")
            try:
                # Use the model's index method directly
                model.index(
                    input_path=str(pdf_file),
                    index_name="advisr",
                    store_collection_with_index=True
                )
                print(f"✅ {pdf_file.name} indexed successfully")
            except Exception as e:
                print(f"❌ Error indexing {pdf_file.name}: {e}")
                return False
        
        print("🎉 All documents indexed successfully!")
        
        # Test search
        print("\n🔍 Testing search...")
        try:
            results = model.search(
                query="multi-agent question generation",
                k=3,
                return_base64_results=True
            )
            print(f"✅ Search test successful! Found {len(results)} results")
            
            if results:
                for i, result in enumerate(results):
                    print(f"Result {i+1}: {type(result)}")
                    if hasattr(result, 'text'):
                        print(f"  Text: {result.text[:100]}...")
                    elif isinstance(result, dict) and 'text' in result:
                        print(f"  Text: {result['text'][:100]}...")
                    else:
                        print(f"  Content: {str(result)[:100]}...")
            
        except Exception as e:
            print(f"❌ Search test failed: {e}")
            return False
        
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = simple_index()
    if success:
        print("\n✅ Simple indexing completed successfully!")
    else:
        print("\n❌ Simple indexing failed!")
