'use client'

import { useState, useEffect } from 'react'
import { userAPI } from '../services/api'
import { Upload, Save, User, DollarSign, GraduationCap, MapPin, Award, CreditCard } from 'lucide-react'

export default function PersonalInfo() {
  const [formData, setFormData] = useState({
    first: '',
    last: '',
    salary: '',
    school: '',
    major: '',
    country: 'USA',
    state: '',
    scholarshipAmount: '',
    grad_year: '',
    creditScore: '',
    savings: ''
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [message, setMessage] = useState('')
  const [userId] = useState<number>(1) // Hardcoded user_id = 1

  // Load existing user data on component mount
  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      setIsLoadingData(true)
      
      // Load user data
      const userResponse = await userAPI.getUser(userId)
      
      if (userResponse.status === 'success' && userResponse.user) {
        const user = userResponse.user
        setFormData(prev => ({
          ...prev,
          first: user.first || '',
          last: user.last || '',
          school: user.school || '',
          major: user.major || '',
          country: user.country || 'USA',
          state: user.state || '',
          grad_year: user.grad_year ? user.grad_year.toString() : '',
          instate: user.instate || false
        }))
      }

      // Load financial data
      try {
        const financialResponse = await userAPI.getFinancial(userId)
        if (financialResponse.status === 'success' && financialResponse.financial) {
          const financial = financialResponse.financial
          setFormData(prev => ({
            ...prev,
            salary: financial.salary ? financial.salary.toString() : '',
            creditScore: financial.credit_score ? financial.credit_score.toString() : '',
            savings: financial.savings ? financial.savings.toString() : ''
          }))
        }
      } catch (error) {
        console.log('No financial data found')
      }

      // Load tuition data
      try {
        const tuitionResponse = await userAPI.getTuition(userId)
        if (tuitionResponse.status === 'success' && tuitionResponse.tuition) {
          const tuition = tuitionResponse.tuition
          setFormData(prev => ({
            ...prev,
            scholarshipAmount: tuition.scholarship ? tuition.scholarship.toString() : ''
          }))
        }
      } catch (error) {
        console.log('No tuition data found')
      }
    } catch (error) {
      console.error('Error loading user data:', error)
      setMessage('❌ Error loading personal information. Please try again.')
    } finally {
      setIsLoadingData(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      // Prepare user data for update
      const userData = {
        first: formData.first,
        last: formData.last,
        school: formData.school,
        grad_year: formData.grad_year ? parseInt(formData.grad_year) : null,
        major: formData.major,
        instate: formData.state === 'Virginia',
        state: formData.state,
        country: formData.country
      }

      // Update user data
      await userAPI.updateUser(userId, userData)

      // Update financial data if provided
      if (formData.salary || formData.creditScore || formData.savings) {
        await userAPI.updateFinancial(userId, {
          salary: formData.salary ? parseFloat(formData.salary) : null,
          credit_score: formData.creditScore ? parseInt(formData.creditScore) : null,
          savings: formData.savings ? parseFloat(formData.savings) : null
        })
      }

      // Update tuition data if provided
      if (formData.scholarshipAmount) {
        await userAPI.updateTuition(userId, {
          tuition_full: 0, // This would need to be provided or calculated
          scholarship: parseFloat(formData.scholarshipAmount)
        })
      }

      setMessage('✅ Personal information updated successfully!')
    } catch (error) {
      console.error('Error saving personal information:', error)
      setMessage('❌ Error saving personal information. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingData) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-vt-orange mr-3"></div>
            <span className="text-white text-lg">Loading personal information...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Personal Information Form */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
        <div className="flex items-center mb-6">
          <User className="w-6 h-6 text-vt-orange mr-3" />
          <h2 className="text-2xl font-bold text-white">Personal Information</h2>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('✅') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-white font-medium mb-2">First Name</label>
              <input
                type="text"
                name="first"
                value={formData.first}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-vt-orange focus:ring-1 focus:ring-vt-orange"
                placeholder="Enter your first name"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-white font-medium mb-2">Last Name</label>
              <input
                type="text"
                name="last"
                value={formData.last}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-vt-orange focus:ring-1 focus:ring-vt-orange"
                placeholder="Enter your last name"
                required
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-white font-medium mb-2 flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Salary
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-vt-orange focus:ring-1 focus:ring-vt-orange"
                placeholder="Enter your salary"
              />
            </div>

            {/* School */}
            <div>
              <label className="block text-white font-medium mb-2 flex items-center">
                <GraduationCap className="w-4 h-4 mr-2" />
                School
              </label>
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-vt-orange focus:ring-1 focus:ring-vt-orange"
                placeholder="Enter your school name"
              />
            </div>

            {/* Major */}
            <div>
              <label className="block text-white font-medium mb-2">Major</label>
              <input
                type="text"
                name="major"
                value={formData.major}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-vt-orange focus:ring-1 focus:ring-vt-orange"
                placeholder="Enter your major"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-white font-medium mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Country
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-vt-orange focus:ring-1 focus:ring-vt-orange"
              >
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block text-white font-medium mb-2">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-vt-orange focus:ring-1 focus:ring-vt-orange"
                placeholder="Enter your state"
              />
            </div>

            {/* Scholarship Amount */}
            <div>
              <label className="block text-white font-medium mb-2 flex items-center">
                <Award className="w-4 h-4 mr-2" />
                Scholarship Amount
              </label>
              <input
                type="number"
                name="scholarshipAmount"
                value={formData.scholarshipAmount}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-vt-orange focus:ring-1 focus:ring-vt-orange"
                placeholder="Enter scholarship amount"
              />
            </div>

            {/* Graduation Year */}
            <div>
              <label className="block text-white font-medium mb-2">Graduation Year</label>
              <input
                type="number"
                name="grad_year"
                value={formData.grad_year}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-vt-orange focus:ring-1 focus:ring-vt-orange"
                placeholder="Enter graduation year"
                min="2020"
                max="2030"
              />
            </div>

            {/* Credit Score */}
            <div>
              <label className="block text-white font-medium mb-2 flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                Credit Score
              </label>
              <input
                type="number"
                name="creditScore"
                value={formData.creditScore}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-vt-orange focus:ring-1 focus:ring-vt-orange"
                placeholder="Enter your credit score"
                min="300"
                max="850"
              />
            </div>

            {/* Savings */}
            <div>
              <label className="block text-white font-medium mb-2 flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Savings
              </label>
              <input
                type="number"
                name="savings"
                value={formData.savings}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-vt-orange focus:ring-1 focus:ring-vt-orange"
                placeholder="Enter your savings amount"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center px-8 py-3 bg-vt-orange text-vt-maroon font-semibold rounded-lg hover:bg-vt-orange/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-vt-maroon mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Information
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
