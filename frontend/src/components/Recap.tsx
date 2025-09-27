'use client'

export default function Recap() {
  // Mock data for demonstration
  const mockSummary = {
    totalDocuments: 3,
    analysisDate: new Date().toLocaleDateString(),
    keyInsights: [
      "Your monthly income is $2,500",
      "Monthly expenses total $1,800",
      "You have $700 available for savings",
      "Your credit score is 720 (Good)"
    ],
    recommendations: [
      "Consider opening a high-yield savings account for your surplus funds",
      "Your debt-to-income ratio is healthy at 28%",
      "You may qualify for additional financial aid programs",
      "Consider setting up automatic transfers to savings"
    ],
    financialHealth: "Good",
    nextSteps: [
      "Review your budget monthly",
      "Set up emergency fund goal",
      "Explore scholarship opportunities",
      "Consider part-time work for additional income"
    ]
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Financial Summary</h2>
        <p className="text-white/80 text-lg">
          Your personalized financial analysis and recommendations
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
          <div className="text-2xl font-bold text-vt-orange mb-2">{mockSummary.totalDocuments}</div>
          <div className="text-white/80 text-sm">Documents Analyzed</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
          <div className="text-2xl font-bold text-vt-orange mb-2">{mockSummary.analysisDate}</div>
          <div className="text-white/80 text-sm">Last Analysis</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
          <div className="text-2xl font-bold text-vt-orange mb-2">{mockSummary.financialHealth}</div>
          <div className="text-white/80 text-sm">Financial Health</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
          <div className="text-2xl font-bold text-vt-orange mb-2">$700</div>
          <div className="text-white/80 text-sm">Available Savings</div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <div className="w-8 h-8 bg-vt-orange rounded-full flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          Key Insights
        </h3>
        <ul className="space-y-3">
          {mockSummary.keyInsights.map((insight, index) => (
            <li key={index} className="flex items-start">
              <div className="w-2 h-2 bg-vt-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-white/90">{insight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommendations */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <div className="w-8 h-8 bg-vt-orange rounded-full flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </div>
          Recommendations
        </h3>
        <ul className="space-y-3">
          {mockSummary.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start">
              <div className="w-2 h-2 bg-vt-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-white/90">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Next Steps */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <div className="w-8 h-8 bg-vt-orange rounded-full flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          Next Steps
        </h3>
        <ul className="space-y-3">
          {mockSummary.nextSteps.map((step, index) => (
            <li key={index} className="flex items-start">
              <div className="w-2 h-2 bg-vt-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-white/90">{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}