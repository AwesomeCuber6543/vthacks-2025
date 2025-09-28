from byaldi import RAGMultiModalModel

RAG = RAGMultiModalModel.from_pretrained(
    "vidore/colpali-v1.3", index_root="./index", device="mps"
)

RAG.index(input_path="./indexed_docs", index_name="test", store_collection_with_index=True)

RAG.add_to_index(input_item="./data/inputted", store_collection_with_index=True)

RAG.search(query="query", k=3, return_base64_results=True)
