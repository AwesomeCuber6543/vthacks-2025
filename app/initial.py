#!/usr/bin/env python3
"""
Initialization script for Advisr.ai
This script loads the initial models, creates a blank index called 'advisr',
and indexes documents from the docs folder.
"""

import os
import sys
from pathlib import Path
from dotenv import load_dotenv
from app.model_manager import model_manager

def main():
    """Initialize the Advisr.ai system"""
    print("🚀 Initializing Advisr.ai...")
    
    # Load environment variables
    load_dotenv()
    
    # Check if docs folder exists
    docs_folder = Path("./docs")
    if not docs_folder.exists():
        print("❌ Docs folder not found. Creating empty docs folder...")
        docs_folder.mkdir(exist_ok=True)
        print("✅ Created docs folder. Please add your documents there.")
        return
    
    # Check if there are documents in the docs folder
    doc_files = list(docs_folder.glob("*"))
    if not doc_files:
        print("⚠️  No documents found in docs folder. Creating empty index...")
        # Create empty index
        success = model_manager.create_index(str(docs_folder), "advisr")
        if success:
            print("✅ Empty 'advisr' index created successfully!")
        else:
            print("❌ Failed to create empty index")
        return
    
    print(f"📁 Found {len(doc_files)} documents in docs folder")
    
    # Create the advisr index with documents
    print("🔄 Creating 'advisr' index with documents...")
    success = model_manager.create_index(str(docs_folder), "advisr")
    
    if success:
        print("✅ 'advisr' index created successfully!")
        print(f"📊 Indexed {len(doc_files)} documents")
        
        # List the indexed documents
        print("\n📋 Indexed documents:")
        for i, doc in enumerate(doc_files, 1):
            print(f"  {i}. {doc.name}")
            
    else:
        print("❌ Failed to create index")
        sys.exit(1)
    
    print("\n🎉 Advisr.ai initialization complete!")
    print("🔍 You can now search documents using the API endpoints")

if __name__ == "__main__":
    main()
