import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { apiConnector } from '../../services/apiConnector';
import { coursesAPI } from '../../services/api';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const GetSingleCourseDetails = () => {
  const navigate = useNavigate();
  const { id: courseId } = useParams();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.profile.user);

  const [course, setCourse] = useState({});
  const [instructor, setInstructor] = useState({});
  const [tags, setTags] = useState([]);
  const [ratingAndReviews, setRatingAndReviews] = useState([]);

  const getCourseDetails = async () => {
    try {
      const bodyData = { courseId, token };
      const result = await apiConnector("POST", coursesAPI.GET_COURSE_API, bodyData);

      setCourse(result?.data?.courseDetails || {});
      setInstructor(result?.data?.courseDetails?.Instructor || {});
      setTags(result?.data?.courseDetails?.tags || []);
      setRatingAndReviews(result?.data?.courseDetails?.RatingAndReviews || []);
      toast.success("Courses fetched successfully");
    } catch (err) {
      console.error(err?.response?.data?.message || "Failed to fetch course");
    }
  };

  useEffect(() => {
    getCourseDetails();
  }, []);

  const handleSection = () => {
    if (courseId) {
      navigate(`/section/${courseId}`);
    } else {
      console.error('Course ID is not defined');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      {/* Course Card */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold text-yellow-400">{course.courseName}</h1>
        <p className="text-gray-300 text-lg">{course.courseDescription}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-700 rounded-xl p-4 shadow-md">
            <p className="font-semibold">Instructor:</p>
            <p className="text-gray-200">{instructor.firstName} {instructor.lastName}</p>
          </div>

          <div className="bg-gray-700 rounded-xl p-4 shadow-md">
            <p className="font-semibold">Price:</p>
            <p className="text-green-400 font-bold">₹{course.price}</p>
          </div>

          <div className="bg-gray-700 rounded-xl p-4 shadow-md">
            <p className="font-semibold">Category:</p>
            <p className="text-gray-200">
              {Array.isArray(tags) && tags.length > 0 ? tags.join(", ") : "N/A"}
            </p>
          </div>

          <div className="bg-gray-700 rounded-xl p-4 shadow-md">
            <p className="font-semibold">Rating:</p>
            <p className="text-yellow-400">{course.rating || "Not Rated"}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleSection}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-semibold shadow-md transition-all"
          >
            Go to Sections
          </button>
          <Link
            to={`/Dashboard/instructor/${user?._id}`}
                        className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg font-semibold shadow-md transition-all"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetSingleCourseDetails;
























// import React from 'react'
// import { useParams } from 'react-router-dom'
// import { apiConnector } from '../../services/apiConnector';
// import { coursesAPI } from '../../services/api';
// import { useSelector } from 'react-redux';
// import { toast } from 'react-hot-toast';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';


// const getSingleCourseDetails = () => {
//     const navigate = useNavigate();
//     const  courseId  = useParams();
//     const token = useSelector((state) => state.auth.token);
//     const [course, setCourse] = useState({});
//     console.log("Course ID:", courseId);
//     const [Instructor, setInstructor] = useState({});
//     const [tags, setTags] = useState([]);
//     const [ratingAndReviews, setRatingAndReviews] = useState([]);

//      const getCourseDetails = async () => {
        
//          try{   
//             const bodyData = {
//                 courseId: courseId.id,
//                 token: token,
//             }
//             const result=await apiConnector("POST",coursesAPI.GET_COURSE_API,bodyData);
//                            console.log(result);
//                            console.log("Course Details:", result?.data?.courseDetails);
//                            setCourse(result?.data?.courseDetails);
//                            setInstructor(result?.data?.courseDetails?.Instructor);
//                            setTags(result?.data?.courseDetails?.tags);
//                             setRatingAndReviews(result?.data?.courseDetails?.RatingAndReviews);
//                             toast.success("Courses fetched successfully");
//                           }catch(err){
//                               const errorMessage = err?.response?.data?.message;
//                               console.log(errorMessage);
//                           }
//         }
//     useEffect(() => {
//         getCourseDetails();
//     }, []);
//     const handleSection = () => {
//     if (courseId) {
//       navigate(`/section/${courseId.id}`);
//     } else {
//       console.error('Course ID is not defined');

//   }}

//   return (
//     <div><div className='flex flex-col items-center justify-center p-4'>
//         <h1>Course Details</h1>
//         <h2>{course.courseName}</h2>
//         <p>{course.courseDescription}</p>
//         <p>Instructor: {`${Instructor.firstName} ${Instructor.lastName}`}</p>
//         <p>Price: {course.price}</p>
//         <p>Category: {`${tags.tagName}`}</p>
//         <p>Rating: {course.rating}</p>
//         {/* Add more course details as needed */}

//     </div>

//     <div className='flex flex-col items-start justify-center p-4 m-7'>
//         <h1 className='font-bold text-4xl text-white'>{course.courseName}</h1>
//         <p>{course.courseDescription}</p>
//         //will be created later after additing section and subsection as well as rating and review section 
//     </div>
    
//     <button onClick={handleSection}>Section</button>
    
//     </div>    
//   )
// }

// export default getSingleCourseDetails



// import React, { useEffect, useState } from 'react';
// import { 
//   User, 
//   Star, 
//   Clock, 
//   Users, 
//   BookOpen, 
//   Award, 
//   Calendar,
//   Globe,
//   DollarSign,
//   Play,
//   Download,
//   Share2,
//   Heart,
//   CheckCircle,
//   ChevronDown,
//   ChevronUp
// } from 'lucide-react';

// const CourseDetailsPage = () => {
//   // Mock courseId - replace with actual routing logic
//   const courseId = "6896edf85c08c009070445a9";
//   const [course, setCourse] = useState({});
//   const [instructor, setInstructor] = useState({});
//   const [tags, setTags] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [showFullDescription, setShowFullDescription] = useState(false);
//   const [isEnrolled, setIsEnrolled] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');

//   // Mock API call - replace with your actual API
//   const getCourseDetails = async () => {
//     try {
//       setLoading(true);
//       // Simulated API response based on your JSON structure
//       const mockCourseData = {
//         _id: courseId,
//         courseName: "Machine Learning Fundamentals",
//         courseDescription: "Comprehensive introduction to machine learning concepts, algorithms, and practical applications. Learn Python, data preprocessing, supervised and unsupervised learning, neural networks, and deploy ML models in real-world scenarios.",
//         price: 2999,
//         status: "published",
//         createdAt: "2025-01-15T10:30:00Z",
//         updatedAt: "2025-08-01T15:45:00Z",
//         totalDuration: "12 hours 30 minutes",
//         studentsEnrolled: 1247,
//         rating: 4.8,
//         totalReviews: 324,
//         level: "Beginner to Intermediate",
//         language: "English",
//         certificate: true,
//         lastUpdated: "August 2025"
//       };

//       const mockInstructorData = {
//         firstName: "SHIVANSH",
//         lastName: "YADAV",
//         email: "shivansh328@gmail.com",
//         image: "https://api.dicebear.com/5.x/initials/svg?seed=SHIVANSH_YADAV",
//         bio: "Machine Learning Engineer with 8+ years of experience in AI/ML development. PhD in Computer Science, former Google AI researcher.",
//         experience: "8+ years",
//         studentsCount: 15000,
//         rating: 4.9,
//         courses: 12
//       };

//       const mockTagsData = [
//         { tagName: "Machine Learning", _id: "1" },
//         { tagName: "Python", _id: "2" },
//         { tagName: "Data Science", _id: "3" },
//         { tagName: "AI", _id: "4" }
//       ];

//       // Simulate API delay
//       setTimeout(() => {
//         setCourse(mockCourseData);
//         setInstructor(mockInstructorData);
//         setTags(mockTagsData);
//         setLoading(false);
//         setToastMessage("Course details loaded successfully");
//       }, 1000);

//     } catch (err) {
//       console.error("Error fetching course details:", err);
//       setLoading(false);
//       setToastMessage("Failed to load course details");
//     }
//   };

//   useEffect(() => {
//     if (courseId) {
//       getCourseDetails();
//     }
//   }, [courseId]);

//   const handleEnrollment = () => {
//     if (isEnrolled) {
//       setToastMessage("Redirecting to course content...");
//     } else {
//       setIsEnrolled(true);
//       setToastMessage("Successfully enrolled in the course!");
//     }
//   };

//   const renderStars = (rating) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star
//         key={index}
//         className={`w-4 h-4 ${
//           index < Math.floor(rating)
//             ? 'fill-yellow-400 text-yellow-400'
//             : index < rating
//             ? 'fill-yellow-200 text-yellow-200'
//             : 'text-gray-300'
//         }`}
//       />
//     ));
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
//           <p className="text-gray-600 text-lg">Loading course details...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Toast Notification */}
//       {toastMessage && (
//         <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
//           {toastMessage}
//         </div>
//       )}
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-800 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           <div className="grid lg:grid-cols-3 gap-8 items-start">
//             {/* Course Info */}
//             <div className="lg:col-span-2 space-y-6">
//               <div className="flex flex-wrap gap-2">
//                 {tags.map((tag, index) => (
//                   <span
//                     key={index}
//                     className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium"
//                   >
//                     {tag.tagName}
//                   </span>
//                 ))}
//               </div>
              
//               <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
//                 {course.courseName}
//               </h1>
              
//               <p className="text-xl text-blue-100 leading-relaxed">
//                 {showFullDescription 
//                   ? course.courseDescription 
//                   : `${course.courseDescription?.substring(0, 200)}...`
//                 }
//                 <button
//                   onClick={() => setShowFullDescription(!showFullDescription)}
//                   className="ml-2 text-yellow-300 hover:text-yellow-200 font-medium underline"
//                 >
//                   {showFullDescription ? 'Show Less' : 'Read More'}
//                 </button>
//               </p>

//               {/* Course Stats */}
//               <div className="flex flex-wrap gap-6 text-sm">
//                 <div className="flex items-center gap-2">
//                   <div className="flex">{renderStars(course.rating)}</div>
//                   <span className="font-semibold">{course.rating}</span>
//                   <span className="text-blue-200">({course.totalReviews} reviews)</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Users className="w-4 h-4" />
//                   <span>{course.studentsEnrolled?.toLocaleString()} students</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Clock className="w-4 h-4" />
//                   <span>{course.totalDuration}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Globe className="w-4 h-4" />
//                   <span>{course.language}</span>
//                 </div>
//               </div>

//               {/* Instructor Info */}
//               <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
//                 <img
//                   src={instructor.image}
//                   alt={`${instructor.firstName} ${instructor.lastName}`}
//                   className="w-16 h-16 rounded-full border-2 border-white/50"
//                 />
//                 <div>
//                   <h3 className="text-lg font-semibold">
//                     {instructor.firstName} {instructor.lastName}
//                   </h3>
//                   <p className="text-blue-200">
//                     {instructor.experience} • {instructor.studentsCount?.toLocaleString()} students
//                   </p>
//                   <div className="flex items-center gap-1 mt-1">
//                     <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                     <span className="text-sm">{instructor.rating} instructor rating</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Enrollment Card */}
//             <div className="lg:sticky lg:top-8">
//               <div className="bg-white rounded-2xl shadow-2xl p-6 space-y-6">
//                 <div className="aspect-video bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
//                   <Play className="w-16 h-16 text-white opacity-80" />
//                 </div>

//                 <div className="text-center">
//                   <div className="flex items-center justify-center gap-2 mb-2">
//                     <DollarSign className="w-6 h-6 text-green-600" />
//                     <span className="text-3xl font-bold text-gray-900">₹{course.price}</span>
//                   </div>
//                   <p className="text-gray-600">One-time payment • Lifetime access</p>
//                 </div>

//                 <button
//                   onClick={handleEnrollment}
//                   className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
//                     isEnrolled
//                       ? 'bg-green-600 hover:bg-green-700 text-white'
//                       : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg transform hover:-translate-y-1'
//                   }`}
//                 >
//                   {isEnrolled ? (
//                     <div className="flex items-center justify-center gap-2">
//                       <CheckCircle className="w-5 h-5" />
//                       Go to Course
//                     </div>
//                   ) : (
//                     'Enroll Now'
//                   )}
//                 </button>

//                 <div className="flex gap-3">
//                   <button className="flex-1 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
//                     <Heart className="w-4 h-4 mx-auto" />
//                   </button>
//                   <button className="flex-1 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
//                     <Share2 className="w-4 h-4 mx-auto" />
//                   </button>
//                 </div>

//                 {/* Course Features */}
//                 <div className="space-y-3 pt-4 border-t">
//                   <h4 className="font-semibold text-gray-900">This course includes:</h4>
//                   <div className="space-y-2 text-sm text-gray-600">
//                     <div className="flex items-center gap-2">
//                       <BookOpen className="w-4 h-4 text-indigo-600" />
//                       <span>{course.totalDuration} on-demand video</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Download className="w-4 h-4 text-indigo-600" />
//                       <span>Downloadable resources</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Award className="w-4 h-4 text-indigo-600" />
//                       <span>Certificate of completion</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Clock className="w-4 h-4 text-indigo-600" />
//                       <span>Full lifetime access</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Course Content Tabs */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Tab Navigation */}
//           <div className="border-b border-gray-200">
//             <nav className="flex space-x-8 px-6">
//               {['overview', 'curriculum', 'instructor', 'reviews'].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`py-4 px-2 border-b-2 font-medium text-sm capitalize transition-colors ${
//                     activeTab === tab
//                       ? 'border-indigo-500 text-indigo-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </nav>
//           </div>

//           {/* Tab Content */}
//           <div className="p-6">
//             {activeTab === 'overview' && (
//               <div className="space-y-8">
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900 mb-4">What you'll learn</h2>
//                   <div className="grid md:grid-cols-2 gap-4">
//                     {[
//                       "Master machine learning fundamentals and key algorithms",
//                       "Build and deploy ML models using Python and scikit-learn",
//                       "Understand supervised and unsupervised learning techniques",
//                       "Work with real-world datasets and data preprocessing",
//                       "Implement neural networks and deep learning models",
//                       "Apply ML to solve business problems effectively"
//                     ].map((item, index) => (
//                       <div key={index} className="flex items-start gap-3">
//                         <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
//                         <span className="text-gray-700">{item}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Details</h2>
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div className="space-y-4">
//                       <div className="flex justify-between">
//                         <span className="font-medium text-gray-700">Level:</span>
//                         <span className="text-gray-900">{course.level}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="font-medium text-gray-700">Duration:</span>
//                         <span className="text-gray-900">{course.totalDuration}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="font-medium text-gray-700">Language:</span>
//                         <span className="text-gray-900">{course.language}</span>
//                       </div>
//                     </div>
//                     <div className="space-y-4">
//                       <div className="flex justify-between">
//                         <span className="font-medium text-gray-700">Certificate:</span>
//                         <span className="text-gray-900">
//                           {course.certificate ? 'Yes' : 'No'}
//                         </span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="font-medium text-gray-700">Last Updated:</span>
//                         <span className="text-gray-900">{course.lastUpdated}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="font-medium text-gray-700">Students:</span>
//                         <span className="text-gray-900">{course.studentsEnrolled?.toLocaleString()}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'curriculum' && (
//               <div className="space-y-6">
//                 <h2 className="text-2xl font-bold text-gray-900">Course Curriculum</h2>
//                 <div className="space-y-4">
//                   {[
//                     {
//                       title: "Introduction to Machine Learning",
//                       lessons: 5,
//                       duration: "45 min",
//                       topics: ["What is Machine Learning?", "Types of ML", "Applications", "Setup Environment", "First ML Model"]
//                     },
//                     {
//                       title: "Data Preprocessing & Feature Engineering",
//                       lessons: 8,
//                       duration: "2h 15min",
//                       topics: ["Data Cleaning", "Handling Missing Values", "Feature Scaling", "Encoding Categorical Data"]
//                     },
//                     {
//                       title: "Supervised Learning Algorithms",
//                       lessons: 12,
//                       duration: "3h 30min",
//                       topics: ["Linear Regression", "Decision Trees", "Random Forest", "SVM", "Model Evaluation"]
//                     }
//                   ].map((module, index) => (
//                     <div key={index} className="border border-gray-200 rounded-lg p-4">
//                       <div className="flex items-center justify-between cursor-pointer">
//                         <div>
//                           <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
//                           <p className="text-sm text-gray-600">{module.lessons} lessons • {module.duration}</p>
//                         </div>
//                         <ChevronDown className="w-5 h-5 text-gray-400" />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {activeTab === 'instructor' && (
//               <div className="space-y-6">
//                 <h2 className="text-2xl font-bold text-gray-900">About the Instructor</h2>
//                 <div className="flex items-start gap-6">
//                   <img
//                     src={instructor.image}
//                     alt={`${instructor.firstName} ${instructor.lastName}`}
//                     className="w-32 h-32 rounded-full border-4 border-indigo-100"
//                   />
//                   <div className="flex-1">
//                     <h3 className="text-2xl font-bold text-gray-900 mb-2">
//                       {instructor.firstName} {instructor.lastName}
//                     </h3>
//                     <p className="text-gray-600 mb-4">{instructor.bio}</p>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//                       <div>
//                         <div className="text-2xl font-bold text-indigo-600">{instructor.rating}</div>
//                         <div className="text-sm text-gray-600">Instructor Rating</div>
//                       </div>
//                       <div>
//                         <div className="text-2xl font-bold text-indigo-600">{instructor.courses}</div>
//                         <div className="text-sm text-gray-600">Courses</div>
//                       </div>
//                       <div>
//                         <div className="text-2xl font-bold text-indigo-600">{instructor.studentsCount?.toLocaleString()}</div>
//                         <div className="text-sm text-gray-600">Students</div>
//                       </div>
//                       <div>
//                         <div className="text-2xl font-bold text-indigo-600">{instructor.experience}</div>
//                         <div className="text-sm text-gray-600">Experience</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'reviews' && (
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-2xl font-bold text-gray-900">Student Reviews</h2>
//                   <div className="text-right">
//                     <div className="flex items-center gap-2 mb-1">
//                       <div className="flex">{renderStars(course.rating)}</div>
//                       <span className="text-lg font-bold">{course.rating}</span>
//                     </div>
//                     <p className="text-sm text-gray-600">{course.totalReviews} reviews</p>
//                   </div>
//                 </div>
                
//                 <div className="space-y-4">
//                   {[
//                     { name: "Sarah Johnson", rating: 5, comment: "Excellent course! The instructor explains complex concepts very clearly.", date: "2 days ago" },
//                     { name: "Mike Chen", rating: 4, comment: "Great content and practical examples. Helped me land my first ML job!", date: "1 week ago" },
//                     { name: "Emily Davis", rating: 5, comment: "Best ML course I've taken. Highly recommended for beginners.", date: "2 weeks ago" }
//                   ].map((review, index) => (
//                     <div key={index} className="border-b border-gray-200 pb-4">
//                       <div className="flex items-start gap-3">
//                         <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
//                           <span className="text-indigo-600 font-semibold">{review.name[0]}</span>
//                         </div>
//                         <div className="flex-1">
//                           <div className="flex items-center gap-3 mb-2">
//                             <span className="font-medium text-gray-900">{review.name}</span>
//                             <div className="flex">{renderStars(review.rating)}</div>
//                             <span className="text-sm text-gray-500">{review.date}</span>
//                           </div>
//                           <p className="text-gray-700">{review.comment}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetailsPage;
