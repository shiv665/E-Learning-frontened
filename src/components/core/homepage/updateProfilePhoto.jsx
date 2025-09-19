import React, { useState, useRef } from 'react'
import { Camera, Upload, User, X, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { apiConnector } from '../../../services/apiConnector';
import { categories } from '../../../services/api';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { setUser } from '../../../reducers/profileSlice';
import { useDispatch } from 'react-redux';

const UpdateProfilePhoto = () => {
  const [profileImage, setProfileImage] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)
  const {token}=useSelector((state)=>state.auth);
  const {user}=useSelector((state)=>state.profile);
  const dispatch=useDispatch();
  const handleFileSelect = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select a valid image file.')
      return
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      alert('File size must be less than 5MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setProfileImage({
        file: file,
        preview: e.target.result,
        name: file.name,
        size: file.size
      })
    }
    reader.readAsDataURL(file)
  }

  const handleInputChange = (e) => {
    if (e.target.files[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const removeImage = () => {
    setProfileImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  const imageUpload = async () => {
  try {
    if (!token) throw new Error("You must be logged in to upload photo");

    const formData = new FormData();
    formData.append("profilePhoto", profileImage.file);
    formData.append("userId", user._id);
      // ✅ Send userId in body
    console.log(formData)

    const result = await apiConnector(
      "PUT",
      categories.IMAGE_API,
      formData,
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    );

    console.log("Upload Result:", result);
    const UPDATEDuser= result.data.profile;
    console.log(UPDATEDuser);
    dispatch(setUser(UPDATEDuser));
    
  } catch (err) {
    const errorMessage = err?.response?.data?.message || "TRY AGAIN";
    throw new Error(errorMessage);
  }
};


  const handleSave = async () => {
    if (!profileImage) {
      alert('Please select a profile photo first.')
      return
    }

    setIsUploading(true)
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would upload to your server
      console.log('Saving profile photo:', profileImage)
      await imageUpload();
      toast.success('Profile photo updated successfully!')
      
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsUploading(false)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Update Profile Photo
      </h2>

      {/* Current Profile Photo Display */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          {profileImage ? (
            <div className="relative">
              <img
                src={profileImage.preview}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 shadow-lg"
                disabled={isUploading}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
              <User className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 cursor-pointer ${
          isDragOver 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
          disabled={isUploading}
        />
        
        <div className="space-y-3">
          <div className="flex justify-center">
            <Camera className="w-8 h-8 text-gray-400" />
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-600">
              {profileImage ? 'Change photo' : 'Upload profile photo'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              JPG, PNG, GIF up to 5MB
            </p>
          </div>
          
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
            onClick={(e) => {
              e.stopPropagation()
              fileInputRef.current?.click()
            }}
            disabled={isUploading}
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose Photo
          </button>
        </div>
      </div>

      {/* File Info and Actions */}
      {profileImage && (
        <div className="mt-6 space-y-4">
          {/* File Info */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 truncate">
                  {profileImage.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(profileImage.size)}
                </p>
              </div>
              <div className="flex items-center text-green-600">
                <Check className="w-4 h-4 mr-1" />
                <span className="text-xs">Ready</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={removeImage}
              className="flex-1 px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center justify-center disabled:opacity-50"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Save Photo
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          For best results, use a square image with your face clearly visible
        </p>
      </div>
    </div>
  )
}

export default UpdateProfilePhoto