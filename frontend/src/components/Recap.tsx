'use client'

export default function Recap() {
  // Empty state - no data available yet
  const hasData = false

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Financial Summary</h2>
        <p className="text-white/80 text-lg">
          Your personalized financial analysis and recommendations will appear here
        </p>
      </div>

      {/* Empty State */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20 text-center">
        <div className="w-20 h-20 bg-vt-orange/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-vt-orange"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-4">No Analysis Available Yet</h3>
        <p className="text-white/70 mb-6 max-w-md mx-auto">
          Upload your financial documents and fill out your personal information to get started with your AI-powered financial analysis.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-vt-orange/20 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-vt-orange" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-white font-medium">Step 1</span>
            </div>
            <p className="text-white/70 text-sm">Upload Documents</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-vt-orange/20 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-vt-orange" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-white font-medium">Step 2</span>
            </div>
            <p className="text-white/70 text-sm">Personal Information</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-vt-orange/20 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-vt-orange" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-white font-medium">Step 3</span>
            </div>
            <p className="text-white/70 text-sm">Get Analysis</p>
          </div>
        </div>
      </div>
    </div>
  )
}