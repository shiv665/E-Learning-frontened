import React, { use, useEffect } from 'react'
import { useState } from "react";
import { apiConnector } from '../../services/apiConnector';
import { coursesAPI } from '../../services/api';
import toast from "react-hot-toast";
import { useSelector } from 'react-redux';
import { Star, Users, Calendar, User, BookOpen } from 'lucide-react';
import CourseCardDetails from '../core/homepage/CourseCardDetails';

const getAllcourses = () => {
    const [courses, setCourses] = useState([]);
    const { user } = useSelector((state) => state.profile);
    const {token}= useSelector((state) => state.auth);
   
    
    const getAllCourses = async () => {
        if (!token) {
            toast.error("Please login to view courses");
            return;
        }
         try{   
            const bodyData = {
                token: token,
            }
            const result=await apiConnector("POST",coursesAPI.GET_ALL_COURSES_API,bodyData);
                           console.log(result);
                           setCourses(result?.data?.courses);
                            toast.success("Courses fetched successfully");
                          }catch(err){
                              const errorMessage = err?.response?.data?.message;
                              console.log(errorMessage);
                          }
        }
    useEffect(() => {
        getAllCourses();
    }, []);


    console.log("Current courses state:", courses);

        




  return (
    <div className='m-7 p-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 '>
        {

        courses.map((course) => (

            <CourseCardDetails key={course._id} course={course} />
        ))

       }

    </div>
  )
}

export default getAllcourses
