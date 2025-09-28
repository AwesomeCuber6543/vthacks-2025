'use client'

import { useState } from 'react'

export default function MyInfo() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [expandedFiles, setExpandedFiles] = useState<Set<number>>(new Set())

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files)
      setUploadedFiles(prev => [...prev, ...newFiles])
      console.log('Files dropped:', newFiles)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files)
      setUploadedFiles(prev => [...prev, ...newFiles])
      console.log('Files selected:', newFiles)
    }
  }

  const toggleFileDetails = (index: number) => {
    setExpandedFiles(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
    setExpandedFiles(prev => {
      const newSet = new Set(prev)
      newSet.delete(index)
      return newSet
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }


  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Upload Card */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Upload Documents</h2>
          <p className="text-white/80 text-lg mb-8">
            Upload your financial documents or bank statements for AI analysis
          </p>
          
          {/* Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-xl p-12 transition-all duration-200 ${
              dragActive
                ? 'border-vt-orange bg-vt-orange/10'
                : 'border-white/40 hover:border-vt-orange/60'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center space-y-4">
              {/* Upload Icon */}
              <div className="w-16 h-16 bg-vt-orange rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              
              <div className="text-center">
                <p className="text-white text-lg font-medium mb-2">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-white/60 text-sm">
                  PDF, PNG, JPG up to 10MB
                </p>
              </div>
              
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                multiple
              />
            </div>
          </div>

          {/* Display uploaded files */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6">
              <h3 className="text-white font-semibold mb-3">Uploaded Documents:</h3>
              <div className="space-y-3">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                    {/* File Header */}
                    <div className="flex items-center justify-between p-3">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleFileDetails(index)}
                          className="flex items-center space-x-2 text-white hover:text-vt-orange transition-colors"
                        >
                          <svg
                            className={`w-4 h-4 transition-transform ${
                              expandedFiles.has(index) ? 'rotate-180' : ''
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
                          <span className="text-sm font-medium">{file.name}</span>
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-white/60 text-xs">
                          {formatFileSize(file.size)}
                        </span>
                        <button
                          onClick={() => removeFile(index)}
                          className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded transition-colors"
                          title="Remove file"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* File Details Dropdown */}
                    {expandedFiles.has(index) && (
                      <div className="px-3 pb-3 border-t border-white/10">
                        <div className="pt-3 space-y-2">
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                              <span className="text-white/60">File Name:</span>
                              <p className="text-white font-medium">{file.name}</p>
                            </div>
                            <div>
                              <span className="text-white/60">File Size:</span>
                              <p className="text-white font-medium">{formatFileSize(file.size)}</p>
                            </div>
                            <div>
                              <span className="text-white/60">File Type:</span>
                              <p className="text-white font-medium">{file.type || 'Unknown'}</p>
                            </div>
                            <div>
                              <span className="text-white/60">Last Modified:</span>
                              <p className="text-white font-medium">{formatDate(new Date(file.lastModified))}</p>
                            </div>
                          </div>
                          
                          {/* File Preview (for images) */}
                          {file.type.startsWith('image/') && (
                            <div className="mt-3">
                              <span className="text-white/60 text-xs">Preview:</span>
                              <div className="mt-2 max-w-xs">
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={file.name}
                                  className="max-w-full h-auto rounded border border-white/20"
                                  style={{ maxHeight: '200px' }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}