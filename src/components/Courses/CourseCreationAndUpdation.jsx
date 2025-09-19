import React from 'react';
import GetSingleCourseDetails from './getSingleCourseDetails';

const CourseCreationAndUpdation = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-yellow-400 tracking-wide">
          📚 Course Details
        </h1>
        <p className="text-gray-400 mt-2">
          View complete details of the selected course below
        </p>
      </div>

      <div>
        <GetSingleCourseDetails />
      </div>
    </div>
  );
};

export default CourseCreationAndUpdation;
