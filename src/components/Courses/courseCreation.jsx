
import { useState } from "react";
import { Upload, X, Plus, BookOpen, Users, Clock, DollarSign, Tag, FileText, Image, ChevronDown } from "lucide-react";
import { apiConnector } from '../../services/apiConnector';
import { coursesAPI } from '../../services/api';
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CourseCreation() {
  const navigate=useNavigate();
  const {token}=useSelector((state)=>state.auth);
  const {tags}=useSelector((state)=>state.category)
  const [formData, setFormData] = useState({
    courseName: '',
    courseDescription: '',
    whatUWillLearn: '',
    price: '',
    category: '',
    thumbnail: null
  });

  const [tagInput, setTagInput] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Predefined category options
    const id_category = tags.reduce((acc, tag) => {
      acc[tag.tagName] = tag._id;
      return acc;
    }, {});
    const categories = Object.keys(id_category);


  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const selectCategory = (category) => {
    setFormData(prev => ({
      ...prev,
      category
    }));
    setDropdownOpen(false);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFiles(files[0]);
    }
  };

  const handleFiles = (file) => {
    if (file.type.startsWith('image/')) {
      setFormData(prev => ({
        ...prev,
        thumbnail: file
      }));
    }
  };
            const bodyData = new FormData();
            bodyData.append('courseName', formData.courseName);
            bodyData.append('courseDescription', formData.courseDescription);
            bodyData.append('WhatUWillLearn', formData.whatUWillLearn);
            bodyData.append('price', formData.price);
            bodyData.append('tags', id_category[formData.category]);
            if (formData.thumbnail) {
            bodyData.append('thumbnail', formData.thumbnail);
            }
            bodyData.append('token', token);
 

  const createCourse=async()=>{
                      try{  


                           const result=await apiConnector("POST",coursesAPI.COURSE_CREATION_API,bodyData);
                           console.log(result);
                          }catch(err){
                              const errorMessage = err?.response?.data?.message || "can't create";
                              throw new Error(errorMessage);
                          }
                         }

  const handleSubmit =async () => {
    console.log('Course Data:', formData)
    try{
       await createCourse()
        
        toast.success("created");

        navigate(-1);

    }
    catch(err){
        toast.error(err.message)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Create New Course
          </h1>
          <p className="text-gray-600 text-lg">Design and publish your educational masterpiece</p>
        </div>

        <div className="space-y-8">
          {/* Course Basic Info Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Course Information
              </h2>
            </div>
            <div className="p-6 space-y-6">
              {/* Course Name */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Name *
                </label>
                <input
                  type="text"
                  value={formData.courseName}
                  onChange={(e) => handleInputChange('courseName', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 transition-all duration-200 group-hover:border-gray-300"
                  placeholder="Enter an engaging course title..."
                  required
                />
              </div>

              {/* Course Description */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Description *
                </label>
                <textarea
                  value={formData.courseDescription}
                  onChange={(e) => handleInputChange('courseDescription', e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 transition-all duration-200 group-hover:border-gray-300 resize-none"
                  placeholder="Describe what makes your course unique and valuable..."
                  required
                />
              </div>

              {/* What You'll Learn */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What Students Will Learn *
                </label>
                <textarea
                  value={formData.whatUWillLearn}
                  onChange={(e) => handleInputChange('whatUWillLearn', e.target.value)}
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 transition-all duration-200 group-hover:border-gray-300 resize-none"
                  placeholder="List the key skills and knowledge students will gain..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Pricing and Category Card */}
          <div className="grid md:grid-cols-1 gap-8">
            {/* Pricing */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Pricing
                </h2>
              </div>
              <div className="p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Price ($) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 transition-all duration-200"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">Set to 0 for free courses</p>
              </div>
            </div>

            {/* Category */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Category
                </h2>
              </div>
              <div className="p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Category *
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-0 transition-all duration-200 text-left flex items-center justify-between hover:border-gray-300"
                  >
                    <span className={formData.category ? 'text-gray-900' : 'text-gray-500'}>
                      {formData.category || 'Select a category...'}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {dropdownOpen && (
                    <div className=" top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                      {categories.map((category, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => selectCategory(category)}
                          className="w-full px-4 py-3 text-left hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {formData.category && (
                  <div className="mt-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {formData.category}
                      <button
                        type="button"
                        onClick={() => handleInputChange('category', '')}
                        className="hover:text-purple-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Image className="w-5 h-5" />
                Course Thumbnail
              </h2>
            </div>
            <div className="p-6">
              <div
                className={`relative border-3 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                  dragActive
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-300 hover:border-orange-400 hover:bg-gray-50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files[0] && handleFiles(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {formData.thumbnail ? (
                  <div className="space-y-4">
                    <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                      <Image className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <p className="text-green-600 font-medium">{formData.thumbnail.name}</p>
                      <p className="text-sm text-gray-500">
                        {(formData.thumbnail.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-700">
                        Drop your thumbnail here or click to browse
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG or GIF up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <BookOpen className="w-5 h-5" />
              Create Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}













































// import React, { useState, useRef, useEffect } from 'react';
// import { 
//   BookOpen, 
//   Upload, 
//   DollarSign, 
//   Tag, 
//   Users, 
//   Eye,
//   Save,
//   X,
//   Plus,
//   ArrowLeft,
//   ArrowRight,
//   Image,
//   FileText,
//   Target,
//   Settings,
//   Check,
//   AlertCircle,
//   ChevronDown
// } from 'lucide-react';

// const CourseCreation = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [availableTags, setAvailableTags] = useState([]);
//   const [showTagDropdown, setShowTagDropdown] = useState(false);
//   const fileInputRef = useRef(null);
//   const tagDropdownRef = useRef(null);

//   // Form data state
//   const [formData, setFormData] = useState({
//     courseName: '',
//     courseDescription: '',
//     WhatUWillLearn: '',
//     price: '',
//     thumbnail: null,
//     thumbnailPreview: '',
//     selectedTags: [],
//     status: 'draft'
//   });

//   const [sections, setSections] = useState([]);
//   const [currentSection, setCurrentSection] = useState({ title: '', description: '', lessons: [] });

//   const steps = [
//     { id: 1, title: 'Basic Info', icon: FileText },
//     { id: 2, title: 'Content', icon: BookOpen },
//     { id: 3, title: 'Pricing & Tags', icon: DollarSign },
//     { id: 4, title: 'Preview & Publish', icon: Eye }
//   ];

//   // Load available tags from localStorage on component mount
//   useEffect(() => {
//     // For demo purposes, I'll create some sample tags since localStorage isn't available
//     // In your actual app, replace this with: JSON.parse(localStorage.getItem('availableTags') || '[]')
//     const sampleTags = [
//       'React', 'JavaScript', 'Web Development', 'Node.js', 'Python', 
//       'Machine Learning', 'Data Science', 'UI/UX Design', 'Mobile Development',
//       'Backend Development', 'Database Design', 'DevOps', 'Cybersecurity',
//       'Artificial Intelligence', 'Blockchain', 'Cloud Computing'
//     ];
//     setAvailableTags(sampleTags);
    
//     // Close dropdown when clicking outside
//     const handleClickOutside = (event) => {
//       if (tagDropdownRef.current && !tagDropdownRef.current.contains(event.target)) {
//         setShowTagDropdown(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   },[]);

//   // Handle input changes - Fixed version
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   // Handle file upload
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.type.startsWith('image/')) {
//         const objectUrl = URL.createObjectURL(file);
//         setFormData(prev => ({
//           ...prev,
//           thumbnail: file,
//           thumbnailPreview: objectUrl
//         }));
//         setErrors(prev => ({ ...prev, thumbnail: '' }));
//       } else {
//         setErrors(prev => ({ ...prev, thumbnail: 'Please select an image file' }));
//       }
//     }
//   };

//   // Handle tag selection
//   const toggleTag = (tag) => {
//     setFormData(prev => ({
//       ...prev,
//       selectedTags: prev.selectedTags.includes(tag)
//         ? prev.selectedTags.filter(t => t !== tag)
//         : [...prev.selectedTags, tag]
//     }));
//   };

//   const removeTag = (tagToRemove) => {
//     setFormData(prev => ({
//       ...prev,
//       selectedTags: prev.selectedTags.filter(tag => tag !== tagToRemove)
//     }));
//   };

//   // Validation functions
//   const validateStep = (step) => {
//     const newErrors = {};

//     switch (step) {
//       case 1:
//         if (!formData.courseName.trim()) newErrors.courseName = 'Course name is required';
//         if (!formData.courseDescription.trim()) newErrors.courseDescription = 'Course description is required';
//         if (!formData.WhatUWillLearn.trim()) newErrors.WhatUWillLearn = 'Learning outcomes are required';
//         if (!formData.thumbnail) newErrors.thumbnail = 'Course thumbnail is required';
//         break;
//       case 2:
//         if (sections.length === 0) newErrors.sections = 'At least one section is required';
//         break;
//       case 3:
//         if (!formData.price || formData.price < 0) newErrors.price = 'Valid price is required';
//         if (formData.selectedTags.length === 0) newErrors.tags = 'At least one tag is required';
//         break;
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle next step
//   const handleNext = () => {
//     if (validateStep(currentStep)) {
//       setCurrentStep(prev => Math.min(prev + 1, 4));
//     }
//   };

//   // Handle previous step
//   const handlePrev = () => {
//     setCurrentStep(prev => Math.max(prev - 1, 1));
//   };

//   // Add section
//   const addSection = () => {
//     if (currentSection.title.trim() && currentSection.description.trim()) {
//       setSections(prev => [...prev, { ...currentSection, id: Date.now() }]);
//       setCurrentSection({ title: '', description: '', lessons: [] });
//     }
//   };

//   // Remove section
//   const removeSection = (id) => {
//     setSections(prev => prev.filter(section => section.id !== id));
//   };

//   // Submit course
//   const handleSubmit = async (status = 'draft') => {
//     setLoading(true);
    
//     try {
//       // Prepare data for API call
//       const courseData = {
//         courseName: formData.courseName,
//         courseDescription: formData.courseDescription,
//         WhatUWillLearn: formData.WhatUWillLearn,
//         price: formData.price,
//         tags: formData.selectedTags,
//         status: status,
//         thumbnail: formData.thumbnail,
//         courseContent: sections
//       };

//       console.log('Submitting course:', courseData);
      
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       alert(`Course ${status === 'published' ? 'published' : 'saved as draft'} successfully!`);
      
//     } catch (error) {
//       console.error('Error submitting course:', error);
//       alert('Error creating course. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const StepIndicator = () => (
//     <div className="flex items-center justify-center mb-8">
//       {steps.map((step, index) => (
//         <div key={step.id} className="flex items-center">
//           <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
//             currentStep >= step.id 
//               ? 'bg-blue-500 border-blue-500 text-white' 
//               : 'bg-slate-800 border-slate-600 text-slate-400'
//           }`}>
//             {currentStep > step.id ? (
//               <Check size={20} />
//             ) : (
//               <step.icon size={20} />
//             )}
//           </div>
//           <div className="ml-3 mr-8">
//             <p className={`text-sm font-medium ${
//               currentStep >= step.id ? 'text-white' : 'text-slate-400'
//             }`}>
//               Step {step.id}
//             </p>
//             <p className={`text-xs ${
//               currentStep >= step.id ? 'text-blue-400' : 'text-slate-500'
//             }`}>
//               {step.title}
//             </p>
//           </div>
//           {index < steps.length - 1 && (
//             <div className={`w-16 h-0.5 ${
//               currentStep > step.id ? 'bg-blue-500' : 'bg-slate-600'
//             }`} />
//           )}
//         </div>
//       ))}
//     </div>
//   );

//   const InputField = ({ label, name, type = 'text', placeholder, required = false, error, ...props }) => (
//     <div className="mb-6">
//       <label className="block text-sm font-medium text-slate-300 mb-2">
//         {label}
//         {required && <span className="text-red-400 ml-1">*</span>}
//       </label>
//       {type === 'textarea' ? (
//         <textarea
//           name={name}
//           value={formData[name] || ''}
//           onChange={handleInputChange}
//           placeholder={placeholder}
//           className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors duration-200 resize-none ${
//             error ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-600 focus:ring-blue-500/50 focus:border-blue-500'
//           }`}
//           rows={4}
//           {...props}
//         />
//       ) : (
//         <input
//           type={type}
//           name={name}
//           value={formData[name] || ''}
//           onChange={handleInputChange}
//           placeholder={placeholder}
//           className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors duration-200 ${
//             error ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-600 focus:ring-blue-500/50 focus:border-blue-500'
//           }`}
//           {...props}
//         />
//       )}
//       {error && (
//         <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
//           <AlertCircle size={16} />
//           {error}
//         </p>
//       )}
//     </div>
//   );

//   const Step1BasicInfo = () => (
//     <div className="space-y-6">
//       <div className="text-center mb-8">
//         <h2 className="text-2xl font-bold text-white mb-2">Basic Course Information</h2>
//         <p className="text-slate-400">Let's start with the fundamental details of your course</p>
//       </div>

//       <InputField
//         label="Course Name"
//         name="courseName"
//         placeholder="Enter an engaging course title"
//         required
//         error={errors.courseName}
//       />

//       <InputField
//         label="Course Description"
//         name="courseDescription"
//         type="textarea"
//         placeholder="Provide a comprehensive description of what your course covers"
//         required
//         error={errors.courseDescription}
//       />

//       <InputField
//         label="What You Will Learn"
//         name="WhatUWillLearn"
//         type="textarea"
//         placeholder="List the key learning outcomes and skills students will gain"
//         required
//         error={errors.WhatUWillLearn}
//       />

//       {/* Thumbnail Upload */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-slate-300 mb-2">
//           Course Thumbnail <span className="text-red-400 ml-1">*</span>
//         </label>
//         <div 
//           onClick={() => fileInputRef.current?.click()}
//           className={`relative w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 flex items-center justify-center ${
//             errors.thumbnail ? 'border-red-500 bg-red-500/5' : 'border-slate-600 hover:border-blue-500 bg-slate-800/50'
//           }`}
//         >
//           {formData.thumbnailPreview ? (
//             <div className="relative w-full h-full">
//               <img 
//                 src={formData.thumbnailPreview} 
//                 alt="Thumbnail preview" 
//                 className="w-full h-full object-cover rounded-lg"
//               />
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   URL.revokeObjectURL(formData.thumbnailPreview);
//                   setFormData(prev => ({ 
//                     ...prev, 
//                     thumbnail: null, 
//                     thumbnailPreview: '' 
//                   }));
//                 }}
//                 className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//               >
//                 <X size={16} />
//               </button>
//             </div>
//           ) : (
//             <div className="text-center">
//               <Image size={48} className="mx-auto text-slate-400 mb-4" />
//               <p className="text-white font-medium">Click to upload thumbnail</p>
//               <p className="text-slate-400 text-sm mt-1">Recommended size: 1024x576px</p>
//             </div>
//           )}
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             onChange={handleFileUpload}
//             className="hidden"
//           />
//         </div>
//         {errors.thumbnail && (
//           <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
//             <AlertCircle size={16} />
//             {errors.thumbnail}
//           </p>
//         )}
//       </div>
//     </div>
//   );

//   const Step2Content = () => (
//     <div className="space-y-6">
//       <div className="text-center mb-8">
//         <h2 className="text-2xl font-bold text-white mb-2">Course Content Structure</h2>
//         <p className="text-slate-400">Organize your course into sections and lessons</p>
//       </div>

//       {/* Add Section Form */}
//       <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-6">
//         <h3 className="text-lg font-semibold text-white mb-4">Add New Section</h3>
//         <div className="grid grid-cols-1 gap-4">
//           <input
//             type="text"
//             placeholder="Section title (e.g., Introduction to React)"
//             value={currentSection.title}
//             onChange={(e) => setCurrentSection(prev => ({ ...prev, title: e.target.value }))}
//             className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors duration-200"
//           />
//           <textarea
//             placeholder="Section description"
//             value={currentSection.description}
//             onChange={(e) => setCurrentSection(prev => ({ ...prev, description: e.target.value }))}
//             className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors duration-200 resize-none"
//             rows={3}
//           />
//           <button
//             onClick={addSection}
//             disabled={!currentSection.title.trim() || !currentSection.description.trim()}
//             className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 w-fit"
//           >
//             <Plus size={16} />
//             Add Section
//           </button>
//         </div>
//       </div>

//       {/* Sections List */}
//       <div className="space-y-4">
//         <h3 className="text-lg font-semibold text-white">Course Sections ({sections.length})</h3>
//         {sections.length === 0 ? (
//           <div className="text-center py-8 bg-slate-800/30 border border-slate-700 rounded-lg">
//             <BookOpen size={48} className="mx-auto text-slate-400 mb-4" />
//             <p className="text-slate-400">No sections added yet</p>
//             <p className="text-slate-500 text-sm">Add your first section to get started</p>
//           </div>
//         ) : (
//           sections.map((section, index) => (
//             <div key={section.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
//               <div className="flex items-start justify-between">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-2">
//                     <span className="flex items-center justify-center w-8 h-8 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold">
//                       {index + 1}
//                     </span>
//                     <h4 className="text-white font-medium">{section.title}</h4>
//                   </div>
//                   <p className="text-slate-400 text-sm ml-11">{section.description}</p>
//                 </div>
//                 <button
//                   onClick={() => removeSection(section.id)}
//                   className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
//                 >
//                   <X size={16} />
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//         {errors.sections && (
//           <p className="text-sm text-red-400 flex items-center gap-1">
//             <AlertCircle size={16} />
//             {errors.sections}
//           </p>
//         )}
//       </div>
//     </div>
//   );

//   const Step3PricingTags = () => (
//     <div className="space-y-6">
//       <div className="text-center mb-8">
//         <h2 className="text-2xl font-bold text-white mb-2">Pricing & Tags</h2>
//         <p className="text-slate-400">Set your course price and add relevant tags</p>
//       </div>

//       <InputField
//         label="Course Price"
//         name="price"
//         type="number"
//         placeholder="Enter price in ₹ (0 for free course)"
//         min="0"
//         step="0.01"
//         required
//         error={errors.price}
//       />

//       {/* Tags Selection */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-slate-300 mb-2">
//           Tags <span className="text-red-400 ml-1">*</span>
//         </label>
        
//         {/* Selected Tags Display */}
//         {formData.selectedTags.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-3">
//             {formData.selectedTags.map((tag, index) => (
//               <span
//                 key={index}
//                 className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium"
//               >
//                 {tag}
//                 <button
//                   onClick={() => removeTag(tag)}
//                   className="hover:text-red-400 transition-colors"
//                 >
//                   <X size={14} />
//                 </button>
//               </span>
//             ))}
//           </div>
//         )}
        
//         {/* Tags Dropdown */}
//         <div className="relative" ref={tagDropdownRef}>
//           <button
//             type="button"
//             onClick={() => setShowTagDropdown(!showTagDropdown)}
//             className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white focus:outline-none focus:ring-2 transition-colors duration-200 flex items-center justify-between ${
//               errors.tags ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-600 focus:ring-blue-500/50 hover:border-blue-500'
//             }`}
//           >
//             <span className={formData.selectedTags.length === 0 ? 'text-slate-400' : 'text-white'}>
//               {formData.selectedTags.length === 0 ? 'Select tags for your course' : `${formData.selectedTags.length} tags selected`}
//             </span>
//             <ChevronDown size={20} className={`transition-transform ${showTagDropdown ? 'rotate-180' : ''}`} />
//           </button>
          
//           {showTagDropdown && (
//             <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//               {availableTags.map((tag) => (
//                 <div
//                   key={tag}
//                   onClick={() => toggleTag(tag)}
//                   className={`px-4 py-2 cursor-pointer transition-colors hover:bg-slate-700 flex items-center justify-between ${
//                     formData.selectedTags.includes(tag) ? 'bg-blue-500/20 text-blue-400' : 'text-white'
//                   }`}
//                 >
//                   <span>{tag}</span>
//                   {formData.selectedTags.includes(tag) && <Check size={16} />}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
        
//         {errors.tags && (
//           <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
//             <AlertCircle size={16} />
//             {errors.tags}
//           </p>
//         )}
//       </div>

//       <div className="mb-6">
//         <label className="block text-sm font-medium text-slate-300 mb-2">
//           Course Status
//         </label>
//         <select
//           name="status"
//           value={formData.status}
//           onChange={handleInputChange}
//           className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors duration-200"
//         >
//           <option value="draft">Draft</option>
//           <option value="published">Published</option>
//           <option value="archived">Archived</option>
//         </select>
//       </div>
//     </div>
//   );

//   const Step4Preview = () => (
//     <div className="space-y-6">
//       <div className="text-center mb-8">
//         <h2 className="text-2xl font-bold text-white mb-2">Preview & Publish</h2>
//         <p className="text-slate-400">Review your course before publishing</p>
//       </div>

//       <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div>
//             {formData.thumbnailPreview && (
//               <img 
//                 src={formData.thumbnailPreview} 
//                 alt="Course thumbnail" 
//                 className="w-full h-48 object-cover rounded-lg mb-4"
//               />
//             )}
//             <h3 className="text-xl font-bold text-white mb-2">{formData.courseName}</h3>
//             <p className="text-slate-400 text-sm mb-4">{formData.courseDescription}</p>
//             <div className="flex items-center gap-4 mb-4">
//               <span className="text-2xl font-bold text-green-400">₹{formData.price}</span>
//               <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                 formData.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
//               }`}>
//                 {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
//               </span>
//             </div>
//           </div>
//           <div>
//             <h4 className="text-white font-semibold mb-3">What You'll Learn:</h4>
//             <p className="text-slate-300 text-sm mb-4">{formData.WhatUWillLearn}</p>
//             <h4 className="text-white font-semibold mb-3">Course Content ({sections.length} sections):</h4>
//             <div className="space-y-2 max-h-32 overflow-y-auto">
//               {sections.map((section, index) => (
//                 <div key={section.id} className="flex items-center gap-2 text-sm text-slate-300">
//                   <span className="text-blue-400">{index + 1}.</span>
//                   {section.title}
//                 </div>
//               ))}
//             </div>
//             {formData.selectedTags.length > 0 && (
//               <div className="mt-4">
//                 <h4 className="text-white font-semibold mb-2">Tags:</h4>
//                 <div className="flex flex-wrap gap-2">
//                   {formData.selectedTags.map((tag, index) => (
//                     <span 
//                       key={index} 
//                       className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="flex gap-4 justify-center">
//         <button
//           onClick={() => handleSubmit('draft')}
//           disabled={loading}
//           className="px-8 py-3 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
//         >
//           <Save size={16} />
//           {loading ? 'Saving...' : 'Save as Draft'}
//         </button>
//         <button
//           onClick={() => handleSubmit('published')}
//           disabled={loading}
//           className="px-8 py-3 bg-green-500 hover:bg-green-600 disabled:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
//         >
//           <Eye size={16} />
//           {loading ? 'Publishing...' : 'Publish Course'}
//         </button>
//       </div>
//     </div>
//   );

//   const renderCurrentStep = () => {
//     switch (currentStep) {
//       case 1: return <Step1BasicInfo />;
//       case 2: return <Step2Content />;
//       case 3: return <Step3PricingTags />;
//       case 4: return <Step4Preview />;
//       default: return <Step1BasicInfo />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-white mb-2">Create New Course</h1>
//           <p className="text-slate-400">Share your knowledge with the world</p>
//         </div>

//         {/* Step Indicator */}
//         <StepIndicator />

//         {/* Form Container */}
//         <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8">
//           <div className="w-8/12 mx-auto">
//             {renderCurrentStep()}

//             {/* Navigation Buttons */}
//             <div className="flex justify-between mt-12 pt-6 border-t border-slate-700">
//               <button
//                 onClick={handlePrev}
//                 disabled={currentStep === 1}
//                 className="px-6 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
//               >
//                 <ArrowLeft size={16} />
//                 Previous
//               </button>
              
//               {currentStep < 4 ? (
//                 <button
//                   onClick={handleNext}
//                   className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
//                 >
//                   Next
//                   <ArrowRight size={16} />
//                 </button>
//               ) : null}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseCreation;