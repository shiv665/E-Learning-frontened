import React, { useState, useEffect, useRef, use } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Bell, Book, Users, BarChart2, Settings, ChevronDown, ChevronUp, Search, Sun, Moon, Menu, X, Sparkles, Clipboard, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../reducers/profileSlice';
import { resetToken } from '../reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import { apiConnector } from '../services/apiConnector';
import { coursesAPI, userAPI } from '../services/api';
import { useParams } from 'react-router-dom';
import CourseCardDetails from './core/homepage/CourseCardDetails';
import toast from 'react-hot-toast';
import { setUser } from '../reducers/profileSlice';
import UpdateProfilePhoto from './core/homepage/updateProfilePhoto';
import GetAllcourses from './Courses/getAllcourses';












const Sidebar = ({ activePage, setActivePage, isSidebarOpen, setSidebarOpen, isDarkMode }) => {
  const navItems = [
    { name: 'Dashboard', icon: BarChart2 },
    { name: 'Courses', icon: Book },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-30 w-64 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:shadow-none`}>
      <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>StudentDashboard</h1>
        <button onClick={() => setSidebarOpen(false)} className="md:hidden">
          <X className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
        </button>
      </div>
      <nav className="mt-6">
        {navItems.map(item => (
          <a
            key={item.name}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActivePage(item.name);
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
            className={`flex items-center px-6 py-3 my-1 transition-colors duration-200 ${
              activePage === item.name
                ? `border-r-4 ${isDarkMode ? 'bg-gray-800 border-indigo-500 text-white' : 'bg-gray-100 border-indigo-500 text-indigo-600'}`
                : `${isDarkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'}`
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="mx-4 font-medium">{item.name}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

const Header = ({ setSidebarOpen, isDarkMode, toggleDarkMode }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const role= user?.accountType;
  const imageURI = user?.image;
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const handleClick=()=>{
      if (window.confirm('Are you sure you want to logout?')){
      dispatch(resetUser());
      dispatch(resetToken());
      navigate('/login');
      }
    }

  return (
    <header className={`sticky top-0 z-20 ${isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-sm shadow-sm`}>
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
             <button onClick={() => setSidebarOpen(true)} className="md:hidden mr-4">
                <Menu className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            </button>
          </div>

          <div className="flex items-center">

            <button onClick={toggleDarkMode} className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                {isDarkMode ? <Sun className="text-yellow-400"/> : <Moon className="text-gray-600"/>}
            </button>

            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center focus:outline-none">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={imageURI || 'https://via.placeholder.com/150'}
                  alt="Student Avatar"
                />
                <span className={`hidden md:inline-block ml-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{user?.firstName} {user?.lastName}</span>
                {dropdownOpen ? <ChevronUp className={`w-4 h-4 ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} /> : <ChevronDown className={`w-4 h-4 ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />}
              </button>
              {dropdownOpen && (
                <div className={`absolute right-0 mt-2 w-48 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-md shadow-lg py-1 z-20`}>
                  <a href="#" onClick={handleClick} className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'}`}>Logout</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const DashboardCard = ({ item, isDarkMode }) => {
  return(
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md flex items-center`}>
    <div className={`p-3 rounded-full ${item.color}`}>
      <item.icon className="h-6 w-6 text-white" />
    </div>
    <div className="ml-4">
      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.name}</p>
      <p className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{item.value}</p>
    </div>
  </div>
  );
};

const Dashboard = ({ isDarkMode }) => {

  const {token}= useSelector((state) => state.auth);
  const [totalCourses, setTotalCourses] = useState(0);
  const [CourseOfStudent, setCoursesOfStudent] = useState([]);
  const id= useParams().id;
  const payload={
    studentId: id,
    token: token
  }

  useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await apiConnector('POST', coursesAPI.GET_COURSE_STUDENT_ENROLLED, payload);
                if (response.status === 200) {
                    setCoursesOfStudent(response?.data?.courses || []);
                    console.log('Courses fetched successfully:', response?.data?.courses);
                } else {
                    console.error('Failed to fetch courses:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [id, token]); 


   useEffect(() => {
    setTotalCourses(CourseOfStudent.length);
   }, [CourseOfStudent]);




  const summaryData = [
  { name: 'Courses Enrolled', value: totalCourses, icon: Book, color: 'bg-green-500' },
   ];


  
  
  return(
    <>
        <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {summaryData.map(item => <DashboardCard key={item.name} item={item} isDarkMode={isDarkMode} />)}
        </div>

        <GetAllcourses/>


    </>
);};


//update this to dark mode also

const Courses = () => {
    const {token}= useSelector((state) => state.auth);
    const [CourseOfStudent, setCoursesOfStudent] = useState([]);
    const id= useParams().id;
    const payload={
      studentId: id,
      token: token
    }

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await apiConnector('POST', coursesAPI.GET_COURSE_STUDENT_ENROLLED, payload);
                if (response.status === 200) {
                    setCoursesOfStudent(response?.data?.courses || []);
                    console.log('Courses fetched successfully:', response?.data?.courses);
                } else {
                    console.error('Failed to fetch courses:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [id, token]); 

    const navigate = useNavigate();




   

    return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Your Courses
        </h1>

        <div className="flex md:flex-row flex-col flex-wrap justify-center gap-6  bg-white rounded-xl shadow-lg p-6">
          {CourseOfStudent.map((course) => {
            return (
              <div
                key={course._id}
                className="transform hover:scale-105 transition-transform duration-300 ease-in-out bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden w-full md:w-80"
              >
                <CourseCardDetails course={course} />
              </div>
            );
          })}
        </div>

      </div>


      
    </>
    );
};





const SettingPage = ({ isDarkMode }) =>{ 
  
  const {token}= useSelector((state) => state.auth);
  const {user}= useSelector((state) => state.profile);
  const [additionalDetails, setAdditionalDetails] = useState({});

  const [visible, setVisible] = useState(false);
  const modalRef = useRef(null);


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const payload = { userId: user._id, token: token };
        const response = await apiConnector('POST', userAPI.GET_USER_DETAILS_API, payload);
          console.log('User details fetched successfully:', response?.data?.profile?.additionalDetails);
          setAdditionalDetails(response?.data?.profile?.additionalDetails || {});  
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, []); 



  const [formData, setFormData] = useState({phoneNumber:'',gender:'', dateOfBirth: '', about: ''});

  //how to update the formData
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  
  

  const handleProfileUpdate = async () => {
    try{
      
      const payload = { ...formData, userId: user._id, token: token };
      const response = await apiConnector('PUT', userAPI.UPDATE_PROFILE_API, payload);

      console.log("Response from API:", response);

      console.log("Form Data:", formData);
      toast.success("Profile updated successfully");

      setAdditionalDetails(response?.data?.profile || {});

      

    }catch(error){
      toast.error(error?.data?.message || "Failed to update profile");
      console.error("Error updating profile:", error);
    }
  }
    //check this only when i have completed the entire project
  const handleDeleteAccount = async () => {
    try{
      window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
      const response = await apiConnector('DELETE', userAPI.DELETE_ACCOUNT_API, { userId: user._id, token: token });

    }catch(error){
      toast.error(error?.data?.message || "Failed to delete account");
      console.error("Error deleting account:", error);
    }
  };

      const handleOpenModal = () => {
          setVisible(true);
        };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setVisible(false);
      }
    };

    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible]);
    
 
  
  return(
    <>
        <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Settings</h2>
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-md `}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className={`p-6 rounded-xl shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} `}>
                        <h3
                          className={`text-2xl font-bold mb-6 tracking-wide ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}
                        >
                          Profile Information
                        </h3>

                        <div
                          className={`mb-4 px-4 py-2 rounded-lg ${
                            isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-400'
                          } font-semibold text-lg shadow-sm`}
                        >
                          <h1 className='text-gray-800'>Name</h1> {user?.firstName} {user?.lastName}
                        </div>

                        <div
                          className={` overflow-auto mb-4 px-4 py-2 rounded-lg ${
                            isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-400'
                          } font-semibold text-lg shadow-sm`}
                        >
                          <h1 className='text-gray-800'>Email:</h1> {user?.email}
                        </div>
                        <div
                          className={`mb-4 px-4 py-2 rounded-lg ${
                            isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-400'
                          } font-semibold text-lg shadow-sm`}
                        >
                          <h1 className='text-gray-800'>PhoneNumber:</h1> {additionalDetails?.phoneNumber}
                        </div>
                        <div
                          className={`mb-4 px-4 py-2 rounded-lg ${
                            isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-400'
                          } font-semibold text-lg shadow-sm`}
                        >
                            <h1 className='text-gray-800'>Gender:</h1>{additionalDetails?.gender}
                        </div>
                        <div
                          className={`mb-4 px-4 py-2 rounded-lg ${
                            isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-400'
                          } font-semibold text-lg shadow-sm`}
                        >
                          <h1 className='text-gray-800'>DOB:</h1> {additionalDetails?.dateOfBirth ? new Date(additionalDetails.dateOfBirth).toLocaleDateString() : 'N/A'}
                        </div>
                      </div>

                 <div
                          className=" relative p-1  shadow-lg flex items-center justify-center overflow-hidden 
                          w-auto h-auto aspect-square"
                        >
                          <img
                            src={user?.image}
                            alt="profilePhoto"
                            className="rounded-full object-cover w-full h-full border-2 border-gray-300"
                          />
                          <button onClick={handleOpenModal} className=' absolute bottom-2  w-1/3 justify-center items-center flex'>
                              <div className={`bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 p-7 mt-7`}>
                                  Update Photo
                                  
                              </div>
                            </button>

                            {visible && (
                              <div 
                                className="w-[50%] h-[50%] left-[25%] top-[25%] fixed inset-0 bg-opacity-50 flex items-center justify-center"
                              >
                                <div ref={modalRef}>
                                  <UpdateProfilePhoto />
                                </div>
                              </div>
                            )}

                        </div>



                
            </div>

             {/* updating the profile section ie dateofbirth phoneNumber about gender */}

              <div className={`flex flex-col mt-8 p-6 rounded-xl shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} `}>

                <h3
                          className={`text-2xl font-bold mb-6 tracking-wide ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}
                        >
                          Update Profile
                </h3>

                <div className={`gap-8 grid grid-cols-1 md:grid-cols-2 p-6 rounded-xl shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} `}>
                        
                        <div
                          className={`mb-4 px-4 py-2 rounded-lg ${
                            isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-400'
                          } font-semibold text-lg shadow-sm`}
                        >
                            <h1 className='text-gray-800'>Gender:</h1>
                            
                              <input
                                type="text"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                placeholder="M/F/Other"
                                className="w-full px-4 py-3  border-gray-700 rounded-lg text-gray-400 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                                required
                              />
                            
                        </div>



                        <div
                          className={`mb-4 px-4 py-2 rounded-lg ${
                            isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-400'
                          } font-semibold text-lg shadow-sm`}
                        >
                            <h1 className='text-gray-800'>Date of Birth:</h1>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                placeholder="select"
                                className="w-full px-4 py-3  border-gray-700 rounded-lg text-gray-500 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                                required
                              />
                        </div>


                        <div
                          className={`mb-4 px-4 py-2 rounded-lg ${
                            isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-400'
                          } font-semibold text-lg shadow-sm`}
                        >
                            <h1 className='text-gray-800'>Phone Number:</h1>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="1234567890"
                                className="w-full px-4 py-3  border-gray-700 rounded-lg text-gray-400 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                                required
                              />
                        </div>


                        <div
                          className={`mb-4 px-4 py-2 rounded-lg ${
                            isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-400'
                          } font-semibold text-lg shadow-sm`}
                        >
                            <h1 className='text-gray-800'>About:</h1>
                            <textarea
                                name="about"
                                value={formData.about}
                                onChange={handleInputChange}
                                placeholder="Tell us about yourself"
                                className="w-full px-4 py-3  border-gray-700 rounded-lg text-gray-400 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                                rows="4"
                                required  
                              ></textarea>
                            
                        </div>

                  </div>

                  <button onClick={handleProfileUpdate} className='w-1/3 justify-center items-center flex'>
                    <div className={`bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 p-7 mt-7`}>
                        Update Profile
                    </div>
                  </button>
                 

              </div>

              <div className='flex justify-center items-center'>
                <button onClick={handleDeleteAccount} className={`bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 p-7 mt-7`}>
                  Delete Account
                </button>
              </div>


        </div>
    </>
)};


// --- Main App Component --- //
export default function App() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleDarkMode = () => {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
  }

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard isDarkMode={isDarkMode} />;
      case 'Courses':
        return <Courses isDarkMode={isDarkMode} />;
      case 'Settings':
        return <SettingPage isDarkMode={isDarkMode} />;
      default:
        return <Dashboard isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} font-sans`}>
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage}
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isDarkMode={isDarkMode}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
            setSidebarOpen={setSidebarOpen}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8">
          {renderPage()}
        </main>
      </div>
       {isSidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"></div>}
    </div>
  );
}
