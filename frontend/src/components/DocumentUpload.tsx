'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { documentAPI } from '../services/api'
import { Upload, File, CheckCircle, AlertCircle, X } from 'lucide-react'

export default function DocumentUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    file: File
    status: 'uploading' | 'success' | 'error'
    message?: string
  }>>([])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      status: 'uploading' as const,
      message: 'Uploading...'
    }))

    setUploadedFiles(prev => [...prev, ...newFiles])

    // Upload each file
    for (let i = 0; i < acceptedFiles.length; i++) {
      const file = acceptedFiles[i]
      const fileIndex = uploadedFiles.length + i

      try {
        const response = await documentAPI.uploadDocument(file)
        
        setUploadedFiles(prev => 
          prev.map((item, index) => 
            index === fileIndex 
              ? { ...item, status: 'success', message: 'Uploaded successfully!' }
              : item
          )
        )
      } catch (error) {
        console.error('Upload error:', error)
        setUploadedFiles(prev => 
          prev.map((item, index) => 
            index === fileIndex 
              ? { ...item, status: 'error', message: 'Upload failed' }
              : item
          )
        )
      }
    }
  }, [uploadedFiles.length])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'text/*': ['.txt', '.md'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: true
  })

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
        <div className="flex items-center mb-6">
          <Upload className="w-6 h-6 text-vt-orange mr-3" />
          <h2 className="text-2xl font-bold text-white">Document Upload</h2>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragActive
              ? 'border-vt-orange bg-vt-orange/10'
              : 'border-white/30 hover:border-vt-orange hover:bg-vt-orange/5'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 text-white/50 mx-auto mb-4" />
          {isDragActive ? (
            <p className="text-white text-lg">Drop the files here...</p>
          ) : (
            <div>
              <p className="text-white text-lg mb-2">Drag & drop files here, or click to select</p>
              <p className="text-white/60 text-sm">
                Supports PDF, images, Word docs, and text files
              </p>
            </div>
          )}
        </div>

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Uploaded Files</h3>
            <div className="space-y-3">
              {uploadedFiles.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    item.status === 'success'
                      ? 'bg-green-500/10 border-green-500/30'
                      : item.status === 'error'
                      ? 'bg-red-500/10 border-red-500/30'
                      : 'bg-yellow-500/10 border-yellow-500/30'
                  }`}
                >
                  <div className="flex items-center">
                    <File className="w-5 h-5 text-white/70 mr-3" />
                    <div>
                      <p className="text-white font-medium">{item.file.name}</p>
                      <p className="text-white/60 text-sm">
                        {(item.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    {item.status === 'success' && (
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                    )}
                    {item.status === 'error' && (
                      <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                    )}
                    {item.status === 'uploading' && (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-vt-orange mr-2"></div>
                    )}
                    <span
                      className={`text-sm ${
                        item.status === 'success'
                          ? 'text-green-400'
                          : item.status === 'error'
                          ? 'text-red-400'
                          : 'text-yellow-400'
                      }`}
                    >
                      {item.message}
                    </span>
                    <button
                      onClick={() => removeFile(index)}
                      className="ml-3 p-1 hover:bg-white/10 rounded"
                    >
                      <X className="w-4 h-4 text-white/70" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
