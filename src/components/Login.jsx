import React, { useState } from 'react';
import { Eye, EyeOff, Search, ShoppingCart } from 'lucide-react';
import { useDispatch , useSelector} from 'react-redux';
import {toast} from 'react-hot-toast';
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../reducers/profileSlice';
import {setToken} from '../reducers/authSlice';

// one important things which have to be done in this is to logout after 1 hour or 1 day using jwt-decode

const Login = () => {
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const {user}=useSelector((state)=>state.profile);



  const [userType, setUserType] = useState('Student');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const login=async()=>{
      console.log(formData);
                        try{
                          const url=categories.LLOGIN_API;
                             const result=await apiConnector("POST",url,formData);
                             const user= result.data.existingUser;
                             const token=result.data.token;
                             
                             dispatch(setToken(token));
                             dispatch(setUser(user));
                            }catch(err){
                                const errorMessage = err?.response?.data?.message || "Retry after some time";
                                throw new Error(errorMessage);
                            }
                           }
                           function femail() {
                                if (!formData.email || !formData.email.includes('@')) {
                                    throw new Error("Valid email is required");
                                }
                            }
  const handleSubmit =async () => {
        try{
          femail();
          await login();
          toast.success("LOGIN completed");
          navigate('/');
        }catch(err){
          toast.error(err.message);
        }
        
      }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Main Content */}
      <div className="flex min-h-screen">
        {/* Left Section - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">Welcome Back</h1>
              <p className="text-gray-300 mb-1">
                Build skills for today, tomorrow, and beyond.{' '}
                <span className="text-blue-400 italic">Education to future-proof your career.</span>
              </p>
            </div>

            {/* User Type Toggle */}
            <div className="bg-gray-800 rounded-lg p-1 mb-6 flex">
              <button
                onClick={() => setUserType('Student')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  userType === 'Student'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => setUserType('Instructors')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  userType === 'Instructors'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Instructors
              </button>
            </div>

            {/* Login Form */}
            <div className="space-y-6">
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

              {/* Password */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Password <span className="text-red-500">*</span>
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
                
                {/* Forgot Password Link */}
                <div className="text-right mt-2 ">
                  <a href="resetPassword" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    Reset password
                  </a>
                 
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Sign in
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
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-purple-600 rounded-2xl opacity-20 blur-lg"></div>
              
              {/* Image Frame */}
              <div className="relative bg-white rounded-2xl p-4 shadow-2xl">
                <div className="w-96 h-64 bg-gradient-to-br from-orange-100 to-purple-100 rounded-lg overflow-hidden">
                  {/* Simulated Image Content - Student with laptop */}
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Welcome back to learning</h3>
                      <p className="text-gray-600 text-sm max-w-xs">
                        Continue your educational journey and unlock new opportunities with our comprehensive courses.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-500 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-orange-500 rounded-full animate-pulse"></div>
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
    </div>
  );
};

export default Login;