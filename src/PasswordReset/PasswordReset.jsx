import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, CheckCircle, Mail } from 'lucide-react';
import { apiConnector } from '../services/apiConnector';
import { userAPI } from '../services/api';
import toast from 'react-hot-toast';

const PasswordResetFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const urlToken = searchParams.get('token');
    const urlEmail = searchParams.get('email');
    
    if (urlToken) {
      setToken(urlToken);
      setCurrentStep(3); // Go directly to step 3 (password reset form)
    }
    
    if (urlEmail) {
      setEmail(urlEmail);
    }
  }, [searchParams]);
  
  const sendResetEmail = async (email) => {
    setLoading(true);
    try {
      const formData = { email: email };
      const response = await apiConnector('POST', userAPI.RESET_TOKEN_PASSWORD_API, formData);
      const data = response.data;
      if (response.status === 200) { // Check status instead of response.ok
        setCurrentStep(2);
        toast.success('Reset email sent successfully');
      } else {
        alert(data.message || 'Error sending reset email');
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token, password, confirmPassword) => {
    setLoading(true);
    try {
      const formData = { token, password, confirmPassword };
      // Fix the API call here
      const response = await apiConnector('POST', userAPI.RESET_PASSWORD_API, formData);
      const data = response.data;
      if (response.status === 200) { // Check status instead of response.ok
        setCurrentStep(4);
      } else {
        alert(data.message || 'Error resetting password');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (currentStep === 1) {
      sendResetEmail(email);
    } else if (currentStep === 3) {
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
      }
      resetPassword(token, password, confirmPassword);
    }
  };

  const renderStep1 = () => (
    <div className="min-h-[calc(100vh-64px)] bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-2">Reset your password</h2>
        <p className="text-gray-400 mb-6">
          Enter the email address associated with your account and we'll send you a link to reset your password.
        </p>
        
        <div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              required
            />
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Reset Password'}
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-gray-400 hover:text-white flex items-center justify-center mx-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="min-h-[calc(100vh-64px)] bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md text-center">
        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-black" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">Check email</h2>
        <p className="text-gray-400 mb-6">
          We sent a password reset link to<br />
          <span className="text-white font-medium">{email}</span>
        </p>
        
        <button
          onClick={() => window.location.href = 'https://mail.google.com'}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-md transition duration-200 mb-6"
        >
          Open email
        </button>
        
        <p className="text-gray-400 text-sm mb-4">
          Didn't receive the email? Check your spam folder.
        </p>
        
        <div className="flex justify-center space-x-4 text-sm">
          <button
            onClick={() => setCurrentStep(1)}
            className="text-gray-400 hover:text-white flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to login
          </button>
          <span className="text-gray-600">|</span>
          <button
            onClick={() => sendResetEmail(email)}
            className="text-yellow-500 hover:text-yellow-400"
          >
            Resend email
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="min-h-[calc(100vh-64px)] bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-2">Choose new password</h2>
        <p className="text-gray-400 mb-6">
          Almost done. Enter your new password and you're all set.
        </p>
        
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              New password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm new password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="text-xs text-gray-400 space-y-1">
              <div className={`flex items-center ${password.length >= 8 ? 'text-green-400' : 'text-gray-400'}`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${password.length >= 8 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
                Must be at least 8 characters
              </div>
              <div className={`flex items-center ${/[A-Z]/.test(password) ? 'text-green-400' : 'text-gray-400'}`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${/[A-Z]/.test(password) ? 'bg-green-400' : 'bg-gray-600'}`}></div>
                Must contain one uppercase character
              </div>
              <div className={`flex items-center ${/[a-z]/.test(password) ? 'text-green-400' : 'text-gray-400'}`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${/[a-z]/.test(password) ? 'bg-green-400' : 'bg-gray-600'}`}></div>
                Must contain one lowercase character
              </div>
              <div className={`flex items-center ${/\d/.test(password) ? 'text-green-400' : 'text-gray-400'}`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${/\d/.test(password) ? 'bg-green-400' : 'bg-gray-600'}`}></div>
                Must contain one number
              </div>
            </div>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-gray-400 hover:text-white flex items-center justify-center mx-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="min-h-[calc(100vh-64px)] bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">Reset complete!</h2>
        <p className="text-gray-400 mb-8">
          Your password has been successfully reset.<br />
          You can now sign in with your new password.
        </p>
        
        <button
          onClick={() => navigate('/login')}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-md transition duration-200"
        >
          Back to login
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
      {currentStep === 4 && renderStep4()}
    </div>
  );
};

export default PasswordResetFlow;