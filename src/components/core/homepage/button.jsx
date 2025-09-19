import React from 'react'
import { Link } from 'react-router-dom';

const button = ({children, active, linkTo}) => {
  return (
    <div>
        <Link to={linkTo} >
        <div className={` text-center text-[13px] px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-200 ${active ? "bg-yellow-300 text-black" : "bg-gray-500"}`}>
            {children}
        </div>


        </Link>

      
    </div>
  )
}

export default button
