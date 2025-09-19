import React, { useEffect } from 'react';
import { Star, Users, Calendar, User, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { buyCourse } from '../../../services/paymentAPI';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../reducers/profileSlice';
import { apiConnector } from '../../../services/apiConnector';
import { categories } from '../../../services/api';
import RatingAndReview from './RatingAndReview';
import { useState } from 'react';
import { useRef } from 'react';

const CourseCardDetails = ({ course }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token}=useSelector((state) => state.auth);
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => state.profile);
  console.log("Token from CourseCardDetails:", token);
  console.log("User from CourseCardDetails:", user);
  const reviewRef = useRef(null);
  
  
  const {
    _id,
    courseName,
    price,
    thumbnail,
    Instructor,
    StudentsEnrolled = [],
    RatingAndReviews = []
  } = course;
  const EnrolledInCourse=user?.courses;
  const isEnrolled = EnrolledInCourse.includes(_id);
  // create array of course content
  const courseArray=[course];
  const handleClick = () => {
    try{
      if(token){
        buyCourse(token , user, courseArray, navigate,dispatch);
        return
      }

    }catch(error){
      console.error("Error handling click:", error);
    }

 
  }
  const handleClickofEditCourse = () => {
    navigate(`/courseUpdation/${_id}`);
  };
  const handleClickEnrolledCourses = () => {
    navigate(`/courses/display/${_id}`);
  }
  const handleReviewAndRate = () => {
    if(visible){
      setVisible(false);
    }else{
      setVisible(true);
    }
  };
  
    useEffect(() => {
    const handleClickOutside = (event) => {
      if (reviewRef.current && !reviewRef.current.contains(event.target)) {
        setVisible(false);
      }
    };

    if (visible) {
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible]);

  const instructorName = `${Instructor?.firstName} ${Instructor?.lastName}`;
  const enrolledCount = StudentsEnrolled.length;
  const averageRating = RatingAndReviews.length > 0 
    ? RatingAndReviews.reduce((sum, review) => sum + review.rating, 0) / RatingAndReviews.length 
    : 0;

  return (
    <div className="border border-amber-50 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105 w-[100%] mx-auto">
      {/* Course Thumbnail */}
      <div className="relative overflow-hidden">
        <img
          src={thumbnail}
          alt={courseName}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          Rs. {price}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Course Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 capitalize leading-tight">
          {courseName}
        </h3>

        {/* Instructor Info */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative">
            <img
              src={Instructor?.image}
              alt={instructorName}
              className="w-10 h-10 rounded-full object-cover border-2 border-purple-200"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{instructorName}</p>
            <p className="text-xs text-gray-500">Instructor</p>
          </div>
        </div>

        {/* Course Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4 text-blue-500" />
            <span>{enrolledCount} enrolled</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span>{averageRating > 0 ? averageRating.toFixed(1) : 'New'}</span>
          </div>
        </div>

        {/* Course Categories/Tags */}
        <div className="mb-4">
          <span className="inline-block bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
            <BookOpen className="w-3 h-3 inline mr-1" />
            {courseName.toUpperCase()}
          </span>
        </div>

        {/* Action Button */}
        {
          user.accountType=="student" && !isEnrolled && (
            <button onClick={handleClick} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-xl">
          Enroll Now
            </button>)
            
        }
        {
          user.accountType=="student" && isEnrolled && (
            <>
            <div className=' relative flex flex-col space-y-4 w-full'>
                <button 
                  onClick={handleClickEnrolledCourses} 
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  Explore and Learn
                </button>

                <button 
                  onClick={handleReviewAndRate} 
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  Give Review and Rate
                  
                </button>
                {visible && (
                      <div ref={reviewRef} >
                        <RatingAndReview _id={`${_id}`} />
                      </div>
                    )}
              </div>
            </>
            )
            
        }
        {
          user.accountType=="instructor" && (
            <button onClick={handleClickofEditCourse} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-xl">
            Edit and upload the Course Content
            </button>)
            
        }
      </div>
    </div>
  );
};



export default CourseCardDetails;