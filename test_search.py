#!/usr/bin/env python3
"""
Test script to verify document search functionality
"""

import os
import sys
from dotenv import load_dotenv

# Add the app directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

# Load environment variables
load_dotenv()

from app.document_service import document_service

def test_search():
    """Test document search functionality"""
    print("🔍 Testing document search functionality...")
    
    # Test queries
    test_queries = [
        "multi-agent question generation",
        "NeurIPS workshop",
        "machine learning",
        "question answering",
        "AI research"
    ]
    
    for query in test_queries:
        print(f"\n🔎 Searching for: '{query}'")
        try:
            results = document_service.search_documents(query, k=3)
            print(f"   Found {len(results)} results")
            
            for i, result in enumerate(results, 1):
                print(f"   {i}. Score: {result.get('score', 'N/A'):.3f}")
                print(f"      Text: {result.get('text', 'N/A')[:100]}...")
                print(f"      Metadata: {result.get('metadata', {})}")
                
        except Exception as e:
            print(f"   ❌ Error: {e}")

if __name__ == "__main__":
    test_search()
