import React, { useState, useRef, useEffect } from 'react';
import { AArrowUp, ArrowLeft, RotateCcw } from 'lucide-react';
import { useNavigate } from "react-router-dom";

import { useDispatch , useSelector} from 'react-redux';
import {toast} from 'react-hot-toast';
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/api';

const OTPVerification = () => {
    const dispatch =useDispatch();
    const navigate = useNavigate();
    const {user}=useSelector((state)=>state.profile);
    console.log("hello",user);



  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus on first input when component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    // Only allow single digit
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (otp[index]) {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous input and clear it
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
        setActiveIndex(index - 1);
      }
    }
    // Handle arrow keys
    else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
      setActiveIndex(index - 1);
    }
    else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1].focus();
      setActiveIndex(index + 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^[a-zA-Z0-9]$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    
    setOtp(newOtp);
    
    // Focus on the next empty input or last input
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex].focus();
    setActiveIndex(nextIndex);
  };

  const otpString = otp.join(''); // Converts ['A','B','C','D','E','F'] → 'ABCDEF'

    const bodyData = {
    ...user,
    otp: otpString,
    };


  const signUp=async()=>{
    console.log(bodyData);
                      try{
                           const result=await apiConnector("POST",categories.SIGNUP_API,bodyData);
                          }catch(err){
                              throw err;
                          }
                         }

  const handleVerify =async () => {
    if (otpString.length === 6) {
      try{
        await signUp();
        toast.success("signUp completed");
        sessionStorage.removeItem('otpAllowed');
        navigate('/login');
      }catch(err){
        toast.error(err.message);
      }
      
    }
  };
  const sendOTP=async()=>{
                
                      try{
                           const result=await apiConnector("POST",categories.LOGIN_API,user);
                           
                          }catch(err){
                              throw err;
                          }
                         }
              

  const handleResend = async () => {

    try{
        toast.success('Resending OTP...');
        await sendOTP();
        toast.success("OTP send")

        setOtp(['', '', '', '', '', '']);
        setActiveIndex(0);
        inputRefs.current[0].focus();

    }
    
    catch(err){
        toast.error(err.message);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const isComplete = otp.every(digit => digit !== '');

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Verify email</h1>
          <p className="text-gray-400 text-base leading-relaxed">
            A verification code has been sent to you. Enter the code below
          </p>
        </div>

        {/* OTP Input Fields */}
        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value.replace(/[^a-zA-Z0-9]/g,''))}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={() => setActiveIndex(index)}
              className={`w-14 h-14 text-center text-xl font-semibold rounded-lg border-2 transition-all duration-200 focus:outline-none ${
                digit 
                  ? 'bg-gray-800 border-yellow-500 text-white' 
                  : activeIndex === index
                  ? 'bg-gray-800 border-yellow-500 text-white'
                  : 'bg-gray-800 border-gray-600 text-gray-400 hover:border-gray-500'
              }`}
              style={{
                caretColor: 'transparent'
              }}
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={!isComplete}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
            isComplete
              ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          Verify email
        </button>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handleBackToLogin}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to login</span>
          </button>

          <button
            onClick={handleResend}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm font-medium">Resend it</span>
          </button>
        </div>

        {/* Additional Visual Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-yellow-500/10 rounded-full blur-xl"></div>
      </div>
    </div>
  );
};

export default OTPVerification;