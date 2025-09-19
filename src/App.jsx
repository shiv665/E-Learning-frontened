window.global = window;
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import OTPVerification from './components/OTP'
import Login from './components/Login'
import About from './components/About'
import ContactUs from './components/ContactUs'
import UpdateProfilePhoto from './components/core/homepage/updateProfilePhoto';
import ProtectedOTPRoute from './components/core/homepage/ProtectedOtpRoute'
import PaymentUI from './components/PaymentUI'
import TeacherDashboard from './components/TeacherDashboard'
import CourseCreation from './components/Courses/courseCreation';
import GetAllcourses from './components/Courses/getAllcourses'
import GetSingleCourseDetails from './components/Courses/getSingleCourseDetails'
import AddEditSection from './components/Courses/AddEditSection'
import AddEditSubSection from './components/Courses/AddEditSubSection'
import Display from './components/core/homepage/userDisplayOfCourse/Display';

import { useDispatch, useSelector } from 'react-redux'
import CourseCreationAndUpdation from './components/Courses/CourseCreationAndUpdation'
import StudentDashboard from './components/StudentDashboard'
import { useEffect } from 'react'
import { apiConnector } from './services/apiConnector';
import { categories } from './services/api'
import { setUser } from './reducers/profileSlice'
import PasswordResetFlow from './PasswordReset/PasswordReset';
import Catalog from './components/Catalog';


const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <div>
        <Navbar/>
        <Home/>
      </div>   
  },
  {
    path: "/About/",
    element: 
      <div>
        <Navbar/>
        <About/>
      </div>   
  },
  {
    path: "/Contact",
    element: 
      <div>
        <Navbar/>
        <ContactUs/>
      </div>   
  },
  {
    path: "/login",
    element: 
      <div>
        <Navbar/>
        <Login/>
      </div>   
  },
  {
    path: "/signUp",
    element: 
      <div>

        <Navbar/>
        <SignUp/>
      </div>   
  },
  {
    path: "/verifyOTP",
    element: (
    <ProtectedOTPRoute>
      <div>
        <Navbar/>
        <OTPVerification/>
      </div>
    </ProtectedOTPRoute>) 
  },
  {
    path: "/updateProfilePhoto",
    element: 
      <div>

        <Navbar/>
        <UpdateProfilePhoto />
      </div>   
  },
  {
    path: "*",
    element: 
      <div>
        <PaymentUI/>
      </div>

  }
  ,
  {
    path: "/catalog",
    element:
      <div>
        <Navbar/>
        <Catalog/>
      </div>
  },
  

  {
    path: "/Dashboard/instructor/:id",
    element: 
      <div>
        <TeacherDashboard/>
      </div>

  },
  {
    path: "/Dashboard/student/:id",
    element: 
      <div>
        <StudentDashboard/>
      </div>

  },
  {
    path: "/courseCreation/:id",
    element: 
      <div>
        <Navbar/>
        <CourseCreation/>
      </div>

  }
  ,
  {
    path: "/getAllCourses",
    element: 
      <div>
        <Navbar/>
        <GetAllcourses/>
      </div>

  },
  {
    path: "/resetPassword",
    element: 
      <div>
        <Navbar/>
        <PasswordResetFlow/>
      </div>
  },
  {
  path: "/resetpassword/:id", 
  element: 
    <div>
      <Navbar/>
      <PasswordResetFlow/>
    </div>
  },
  // {
  //   path: "/getAllCourses/:id",
  //   element: 
  //     <div>
  //       <Navbar/>
  //       <GetSingleCourseDetails/>
  //     </div>

  // },
  {
    path: "/section/:id",
    element: 
      <div>
        <Navbar/>
        <AddEditSection/>
      </div>

  }
  ,
  {
    path: "/subsection/:id",
    element: 
      <div>
        <Navbar/>
        <AddEditSubSection/>
      </div>

  }
  ,
  {
    path: "/courseUpdation/:id",
    element: 
      <div>
        <Navbar/>
        <CourseCreationAndUpdation/>
      </div>

  },
  {
    path: "/courses/display/:id",
    element: 
      <div>
        <Navbar/>
        <Display/>
      </div>

  }
]);


function App() {
  // what is to be done is that it should be used in navbar and should be fetched once and stored in redux
  const {user} = useSelector((state) => state.profile);
  const userId = user?._id;
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
  const fetchUserData = async () => {
    const formData = {
      token: token,
      userId: userId
    };
    const response = await apiConnector("POST", categories.GET_USER_DETAILS, formData);
    dispatch(setUser(response.data.data));
  };

    if (user?._id) fetchUserData(); 
  }, []);

  return (
    <>
      <div className="w-screen min-h-screen bg-gray-900 flex flex-col">
        <RouterProvider router={router}/>
        </div>
    </>
  )
}

export default App
