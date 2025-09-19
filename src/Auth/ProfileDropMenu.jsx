import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetUser } from '../reducers/profileSlice';
import { resetToken } from '../reducers/authSlice';

const ProfileDropMenu = () => {
  const { user } = useSelector((state) => state.profile);
  const role= user?.accountType;
  const imageURI = user?.image;
  const dispatch=useDispatch();

  useEffect(() => {
    console.log("User data:", user);
    console.log("Role:", role);
    console.log("Image URI:", user?._id);
  }, []);
  
  const handleClick=()=>{
    if (window.confirm('Are you sure you want to logout?')){
    dispatch(resetUser());
    dispatch(resetToken());
    }
  }

  return (
   <div className="relative inline-block group">
  {/* Avatar with enhanced styling */}
  <div className="cursor-pointer">
    <img
      src={imageURI}
      alt="User Avatar"
      className="w-12 h-12 rounded-full object-cover border-3 border-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ring-2 ring-blue-500/20 hover:ring-blue-500/40"
    />
    {/* Online status indicator */}
    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
  </div>

  {/* Dropdown Menu with hover visibility */}
  <div className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-lg border border-gray-200/60 rounded-2xl shadow-2xl z-50 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                  transform translate-y-2 group-hover:translate-y-0 
                  transition-all duration-300 ease-out">
    
    {/* Dropdown arrow */}
    <div className="absolute -top-2 right-4 w-4 h-4 bg-white/95 border-l border-t border-gray-200/60 rotate-45"></div>
    
    {/* User info section */}
    <div className="p-4 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <img
          src={imageURI}
          alt="User Avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-gray-900">{user.firstName} {user.lastName}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
    </div>

    {/* Menu items */}
    <div className="py-2">
      {/* Profile Settings */}
      <Link 
        to={`/Dashboard/${role}/${user?._id}`}
        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group/item"
      >
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover/item:bg-blue-200 transition-colors">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <p className="font-medium">Dashboard</p>
          <p className="text-xs text-gray-500">Enrich your skills</p>
        </div>
      </Link>

      {/* Change Profile Photo */}
      <Link 
        to="/updateProfilePhoto" 
        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200 group/item"
      >
        <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center group-hover/item:bg-amber-200 transition-colors">
          <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <p className="font-medium">Change Profile Photo</p>
          <p className="text-xs text-gray-500">Upload new avatar</p>
        </div>
      </Link>

      {/* Courses */}
      <Link 
        to="/Catalog" 
        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 group/item"
      >
        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover/item:bg-purple-200 transition-colors">
          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <p className="font-medium">Courses</p>
          <p className="text-xs text-gray-500">Customize your Learning</p>
        </div>
      </Link>

      {/* Divider */}
      <div className="my-2 border-t border-gray-100"></div>

      {/* Help & Support */}
      <Link 
        to="/contact" 
        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 group/item"
      >
        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover/item:bg-green-200 transition-colors">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="font-medium">Help & Support</p>
          <p className="text-xs text-gray-500">Get assistance</p>
        </div>
      </Link>

      {/* Logout */}
      <button 
        onClick={handleClick}
        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 group/item w-full text-left"
      >
        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover/item:bg-red-200 transition-colors">
          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>
        <div>
          <p className="font-medium">Logout</p>
          <p className="text-xs text-gray-500">Sign out of your account</p>
        </div>
      </button>
    </div>
  </div>
</div>
  );
};

export default ProfileDropMenu;
