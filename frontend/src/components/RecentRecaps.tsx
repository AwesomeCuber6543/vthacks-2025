'use client'

import { useState } from 'react'

interface CallSummary {
  id: string
  title: string
  date: string
  duration: string
  summary: string
  detailedSummary: string
  keyPoints: string[]
}

export default function RecentRecaps() {
  const [expandedRecaps, setExpandedRecaps] = useState<Set<string>>(new Set())

  // Mock data for the 5 most recent calls
  const recentCalls: CallSummary[] = [
    {
      id: '1',
      title: 'Investment Portfolio Review & Retirement Planning',
      date: '2024-01-15',
      duration: '45 minutes',
      summary: 'Discussed current investment portfolio allocation, reviewed retirement goals, and analyzed risk tolerance. Recommended rebalancing 401k contributions and exploring Roth IRA options.',
      detailedSummary: 'During this comprehensive financial planning session, we analyzed your current investment portfolio consisting of a 401k with 60% stocks and 40% bonds. We reviewed your retirement timeline of 25 years and discussed your risk tolerance. Key recommendations included increasing your 401k contribution to maximize employer matching, opening a Roth IRA for tax diversification, and considering target-date funds for simplified management. We also discussed emergency fund adequacy and insurance coverage needs.',
      keyPoints: [
        'Current 401k balance: $45,000 with 8% contribution rate',
        'Recommended increasing contribution to 12% to maximize employer match',
        'Suggested opening Roth IRA with $6,000 annual contribution',
        'Discussed target-date fund vs. individual stock selection',
        'Reviewed emergency fund status (currently 3 months expenses)'
      ]
    },
    {
      id: '2',
      title: 'Student Loan Strategy & Debt Consolidation',
      date: '2024-01-12',
      duration: '32 minutes',
      summary: 'Analyzed student loan repayment options, evaluated refinancing opportunities, and created a debt payoff strategy. Recommended income-driven repayment plan and discussed loan forgiveness programs.',
      detailedSummary: 'This session focused on optimizing your student loan repayment strategy. We analyzed your current federal loans totaling $28,500 with an average interest rate of 4.2%. We discussed various repayment options including standard, graduated, and income-driven plans. Given your current income and career trajectory, we recommended the REPAYE plan for potential loan forgiveness after 20 years of qualifying payments. We also explored private refinancing options and calculated potential savings.',
      keyPoints: [
        'Total student loan debt: $28,500 across 4 federal loans',
        'Average interest rate: 4.2% (ranging from 3.4% to 5.1%)',
        'Recommended REPAYE plan for potential forgiveness',
        'Discussed refinancing with private lenders for lower rates',
        'Created 5-year debt payoff timeline with extra payments'
      ]
    },
    {
      id: '3',
      title: 'Tax Planning & Deduction Optimization',
      date: '2024-01-08',
      duration: '28 minutes',
      summary: 'Reviewed tax situation for 2023, identified missed deductions, and planned 2024 tax strategy. Discussed HSA contributions, charitable giving, and retirement account tax benefits.',
      detailedSummary: 'This tax planning session focused on optimizing your 2023 tax return and planning for 2024. We reviewed your W-2, 1099 forms, and identified several missed deductions including unreimbursed work expenses, student loan interest, and charitable contributions. We discussed maximizing HSA contributions for triple tax benefits, the impact of Roth vs. traditional IRA contributions on your tax bracket, and strategies for reducing taxable income through retirement contributions.',
      keyPoints: [
        'Identified $2,400 in missed deductions for 2023',
        'Recommended maximizing HSA contribution ($4,300 for 2024)',
        'Discussed Roth vs. traditional IRA tax implications',
        'Planned charitable giving strategy for tax benefits',
        'Reviewed quarterly estimated tax payments for 2024'
      ]
    },
    {
      id: '4',
      title: 'Emergency Fund & Insurance Coverage Review',
      date: '2024-01-05',
      duration: '35 minutes',
      summary: 'Evaluated emergency fund adequacy, reviewed insurance coverage, and discussed risk management strategies. Recommended increasing emergency fund and reviewed life insurance needs.',
      detailedSummary: 'This risk management session focused on protecting your financial foundation. We analyzed your current emergency fund of $8,500 (3 months expenses) and discussed the importance of building it to 6 months. We reviewed your health, auto, and renters insurance coverage, identifying gaps in coverage. We discussed the need for life insurance given your family situation and career stage, and explored term vs. whole life insurance options. We also covered disability insurance and its importance for income protection.',
      keyPoints: [
        'Current emergency fund: $8,500 (3 months expenses)',
        'Recommended building to $17,000 (6 months expenses)',
        'Reviewed insurance coverage gaps and deductibles',
        'Discussed term life insurance needs ($500,000 coverage)',
        'Explored disability insurance for income protection'
      ]
    },
    {
      id: '5',
      title: 'Budget Analysis & Spending Optimization',
      date: '2024-01-02',
      duration: '40 minutes',
      summary: 'Analyzed monthly spending patterns, identified areas for savings, and created a realistic budget. Discussed the 50/30/20 rule and automated savings strategies.',
      detailedSummary: 'This budgeting session involved a deep dive into your spending habits and financial goals. We analyzed your bank statements and categorized expenses to understand your spending patterns. We identified several areas for optimization including dining out, subscription services, and entertainment expenses. We created a realistic budget using the 50/30/20 rule (50% needs, 30% wants, 20% savings) and discussed automation strategies for savings and bill payments. We also explored apps and tools for expense tracking.',
      keyPoints: [
        'Monthly income: $4,200 after taxes',
        'Current savings rate: 15% (target: 20%)',
        'Identified $300/month in potential savings',
        'Recommended automated savings transfers',
        'Discussed expense tracking apps and tools'
      ]
    }
  ]

  const toggleRecapDetails = (id: string) => {
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Recent Call Recaps</h2>
        <p className="text-white/80 text-lg">
          Your 5 most recent financial advisory sessions
        </p>
      </div>

      {/* Recent Calls List */}
      <div className="space-y-4">
        {recentCalls.map((call) => (
          <div key={call.id} className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
            {/* Call Header */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{call.title}</h3>
                  <div className="flex items-center space-x-4 text-white/70 text-sm">
                    <span>{formatDate(call.date)}</span>
                    <span>•</span>
                    <span>{call.duration}</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleRecapDetails(call.id)}
                  className="ml-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      expandedRecaps.has(call.id) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
              
              {/* Call Summary */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-white/90 leading-relaxed">{call.summary}</p>
              </div>
            </div>

            {/* Detailed Information Dropdown */}
            {expandedRecaps.has(call.id) && (
              <div className="px-6 pb-6 border-t border-white/10">
                <div className="pt-6 space-y-6">
                  {/* Detailed Summary */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Detailed Summary</h4>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <p className="text-white/90 leading-relaxed">{call.detailedSummary}</p>
                    </div>
                  </div>

                  {/* Key Points */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Key Discussion Points</h4>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <ul className="space-y-2">
                        {call.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start space-x-3 text-white/90">
                            <div className="w-2 h-2 bg-vt-orange rounded-full mt-2 flex-shrink-0"></div>
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State (if no calls) */}
      {recentCalls.length === 0 && (
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          
          <h3 className="text-xl font-semibold text-white mb-4">No Recent Calls</h3>
          <p className="text-white/70 mb-6 max-w-md mx-auto">
            Your recent financial advisory sessions will appear here once you start having calls with your advisor.
          </p>
        </div>
      )}
    </div>
  )
}
