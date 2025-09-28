'use client'

import { useState, useEffect } from 'react'
import { documentAPI, chatAPI } from '../services/api'
import { Search, FileText, Brain, Loader2, MessageSquare } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

export default function Recap() {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any>(null)
  const [recentChats, setRecentChats] = useState<any[]>([])
  const [userId] = useState<number>(1) // Hardcoded user_id = 1

  useEffect(() => {
    loadRecentChats(userId)
  }, [userId])

  const loadRecentChats = async (userId: number) => {
    try {
      const response = await chatAPI.getUserChats(userId)
      setRecentChats(response.chats || [])
    } catch (error) {
      console.error('Error loading recent chats:', error)
    }
  }

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsSearching(true)
    try {
      const response = await documentAPI.searchAndAnalyze(query, 3)
      setSearchResults(response)

      // Save the search as a chat
      await chatAPI.addChat({
        user_id: userId,
        summary: `Document search: ${query}`,
        content: `# Document Search Results\n\n**Query:** ${query}\n\n**Analysis:**\n${response.gemini_analysis}`
      })
      loadRecentChats(userId)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Search Section */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
        <div className="flex items-center mb-6">
          <Search className="w-6 h-6 text-vt-orange mr-3" />
          <h2 className="text-2xl font-bold text-white">Document Analysis</h2>
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your financial documents..."
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-vt-orange focus:ring-1 focus:ring-vt-orange"
          />
          <button
            onClick={handleSearch}
            disabled={isSearching || !query.trim()}
            className="px-6 py-3 bg-vt-orange text-vt-maroon font-semibold rounded-lg hover:bg-vt-orange/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isSearching ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Search Results */}
      {searchResults && (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="flex items-center mb-6">
            <Brain className="w-6 h-6 text-vt-orange mr-3" />
            <h3 className="text-xl font-bold text-white">AI Analysis</h3>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{searchResults.gemini_analysis}</ReactMarkdown>
          </div>

          {searchResults.search_results && searchResults.search_results.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-white mb-4">Relevant Documents</h4>
              <div className="grid gap-4">
                {searchResults.search_results.map((result: any, index: number) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center mb-2">
                      <FileText className="w-4 h-4 text-vt-orange mr-2" />
                      <span className="text-white font-medium">Document {index + 1}</span>
                    </div>
                    <p className="text-white/70 text-sm">
                      {result.text || result.content || 'Document content not available'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Recent Chats */}
      {recentChats.length > 0 && (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="flex items-center mb-6">
            <MessageSquare className="w-6 h-6 text-vt-orange mr-3" />
            <h3 className="text-xl font-bold text-white">Recent Analysis</h3>
          </div>
          
          <div className="space-y-4">
            {recentChats.slice(0, 5).map((chat: any) => (
              <div key={chat.chat_id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">{chat.summary}</h4>
                  <span className="text-white/50 text-sm">
                    {new Date(chat.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>{chat.content}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!searchResults && recentChats.length === 0 && (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20 text-center">
          <div className="w-20 h-20 bg-vt-orange/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-vt-orange" />
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-4">No Analysis Available Yet</h3>
          <p className="text-white/70 mb-6 max-w-md mx-auto">
            Upload your financial documents and search for insights to get started with your AI-powered financial analysis.
          </p>
        </div>
      )}
    </div>
  )
}