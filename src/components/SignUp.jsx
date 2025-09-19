import React, { useState,useEffect } from 'react';
import { Eye, EyeOff, ChevronDown } from 'lucide-react';
import {toast} from 'react-hot-toast';
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/api';
import { useNavigate } from "react-router-dom";
import { useDispatch , useSelector} from 'react-redux';
import { setUser } from '../reducers/profileSlice';

// todo: raise the error when field is incomplete and store the user information in store for using it during OTP verification and signup
const SignUp = () => {
    const {user}=useSelector((state)=>state.profile);
    console.log("hey",user);
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const [accountType, setaccountType] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });





  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

    const bodyData = {
        ...formData,
        accountType: accountType,
        };

                const sendOTP=async()=>{
                    try{
                         const result=await apiConnector("POST",categories.LOGIN_API,formData);
                         
                        }catch(err){
                            const errorMessage = err?.response?.data?.message || "Failed to send OTP";
                            throw new Error(errorMessage);
                        }
                       }
            
                
                useEffect(()=>{       
                    
                     },[]);

             const saveUser = ()=>{

                dispatch(setUser(bodyData));

             }


           function ffirstName() {
                if (!formData.firstName || formData.firstName.trim() === '') {
                    throw new Error("First name is required");  
                }
            }

            function femail() {
                if (!formData.email || !formData.email.includes('@')) {
                    throw new Error("Valid email is required");
                }
            }

            function fpassword() {
                if (!formData.password || formData.password.length < 6) {
                    throw new Error("Password must be at least 6 characters");
                }
            }
            function fmatchPassword(){
                if (!formData.confirmPassword || formData.password !==formData.confirmPassword) {
                    throw new Error("Password should match");
                }
            }
            


            const handleSubmit = async (e) => {
                    e.preventDefault();
                    console.log('Form submitted:', { ...formData, accountType });

                    try {
                        ffirstName();
                        femail();
                        fpassword();
                        fmatchPassword();
                        
                        saveUser();
                        await sendOTP();  // ✅ wait for OTP to be sent
                        toast.success("OTP send")
                        sessionStorage.setItem('otpAllowed', 'true');
                            navigate("/verifyOTP", { 
                                state: { fromSignup: true },
                                replace: true
                            });
                       
                    } catch (err) {
                        toast.error(err.message);
                        
                 }
             };

            



  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left Section - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Join the millions learning to code with E-learning for free
            </h1>
            <p className="text-gray-300 mb-1">
              Build skills for today, tomorrow, and beyond.{' '}
              <span className="text-blue-400 italic">Education to future-proof your career.</span>
            </p>
          </div>

          {/* User Type Toggle */}
          <div className="bg-gray-800 rounded-lg p-1 mb-6 flex">
            <button
              onClick={() => setaccountType('student')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                accountType === 'student'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setaccountType('instructor')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                accountType === 'instructor'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Instructor
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                required
              />
            </div>

            {/* Phone Number
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <div className="relative">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="appearance-none bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-8"
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+86">+86</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="12345 67890"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-l-0 border-gray-700 rounded-r-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                  required
                />
              </div>
            </div> */}

            {/* Password Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Create Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter Password"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Enter Password"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-4 rounded-lg transition-colors duration-200 mt-6"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="flex-1 relative overflow-hidden">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <pattern id="pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 0 5 L 5 0 L 10 5 L 5 10 Z" fill="white" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#pattern)"/>
            </svg>
          </div>
        </div>

        {/* Main Image Container */}
        <div className="flex items-center justify-center h-full p-12">
          <div className="relative">
            {/* Background Decoration */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 blur-lg"></div>
            
            {/* Image Frame */}
            <div className="relative bg-white rounded-2xl p-4 shadow-2xl">
              <div className="w-96 h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                {/* Simulated Image Content */}
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Learn to code with others</h3>
                    <p className="text-gray-600 text-sm max-w-xs">
                      Join millions of students learning programming, web development, and more with interactive courses.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-500 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 -right-8 w-4 h-4 bg-purple-500 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Bottom Decorative Pattern */}
        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20">
          <div className="grid grid-cols-4 gap-1 h-full">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="bg-white transform rotate-45"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;