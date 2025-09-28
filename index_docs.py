#!/usr/bin/env python3
"""
Script to index all documents in the docs folder into the ColPali index.
This creates an initial index that can be loaded when the application starts.
"""

import os
import sys
from pathlib import Path
from dotenv import load_dotenv

# Add the app directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

# Load environment variables
load_dotenv()

from app.model_manager import model_manager
from app.document_service import document_service

def index_documents():
    """Index all documents in the docs folder"""
    print("🚀 Starting document indexing process...")
    
    # Ensure the docs directory exists
    docs_dir = Path("./docs")
    if not docs_dir.exists():
        print("❌ Error: docs directory does not exist!")
        print("Please create a 'docs' directory and add your documents to it.")
        return False
    
    # Get all files in the docs directory
    doc_files = []
    for ext in ['*.pdf', '*.txt', '*.doc', '*.docx', '*.md']:
        doc_files.extend(docs_dir.glob(ext))
    
    if not doc_files:
        print("❌ No documents found in the docs directory!")
        print("Supported formats: PDF, TXT, DOC, DOCX, MD")
        return False
    
    print(f"📁 Found {len(doc_files)} documents to index:")
    for doc_file in doc_files:
        print(f"   - {doc_file.name}")
    
    # Initialize the model manager and create index
    print("\n🤖 Initializing AI models...")
    try:
        # Get the model (this will load it if not already loaded)
        model = model_manager.get_model()
        print("✅ Model loaded successfully")
        
        # Create the index
        print("📚 Creating index 'advisr'...")
        model_manager.create_index("advisr")
        print("✅ Index created successfully")
        
    except Exception as e:
        print(f"❌ Error initializing models: {e}")
        return False
    
    # Index each document
    print("\n📖 Indexing documents...")
    success_count = 0
    error_count = 0
    
    for doc_file in doc_files:
        try:
            print(f"   Indexing {doc_file.name}...")
            
            # Add document to index
            success = document_service.add_to_index(str(doc_file))
            
            if success:
                print(f"   ✅ {doc_file.name} indexed successfully")
                success_count += 1
            else:
                print(f"   ❌ Failed to index {doc_file.name}")
                error_count += 1
                
        except Exception as e:
            print(f"   ❌ Error indexing {doc_file.name}: {e}")
            error_count += 1
    
    # Summary
    print(f"\n📊 Indexing Summary:")
    print(f"   ✅ Successfully indexed: {success_count} documents")
    print(f"   ❌ Failed to index: {error_count} documents")
    print(f"   📁 Total documents: {len(doc_files)}")
    
    if success_count > 0:
        print(f"\n🎉 Indexing completed! {success_count} documents are now searchable.")
        print("You can now use the document search functionality in your application.")
        return True
    else:
        print("\n❌ No documents were successfully indexed.")
        return False

def main():
    """Main function"""
    print("=" * 60)
    print("📚 Document Indexing Script")
    print("=" * 60)
    
    # Check if we're in the right directory
    if not os.path.exists("app"):
        print("❌ Error: Please run this script from the project root directory")
        print("The script should be run from: /Users/yahiasalman/Desktop/vthacks-2025")
        return
    
    # Check if docs directory exists
    if not os.path.exists("docs"):
        print("❌ Error: 'docs' directory not found!")
        print("Please create a 'docs' directory and add your documents to it.")
        print("Example: mkdir docs")
        return
    
    # Run the indexing process
    success = index_documents()
    
    if success:
        print("\n✅ Document indexing completed successfully!")
        print("You can now start your application and use the document search features.")
    else:
        print("\n❌ Document indexing failed!")
        print("Please check the error messages above and try again.")

if __name__ == "__main__":
    main()
