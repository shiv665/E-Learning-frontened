import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

import CTAButton from './core/homepage/button';
import banner from '../assets/homepage/banner.mp4';
import Codeblock from './core/homepage/codeblock';
import Timeline from './core/homepage/timeline';
import logo from '../assets/homepage/image.png';
import image1 from '../assets/homepage/Compare_with_others.png';
import image2 from '../assets/homepage/Know_your_progress.png';
import image3 from '../assets/homepage/Plan_your_lessons.png';
import image4 from '../assets/Screenshot 2025-08-02 190819.png'
import ExploreMore from '../components/core/homepage/exploreMore';
import { useSelector } from 'react-redux';
import Gemini from '../Gemini/Gemini';
import { useState } from 'react';

const Home = () => {
  const [visible,setVisible]=useState(false);
  const {tags}=useSelector((state)=>state.category);
  const{token}=useSelector((state)=>state.auth);
  const handleGemini=()=>{
    setVisible(!visible);
  }
  return (
    <div className="">


        <div className="h-[90%] fixed right-0 bottom-0 w-[25%] z-50 flex flex-col items-end">
          {token !== null && (
                <button
                  onClick={handleGemini}
                  className="bg-blue-600 text-white p-2 rounded-l-full w-[120px] absolute right-0 top-155 hover:bg-blue-700 transition-all duration-300 ease-in-out"
                >
                  {visible ? "Close Chatbot" : "Open Chatbot"}
                </button>
                
              )}
              {visible && token && <Gemini />}
              {token == null && (
                <button
                  className="bg-blue-600 text-white p-2 rounded-l-full w-[120px] absolute right-0 top-20 hover:bg-blue-700 transition-all duration-300 ease-in-out"
                >
                  Login to use Chatbot
                </button>
              )}

              
            </div>

        {/* section 1 */}

        <div className='text-white relative mx-auto flex flex-col w-11/12 items-center justify-between '>
               
                <Link to={"/signUp"} className="text-gray-600  items-center gap-1  group ">
                        <div className=' mt-5 p-2 mx-auto rounded-full bg-black font-bold transition-all duration-200 ease-in-out group-hover:bg-purple-950 '>
                          <div className='flex flex-row items-center gap-2 rounded-full'>
                          <p>Become an Instructor</p>
                          <FaArrowRight/>
                          </div>
                        </div>
                </Link>

                <div className='text-2xl m-1 mt-3  text-center  '>
                  Empower Your Future with 
                  <span className='font-bold text-blue-400'> Coding Skills</span>

                </div>
              
                <div className=' text-center mt-3 mx-auto w-8/12 '>
                  <p>With our online courses, you can learn at your own pace from anywhere in the world and get acccess to the wealth of resourses, including hands on project, quizes and personalised feedback from instructor</p>
                </div>

                <div className='flex flex-row gap-4 mt-3 mb-5  '>
                  <CTAButton active={true} linkTo={"/signUp"}  >
                      Learn More
                  </CTAButton>
                  <CTAButton active={false} linkTo={"/login"} >
                    Book a Demo
                  </CTAButton>
                </div>


                <div className=' w-8/12 shadow-blue-200 m-4 '>
                  <video muted loop autoPlay>
                    <source src={banner} type='video/mp4'/>

                  </video>
                </div>

                <Codeblock position={"left"}
                heading={
                    <div className='text-2xl font-bold text-center'>
                        Unlock Your <span className='font-bold text-blue-400'> Coding Potential </span> with Our Courses
                    </div>
                }
                subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                ctabt1={{
                    txt: "Try it Yourself",
                    active: true,
                    linkTo: "/courses"
                }}
                ctabt2={{
                    txt: "Learn More",
                    active: false,
                    linkTo: "/contact"
                }}
                backgroundGradient={"bg-gradient-to-r from-blue-500 to-purple-500"}
                codeColor={"yellow"}
                codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n</body>\n</html>`}
                />

                <Codeblock position={"right"}
                heading={
                    <div className='text-2xl font-bold text-center'>
                        Start <span className='font-bold text-blue-400'> Coding  </span> in seconds
                    </div>
                }
                subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson"}
                ctabt1={{
                    txt: "Continue Lesson",
                    active: true,
                    linkTo: "/courses"
                }}
                ctabt2={{
                    txt: "Learn More",
                    active: false,
                    linkTo: "/contact"
                }}
                backgroundGradient={"bg-gradient-to-r from-red-600 to-yellow-500"}
                codeColor={"yellow"}
                codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n</body>\n</html>`}
                />

        </div>

        <ExploreMore/>


        {/* section 2 */}

         <div className='bg-gray-50 text-black flex flex-col justify-center items-center'>

          <div className='w-full  bg-cover bg-center homepage_bg h-[310px] flex flex-col justify-center items-center text-white relative'>
            <div>
              <div className='h-[80%]'>

              </div>
              <div className='text-2xl font-bold text-center mt-10 flex flex-row justify-center items-center gap-8 h-[20%]'>
                <CTAButton active={true} linkTo={"/courses"}>
                   Explore Full Cataloge
                    <FaArrowRight />
                
                </CTAButton>
                <CTAButton active={false} linkTo={"/signUp"}>
                    Learn More
                  
                </CTAButton>
              </div>
            </div>
          </div>

          <div className='flex flex-col w-11/12 items-center justify-between gap-3 lg:gap-7 p-4 lg:p-20 '>
                  <div className='flex flex-col lg:flex-row lg:w-8/12 items-center justify-between gap-7'>
                  <h1 className='lg:w-[40%] text-3xl' >
                        Get the skills you need for a <span className='font-bold text-blue-400'> Job that is in demand.</span>
                  </h1>
                  <div className='lg:w-[50%] flex flex-col gap-7'>
                    <p>
                          The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                    </p>
                    <div className='lg:w-[40%]' >
                        <CTAButton  active={true} linkTo={"/signUp"}>
                           Learn More
                        </CTAButton>
                    </div>
                    
                  </div>
                    
                  </div>
          </div>

          <div className=' flex lg:flex-row gap-4 w-8/12 justify-center items-center p-2 m-2 lg:p-7 lg:m-7 '>
            <div className='flex flex-col gap-7 lg:w-[40%]'>
                  <Timeline heading="Leadership" para="Fully commited to the success company."/>
                  <Timeline heading="Responsibility" para="Students will be our top priority."/>
                  <Timeline heading="Flexibility" para="The ability to seitch is an important skill."/>
                  <Timeline heading="Solve the Problem" para="Create your own way to a solution."/>
            </div>
            <div className='border w-[57%] lg:visible invisible hidden lg:block relative'>
              <img src={logo} alt="logo" className="w-full h-auto" />
              <div className='absolute bottom-0 left-0 right-0 w-full bg-green-700 h-[20%] flex flex-row gap-2 sm:gap-4 justify-center items-center px-2 sm:px-4'>
                <div className='flex flex-row gap-1 sm:gap-2 md:gap-4 justify-center items-center'>
                  <h1 className='text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold'>10</h1>
                  <p className='text-green-300 text-xs sm:text-sm md:text-base lg:text-xl'>YEARS EXPERIENCE</p>
                </div>
                <div className='flex flex-row gap-1 sm:gap-2 md:gap-4 justify-center items-center'>
                  <h1 className='text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold'>255</h1>
                  <p className='text-green-300 text-xs sm:text-sm md:text-base lg:text-xl'>TYPES OF COURSES</p>
                </div>
              </div>
            </div>
          </div>

          <div className='  flex flex-col lg:w-11/12 items-center justify-between gap-3 lg:gap-7 p-4 lg:p-20 '>
                <h1 className=' text-center font-bold text-2xl lg:w-8/12 '>Your swiss knife for learning any language</h1>
                <p className='text-center text-1xl lg:w-8/12 '>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
                <div className='lg:h-140 flex-col  w-10/12 flex lg:flex-row relative'>
                  <img className='lg:absolute right-77 z-10 top-7' src={image1} alt="" />
                  <img className='lg:absolute left-7 top-7' src={image2} alt="" />
                  <img className='lg:absolute right-7 top-7' src={image3} alt="" />
                </div>
                <div>
                  <CTAButton active={true} linkTo={"/signUp"}>
                    Learn More
                   </CTAButton>
                </div>
          </div>


         </div>


        {/* section 3 */}

        <div className='w-11/12 flex justify-center p-2 m-2 md:p-7 md:m-7 items-center'>/
          <div className=' text-white flex flex-col md:flex-row md:w-8/11 justify-center items-center'>
            <div className=' md:w-[50%]'>
              <img className=" w-full h-full object-contain" src={image4} alt="" />
            </div>
            <div  className=' flex flex-col gap-1 md:gap-7 md:p-7  md:w-[50%]'>
              <h1 className='font-bold text-3xl'>
                  Become an Instructor
              </h1>
              <p className=' text-1xl text-gray-400'>
                  Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
              </p>
              
                <div className='md:m-7 md:w-[50%]'>
                  <CTAButton active={true} linkTo={"/signUp"}>
                    Start teaching Today
               </CTAButton> 
                </div>
              
            </div>
          </div>
        </div>

        {/* footer */}

        <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 text-sm">
        
        {/* Company */}
        <div>
          <h2 className="font-bold text-white mb-2">Company</h2>
          <ul>
            <li>About</li>
            <li>Careers</li>
            <li>Affiliates</li>
          </ul>
          <div className="flex gap-3 mt-4 text-lg">
            <FaFacebook />
            <FaGoogle />
            <FaTwitter />
            <FaYoutube />
          </div>
        </div>

        {/* Resources */}
        <div>
          <h2 className="font-bold text-white mb-2">Resources</h2>
          <ul>
            <li>Articles</li>
            <li>Blog</li>
            <li>Chart Sheet</li>
            <li>Code challenges</li>
            <li>Docs</li>
            <li>Projects</li>
            <li>Videos</li>
            <li>Workspaces</li>
          </ul>
        </div>

        {/* Plans & Community */}
        <div>
          <h2 className="font-bold text-white mb-2">Plans</h2>
          <ul>
            <li>Paid memberships</li>
            <li>For students</li>
            <li>Business solutions</li>
          </ul>
          <h2 className="font-bold text-white mt-4 mb-2">Community</h2>
          <ul>
            <li>Forums</li>
            <li>Chapters</li>
            <li>Events</li>
          </ul>
        </div>

        {/* Subjects */}
        <div>
          <h2 className="font-bold text-white mb-2">Subjects</h2>
          <ul className="columns-2 gap-4">
            <li>AI</li>
            <li>Cloud Computing</li>
            <li>Code Foundations</li>
            <li>Computer Science</li>
            <li>Cybersecurity</li>
            <li>Data Analytics</li>
            <li>Data Science</li>
            <li>Data Visualization</li>
            <li>Developer Tools</li>
            <li>DevOps</li>
            <li>Game Development</li>
            <li>IT</li>
            <li>Machine Learning</li>
            <li>Math</li>
            <li>Mobile Development</li>
            <li>Web Design</li>
            <li>Web Development</li>
          </ul>
        </div>

        {/* Languages */}
        <div>
          <h2 className="font-bold text-white mb-2">Languages</h2>
          <ul className="columns-2 gap-4">
            <li>Bash</li>
            <li>C</li>
            <li>C++</li>
            <li>C#</li>
            <li>Go</li>
            <li>HTML & CSS</li>
            <li>Java</li>
            <li>JavaScript</li>
            <li>Kotlin</li>
            <li>PHP</li>
            <li>Python</li>
            <li>R</li>
            <li>Ruby</li>
            <li>SQL</li>
            <li>Swift</li>
          </ul>
        </div>

        {/* Career Building */}
        <div>
          <h2 className="font-bold text-white mb-2">Career building</h2>
          <ul>
            <li>Career paths</li>
            <li>Career services</li>
            <li>Interview prep</li>
            <li>Professional certification</li>
            <li>-</li>
            <li>Full Catalog</li>
            <li>Beta Content</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
        <div className="space-x-4 mb-2 md:mb-0">
          <span>Privacy Policy</span>
          <span>|</span>
          <span>Cookie Policy</span>
          <span>|</span>
          <span>Terms</span>
        </div>
        <div>
          Made by <span className="text-red-500">❤</span> Shivansh
        </div>
      </div>
        </footer>
      
    </div>
  )
}

export default Home
