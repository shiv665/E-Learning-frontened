import React, { useState, useEffect } from 'react';
import { Star, Clock, Users, BookOpen, Play, Filter, Search, ChevronRight, Code, Palette, TrendingUp, Camera, Megaphone, Database } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../services/apiConnector';
import { coursesAPI } from '../services/api';
//useSearchParams
import { useNavigate, useSearchParams } from 'react-router-dom';
import { buyCourse } from '../services/paymentAPI';
import toast from 'react-hot-toast';

const CourseCatalog = () => {
  const { token } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const { tags } = useSelector(state => state.category);
  // const [averageRatings, setAverageRatings] = useState({});
    // Get search params from URL
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        const categoryFromParams = searchParams.get('category');
        if (categoryFromParams) {
            setSelectedCategory(categoryFromParams);
        }
    }, [searchParams]);


  const icons = [Code, BookOpen, Users, Play, Palette, TrendingUp, Megaphone, Database];
  
  // Add "All" category at the beginning
  const categories = [
    { id: 'all', name: 'All Courses', icon: BookOpen },
    ...(tags?.map((tag, index) => ({
      id: tag._id,
      name: tag.tagName,
      icon: icons[index % icons.length]
    })) || [])
  ];
  
  const [course, setCourses] = useState([]);
    
  const getAllCourses = async () => {
    try {
      const result = await apiConnector("POST", coursesAPI.GET_ALL_COURSES_API);
      console.log(result, "get all courses");
      setCourses(result?.data?.courses || []);
    } catch (err) {
      const errorMessage = err?.response?.data?.message;
      console.log(errorMessage);
    }
  }
  // const getAverageRating = async (_id) => {
  //   try {
  //     const result = await apiConnector("POST", coursesAPI.GET_AVERAGE_RATING_API, {courseId: _id});
  //     console.log(result.data.averageRating, "get average rating");
  //     return result?.data?.averageRating || 0;
  //   } catch (err) {
  //     const errorMessage = err?.response?.data?.message;
  //     console.log(errorMessage);
  //   }
    
  // }
  // const gettingAllAverageRatings = async () => {
  //   const ratings = {};
  //   for (const course of courses) {
  //     ratings[course._id] = await getAverageRating(course._id);
  //   }
  //   setAverageRatings(ratings);
  // }

  useEffect(() => {
     const fetchData = async () => {
      await getAllCourses();
      // await gettingAllAverageRatings();
     }
      fetchData();
  }, []);

  // Fixed course mapping
  const courses = course.map((course) => ({
    id: course._id,
    title: course.courseName,
    categoryId: Array.isArray(course.tags) ? course.tags[0]?._id : course.tags?._id,
    categoryName: Array.isArray(course.tags) ? course.tags[0]?.tagName?.toLowerCase() : course.tags?.tagName?.toLowerCase(),
    instructor: `${course.Instructor?.firstName || ''} ${course.Instructor?.lastName || ''}`.trim(),
    rating: 0,
    students: course.StudentsEnrolled?.length || 0,
    price: Number(course.price) || 0,
    image: course.thumbnail,
  }));

  const handlecourseBuying = (course) => {
    if(token){
    navigate(`/Dashboard/${user.accountType}/${user._id}`)
    }
    else{
      window.alert("You can buy course after login");
      navigate('/login');
    }
    
    
    
  }

  const filteredCourses = courses.filter(course => {
    // Category filter - compare IDs
    const matchesCategory = selectedCategory === 'all' || course.categoryId === selectedCategory;
    
    // Search filter
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Fixed price filter
    const matchesPrice = priceFilter === 'all' ||
                        (priceFilter === 'free' && course.price === 0) ||
                        (priceFilter === 'under500' && course.price > 0 && course.price < 500) ||
                        (priceFilter === '500to1000' && course.price >= 500 && course.price <= 1000) ||
                        (priceFilter === 'over1000' && course.price > 1000);
    
    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Discover Our Courses
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              With our online courses, you can learn at your own pace from anywhere in the world and get access to the wealth of resources,
              including hands-on projects, quizzes and personalized feedback from instructors
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search courses or instructors..."
                className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-slate-800/50 py-8 sticky top-0 z-40 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                      : 'bg-slate-700/50 hover:bg-slate-700 text-gray-300 border border-slate-600'
                  }`}
                >
                  <Icon size={18} />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 mb-8 lg:mb-0">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-2 mb-6">
                <Filter size={20} className="text-cyan-400" />
                <h3 className="text-lg font-semibold text-white">Filters</h3>
              </div>
              
              <div className="space-y-6">
                {/* Price Filter */}
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'All Prices' },
                      { value: 'free', label: 'Free' },
                      { value: 'under500', label: 'Under ₹500' },
                      { value: '500to1000', label: '₹500 - ₹1000' },
                      { value: 'over1000', label: 'Over ₹1000' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                        <input
                          type="radio"
                          name="priceFilter"
                          value={option.value}
                          checked={priceFilter === option.value}
                          onChange={(e) => setPriceFilter(e.target.value)}
                          className="w-4 h-4 text-cyan-500 bg-slate-700 border-slate-600 focus:ring-cyan-500/50 focus:ring-offset-slate-800"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-gray-300">
                Showing {filteredCourses.length} of {courses.length} courses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img
                      src={course.image || "https://via.placeholder.com/400x250"}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-400">{course.instructor}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-400 fill-current" />
                        {course.rating}
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${
                                i < Math.floor(course.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      ({course.students.toLocaleString()})
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                      <Users size={16} />
                      <span>{course.students} students</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-white">
                          ₹{course.price}
                        </span>
                      </div>
                      <button onClick={(e) => handlecourseBuying(course)} className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                        Enroll Now
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCatalog;