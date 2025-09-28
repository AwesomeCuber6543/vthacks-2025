'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

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

  // Sample data for demonstration - 2 recent calls
  const recentCalls: CallSummary[] = [
    {
      id: '1',
      title: 'Investment Portfolio Review & Retirement Planning',
      date: '2024-01-15',
      duration: '45 minutes',
      summary: 'Discussed current investment portfolio allocation, reviewed retirement goals, and analyzed risk tolerance. Recommended rebalancing 401k contributions and exploring Roth IRA options.',
      detailedSummary: `# Investment Portfolio Review & Retirement Planning

## 📊 Current Portfolio Analysis

### Asset Allocation
- **401k Balance**: $45,000
- **Current Allocation**: 60% Stocks, 40% Bonds
- **Contribution Rate**: 8% (with 4% employer match)
- **Risk Tolerance**: Moderate

### Key Recommendations

#### 1. Increase 401k Contributions
- **Current**: 8% contribution rate
- **Recommended**: 12% contribution rate
- **Benefit**: Maximize employer matching (additional $1,800/year)

#### 2. Open Roth IRA
- **Annual Contribution**: $6,000
- **Tax Benefits**: Tax-free growth and withdrawals
- **Diversification**: Tax diversification strategy

#### 3. Portfolio Rebalancing
- **Target Allocation**: 70% Stocks, 30% Bonds
- **Rebalancing Frequency**: Quarterly
- **Investment Options**: Target-date funds vs. individual stocks

## 🎯 Retirement Planning

### Timeline & Goals
- **Retirement Age**: 65 (25 years from now)
- **Target Retirement Income**: $80,000/year
- **Required Portfolio**: $2,000,000 (4% withdrawal rate)

### Action Items
- [ ] Increase 401k contribution to 12%
- [ ] Open Roth IRA account
- [ ] Set up automatic rebalancing
- [ ] Review investment options quarterly

## 📈 Next Steps
1. **Week 1**: Update 401k contribution rate
2. **Week 2**: Research and open Roth IRA
3. **Month 1**: Set up automatic contributions
4. **Quarter 1**: Review and rebalance portfolio`,
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
      detailedSummary: `# Student Loan Strategy & Debt Consolidation

## 💰 Current Loan Overview

### Loan Details
- **Total Debt**: $28,500
- **Number of Loans**: 4 federal loans
- **Average Interest Rate**: 4.2%
- **Interest Rate Range**: 3.4% - 5.1%
- **Current Payment**: $320/month

### Loan Breakdown
| Loan Type | Balance | Interest Rate | Monthly Payment |
|-----------|---------|---------------|-----------------|
| Direct Subsidized | $8,500 | 3.4% | $95 |
| Direct Unsubsidized | $12,000 | 4.2% | $135 |
| Direct PLUS | $5,500 | 5.1% | $65 |
| Direct Consolidation | $2,500 | 4.1% | $25 |

## 🎯 Repayment Strategy

### Recommended Plan: REPAYE
- **Payment**: 10% of discretionary income
- **Timeline**: 20 years for undergraduate loans
- **Forgiveness**: Remaining balance forgiven after 20 years
- **Tax Implications**: Forgiven amount may be taxable

### Alternative Options
1. **Standard Repayment**: $320/month for 10 years
2. **Graduated Repayment**: Starts lower, increases over time
3. **Private Refinancing**: Potentially lower rates (3.5% - 4.5%)

## 📊 Financial Impact Analysis

### REPAYE vs Standard Plan
| Metric | REPAYE | Standard |
|--------|--------|----------|
| Monthly Payment | $180 | $320 |
| Total Paid | $43,200 | $38,400 |
| Time to Payoff | 20 years | 10 years |
| Forgiveness Amount | $0 | $0 |

### Refinancing Analysis
- **Potential Rate**: 3.8% (average)
- **Monthly Savings**: $25
- **Total Interest Savings**: $3,000
- **Risk**: Lose federal protections

## ✅ Action Plan

### Immediate Steps
1. **Apply for REPAYE** - Submit application within 30 days
2. **Set up Auto-Pay** - 0.25% interest rate reduction
3. **Track Payments** - Use loan servicer portal
4. **Annual Recertification** - Update income annually

### Long-term Strategy
- **Year 1-5**: Focus on career growth and income increase
- **Year 5-10**: Consider refinancing if rates remain low
- **Year 10-20**: Evaluate forgiveness vs. payoff options

## 📋 Resources
- [StudentAid.gov](https://studentaid.gov) - Federal loan information
- [Loan Simulator](https://studentaid.gov/loan-simulator) - Compare repayment plans
- [PSLF Help Tool](https://studentaid.gov/pslf) - Public Service Loan Forgiveness`,
      keyPoints: [
        'Total student loan debt: $28,500 across 4 federal loans',
        'Average interest rate: 4.2% (ranging from 3.4% to 5.1%)',
        'Recommended REPAYE plan for potential forgiveness',
        'Discussed refinancing with private lenders for lower rates',
        'Created 5-year debt payoff timeline with extra payments'
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
                      <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-white/90 prose-strong:text-white prose-em:text-white/80 prose-ul:text-white/90 prose-ol:text-white/90 prose-li:text-white/90 prose-li:marker:text-vt-orange prose-table:text-white/90 prose-th:text-white prose-th:bg-white/10 prose-td:text-white/90 prose-td:border-white/20 prose-a:text-vt-orange prose-a:hover:text-vt-orange/80 prose-code:text-vt-orange prose-code:bg-white/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10">
                        <ReactMarkdown>{call.detailedSummary}</ReactMarkdown>
                      </div>
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
