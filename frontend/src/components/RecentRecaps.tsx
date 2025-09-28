'use client'

import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { chatAPI } from '../services/api'
import { MessageSquare, Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react'

interface CallSummary {
  chat_id: number
  summary: string
  content: string
  created_at: string
  updated_at: string
}

export default function RecentRecaps() {
  const [expandedRecaps, setExpandedRecaps] = useState<Set<number>>(new Set())
  const [recentCalls, setRecentCalls] = useState<CallSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Hardcoded user_id = 1
  const userId = 1

  useEffect(() => {
    loadRecentChats()
  }, [])

  const loadRecentChats = async () => {
    try {
      setIsLoading(true)
      const response = await chatAPI.getUserChats(userId)
      // Get the 4 most recent chats
      const recentChats = response.chats?.slice(0, 4) || []
      setRecentCalls(recentChats)
    } catch (error) {
      console.error('Error loading recent chats:', error)
      setError('Failed to load recent reports')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleRecapDetails = (id: number) => {
    setExpandedRecaps(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Recent Reports</h2>
          <p className="text-white/80 text-lg">
            Your 4 most recent financial advisory reports
          </p>
        </div>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vt-orange"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Recent Reports</h2>
          <p className="text-white/80 text-lg">
            Your 4 most recent financial advisory reports
          </p>
        </div>
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Recent Reports</h2>
        <p className="text-white/80 text-lg">
          Your 4 most recent financial advisory reports
        </p>
      </div>

      {/* Recent Reports List */}
      <div className="space-y-4">
        {recentCalls.map((call) => (
          <div key={call.chat_id} className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
            {/* Report Header */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                    <MessageSquare className="w-5 h-5 text-vt-orange mr-2" />
                    {call.summary}
                  </h3>
                  <div className="flex items-center space-x-4 text-white/70 text-sm">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{formatDate(call.created_at)}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleRecapDetails(call.chat_id)}
                  className="ml-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  {expandedRecaps.has(call.chat_id) ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Detailed Report Content Dropdown */}
            {expandedRecaps.has(call.chat_id) && (
              <div className="px-6 pb-6 border-t border-white/10">
                <div className="pt-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Report Details</h4>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-white/90 prose-strong:text-white prose-em:text-white/80 prose-ul:text-white/90 prose-ol:text-white/90 prose-li:text-white/90 prose-li:marker:text-vt-orange prose-table:text-white/90 prose-th:text-white prose-th:bg-white/10 prose-td:text-white/90 prose-td:border-white/20 prose-a:text-vt-orange prose-a:hover:text-vt-orange/80 prose-code:text-vt-orange prose-code:bg-white/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10">
                      <ReactMarkdown>{call.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State (if no reports) */}
      {recentCalls.length === 0 && (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20 text-center">
          <div className="w-20 h-20 bg-vt-orange/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-10 h-10 text-vt-orange" />
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-4">No Recent Reports</h3>
          <p className="text-white/70 mb-6 max-w-md mx-auto">
            Your recent financial advisory reports will appear here once you start using the analysis features.
          </p>
        </div>
      )}
    </div>
  )
}
