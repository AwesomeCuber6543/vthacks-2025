'use client'

import { useState } from 'react'

export default function PersonalInfo() {
  const [formData, setFormData] = useState({
    name: '',
    salary: '',
    jobTitle: '',
    school: '',
    major: '',
    country: '',
    state: '',
    scholarshipAmount: '',
    graduationYear: '',
    creditScore: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Personal Information Form */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-white font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-vt-orange focus:ring-1 focus:ring-vt-orange"
              placeholder="Enter your full name"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-white font-medium mb-2">Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-vt-orange focus:ring-1 focus:ring-vt-orange"
              placeholder="Enter your salary"
            />
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-white font-medium mb-2">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-vt-orange focus:ring-1 focus:ring-vt-orange"
              placeholder="Enter your job title"
            />
          </div>

          {/* School */}
          <div>
            <label className="block text-white font-medium mb-2">School</label>
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
            <label className="block text-white font-medium mb-2">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-vt-orange focus:ring-1 focus:ring-vt-orange"
              placeholder="Enter your country"
            />
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
            <label className="block text-white font-medium mb-2">Scholarship Amount</label>
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
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-vt-orange focus:ring-1 focus:ring-vt-orange"
              placeholder="Enter graduation year"
            />
          </div>

          {/* Credit Score */}
          <div>
            <label className="block text-white font-medium mb-2">Credit Score</label>
            <input
              type="number"
              name="creditScore"
              value={formData.creditScore}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-vt-orange focus:ring-1 focus:ring-vt-orange"
              placeholder="Enter your credit score"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
