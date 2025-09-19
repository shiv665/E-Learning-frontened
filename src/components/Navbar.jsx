import React,{useEffect, useState} from 'react'
import { Link, matchPath, useNavigate } from 'react-router-dom'
import { HiArrowCircleDown } from "react-icons/hi";
import { useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
// toast.error("Failed to save paste. Please try again.");
import { useSelector } from 'react-redux';
import { FaCartShopping } from "react-icons/fa6";
import ProfileDropMenu from '../Auth/ProfileDropMenu';
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/api';
import { setTags } from '../reducers/categories';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Navbar = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const location=useLocation();
    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    const {totalItems}=useSelector((state)=>state.cart);
    
    const userid = user ? user._id : null; // Assuming user has an _id field

    const matchRoute=(route)=>{
        return matchPath( {path:route},location.pathname)
    }

    
    const [subLinks, setsubLinks]=useState([]);

    const fetchSubLinks=async()=>{
        try{

                const result=await apiConnector("GET",categories.CATEGORIES_API);
                
                setsubLinks(result.data.taglist);
                
                
                

            }catch(err){
                console.log(err.message);
            }

    }

    
    useEffect(()=>{
        fetchSubLinks();        
        
    },[]);

    useEffect(() => {
        console.log("Updated subLinks:", subLinks);
        dispatch(setTags(subLinks));
        }, [subLinks]);

    

  return (
    <div className='flex h-14 items-center justify-center '>
        <div className=' flex w-10/12 flex-row justify-between items-center'>

            <Link
                to="/"
                className=" flex items-center justify-center gap-2"
                >
                <span className="font-extrabold text-5xl text-white bg-blue-600 rounded-b-full text-center w-14 h-14 flex items-center justify-center">
                    E
                </span>
                <span className="text-white text-xl">E-Learning</span>
            </Link>
                
            <ul className='hidden text-white md:flex flex-row gap-3'>
                <li>
                    <Link to="/" className={`${matchRoute("/") ? "text-yellow-500" : "text-white"}`}>
                            Home
                     </Link>


                </li>
                <li className='group relative'>
                    <Link to="/Catalog" className=' flex flex-row items-center justify-center gap-1 '>
                       Catalog 
                       <HiArrowCircleDown />
                        
                    </Link>
                    <div className=' absolute md:left-[20%] lg:left-[-60%] top-9 rounded-md lg:w-[300px] z-10 flex flex-col gap-6 p-7 text-black bg-amber-50 invisible opacity-0 group-hover:visible group-hover:opacity-100'>


                            {subLinks.map((tag, index) => (
                                <Link onClick={()=> navigate(`/Catalog?category=${tag?._id}`)} key={index} className=' hover:text-blue-600 hover:underline' >
                                    <h3>{tag.tagName}</h3>
                                </Link>
                                ))}

                            <div className='absolute h-6 w-6 bg-amber-50 top-[-5%] rotate-45
                                                            lg:left-[20%]
                                                            md:left-[25%] 
                                                            sm:left-[35%] 
                                                            max-sm:left-[45%]'>

                            </div>
                    </div>
                </li>
                <li>
                    <Link to= {`/About`} className={`${matchRoute("/About") ? "text-yellow-500" : "text-white"}`}>
                       About Us
                    </Link>
                </li>
                <li>
                    <Link to="/Contact" className={`${matchRoute("/Contact") ? "text-yellow-500" : "text-white"}`}>
                       Contact Us
                    </Link>
                </li>
            </ul>


                {/* login /signup and dashboard */}
            <div className=' w-2/12 flex gap-1 items-center'>
            {
                   token && user && user.accountType !="instructor" && (
                        <Link to="/dashboard/cart" className="relative inline-block p-2 hover:bg-gray-600 rounded-md transition">
                                <FaCartShopping className="text-xl text-white " />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                                    {totalItems}
                                    </span>
                                )}
                         </Link>

                    )
            }

            {token === null && !matchRoute("/login") && (
                <Link 
                    to='/login' 
                    className='mx-3'
                >
                    <div className='
                    px-2 py-1.5 text-white font-medium
                    border border-white/40 rounded-lg
                    hover:border-white/60 hover:bg-white/10
                    transition-colors duration-200
                    backdrop-blur-sm bg-white/5
                    focus:outline-none focus:ring-2 focus:ring-white/50
                    '>
                    Log In
                    </div>
                </Link>
                )}

                {token === null && !matchRoute("/signup") && (
                <Link 
                    to='/signUp'
                >
                    <div className='
                    px-2 py-1.5 text-white font-semibold
                    bg-gradient-to-r from-blue-600 to-purple-600
                    hover:from-blue-700 hover:to-purple-700
                    rounded-lg shadow-lg
                    transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                    '>
                    Sign Up
                    </div>
                </Link>
                )}

            {
                token !==null && <ProfileDropMenu/>
            }
                    
                    
            </div>

        </div>
      
    </div>
  )
}

export default Navbar
