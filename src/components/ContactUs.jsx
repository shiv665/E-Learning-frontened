import React, { useState } from 'react';
import { MessageCircle, MapPin, Phone, ChevronDown } from 'lucide-react';

import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/api';
import toast from 'react-hot-toast';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

   

  const contactingUs=async()=>{
                      try{
                           const result=await apiConnector("POST",categories.CONTACT_API,bodyData);
                           console.log(result);
                          }catch(err){
                              const errorMessage = err?.response?.data?.message || "TRY AGAIN";
                              throw new Error(errorMessage);
                          }
                         }
  
  const [countryCode, setCountryCode] = useState('+91');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const bodyData = {
        ...formData,
        countryCode: countryCode,
        };

  const countryCodes = [
    { code: '+1', country: 'US' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'IN' },
    { code: '+86', country: 'CN' },
    { code: '+49', country: 'DE' },
    { code: '+33', country: 'FR' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', bodyData);
    try{
        await contactingUs();
        toast.success("Response recorded, will contact you shortly");

    }catch(err){
      toast.error(err.message)
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column - Contact Information */}
          <div className="space-y-8">
            
            {/* Chat on us */}
            <div className="bg-slate-800/50 rounded-2xl p-6 lg:p-8 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-slate-700 rounded-lg p-3">
                  <MessageCircle className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Chat on us</h3>
                  <p className="text-slate-400 mb-2">Our friendly team is here to help.</p>
                  <p className="text-slate-300">shivanshofficial083@gmail.com address</p>
                </div>
              </div>
            </div>

            {/* Visit us */}
            <div className="bg-slate-800/50 rounded-2xl p-6 lg:p-8 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-slate-700 rounded-lg p-3">
                  <MapPin className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Visit us</h3>
                  <p className="text-slate-400 mb-2">Come and say hello at our office HQ.</p>
                  <p className="text-slate-300">IIT Roorkee</p>
                </div>
              </div>
            </div>

            {/* Call us */}
            <div className="bg-slate-800/50 rounded-2xl p-6 lg:p-8 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-slate-700 rounded-lg p-3">
                  <Phone className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Call us</h3>
                  <p className="text-slate-400 mb-2">Mon - Fri From 8am to 5pm</p>
                  <p className="text-slate-300">+91 9532472127</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-slate-800/30 rounded-2xl p-6 lg:p-8 border border-slate-700/50">
            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Got a Idea? We've got the skills.
                <br />
                Let's team up
              </h2>
              <p className="text-slate-400 text-lg">
                Tell us more about yourself and what you're got in mind.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 transition-all duration-300"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <div className="flex">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex  items-center px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-slate-600/50 transition-all duration-300"
                    >
                      <span className="text-white  ">{countryCode}</span>
                      <ChevronDown className="w-4 h-4 ml-2 text-slate-400" />
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute top-full scroll-auto   left-0 z-10 bg-slate-700 border border-slate-600 rounded-lg mt-1 shadow-xl">
                        {countryCodes.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => {
                              setCountryCode(country.code);
                              setIsDropdownOpen(false);
                            }}
                            className="h-9 block w-full px-4 py-2 text-left text-white hover:bg-slate-600 transition-colors duration-200"
                          >
                            {country.code}{country.country} 
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="12345 67890"
                    className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 border-l-0 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Enter your message"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 resize-none transition-all duration-300"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-800"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;