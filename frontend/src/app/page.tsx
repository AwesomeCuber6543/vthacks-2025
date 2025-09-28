'use client'

import { useState } from 'react'
import MyInfo from '../components/MyInfo'
import RecentRecaps from '../components/RecentRecaps'
import PersonalInfo from '../components/PersonalInfo'
import Recap from '../components/Recap'
import DocumentUpload from '../components/DocumentUpload'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'recent-recaps' | 'personal-info' | 'recap' | 'documents'>('recent-recaps')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-vt-maroon shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-vt-orange rounded-lg flex items-center justify-center">
                <span className="text-vt-maroon font-bold text-xl">A</span>
              </div>
              <h1 className="text-2xl font-bold text-vt-white">Advisr.ai</h1>
            </div>

            {/* Navigation */}
            <nav className="flex space-x-1">
              <button
                onClick={() => setActiveTab('recent-recaps')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'recent-recaps'
                    ? 'bg-vt-orange text-vt-maroon shadow-lg'
                    : 'text-vt-white hover:bg-vt-orange/20 hover:text-vt-orange'
                }`}
              >
                Recent Recaps
              </button>
              <button
                onClick={() => setActiveTab('personal-info')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'personal-info'
                    ? 'bg-vt-orange text-vt-maroon shadow-lg'
                    : 'text-vt-white hover:bg-vt-orange/20 hover:text-vt-orange'
                }`}
              >
                Personal Information
              </button>
              <button
                onClick={() => setActiveTab('recap')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'recap'
                    ? 'bg-vt-orange text-vt-maroon shadow-lg'
                    : 'text-vt-white hover:bg-vt-orange/20 hover:text-vt-orange'
                }`}
              >
                Analysis
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'documents'
                    ? 'bg-vt-orange text-vt-maroon shadow-lg'
                    : 'text-vt-white hover:bg-vt-orange/20 hover:text-vt-orange'
                }`}
              >
                Documents
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'recent-recaps' && (
          <div className="space-y-8">
            <MyInfo />
            <DocumentUpload />
            <RecentRecaps />
          </div>
        )}
        {activeTab === 'personal-info' && <PersonalInfo />}
        {activeTab === 'recap' && <Recap />}
        {activeTab === 'documents' && <DocumentUpload />}
      </main>
    </div>
  )
}
