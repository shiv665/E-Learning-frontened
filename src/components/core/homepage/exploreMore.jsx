import React, { useState } from 'react'
import {Carddata} from '../../data/carddata';
import CourseCard from './CourseCard';

const tabsName=[
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths"
];

const exploreMore = () => {

    const [currentTab, setcurrentTab]=useState(tabsName[0]);
    const [courses, setCourses]=useState(Carddata[0].courses);
    const [currentCard, setcurrentCard]=useState(Carddata[0].courses[0].heading);
    

    const setMyCard=(value)=>{
        setcurrentTab(value);
        const result= Carddata.filter((course)=>course.tag===value)
        setCourses(result[0].courses);
        setcurrentCard(result[0].courses[0].heading);
    }

  return (
    <div className=' text-white flex flex-col items-center justify-center'>

            <div>
                <h1 className=' text-2xl lg:text-4xl font-bold text-center text-blue-900'>Unlock the Power of Code</h1>
                <p className='text-center text-sm mt-3 text-[16px]'>Learn to build anything you imagine</p>
            </div>


            <div className="mt-5 flex flex-col md:flex-row rounded-2xl md:rounded-full bg-black mb-5 border-gray-500">
                {tabsName.map((element, index) => {
                    return (
                    <div
                        className={`text-[16px] flex flex-row items-center gap-2 ${
                        currentTab === element
                            ? "bg-black text-gray-600 font-bold"
                            : "text-gray-600"
                        } rounded-full transition-all duration-200 cursor-pointer hover:bg-gray-900 hover:text-gray-600 px-7 py-2`}
                        key={index}
                        onClick={() => setMyCard(element)}
                    >
                        {element}
                    </div>
                    );
                })}
            </div>

           
                <div className='border border-b-4 border-amber-400 w-full md:w-8/12 relative h-[150px] '>
                    <div className='flex lg:flex-row flex-col border border-b-4 border-b-fuchsia-700  z-10 m-7 absolute top-0 -left-2.5 right-0 justify-between items-center'>
                    {
                    courses.map((element,index)=>{
                        return(
                        <div 
                            key={index}
                            className="border border-b-4 border-b-emerald-800 "
                        >
                            <CourseCard
                            data={element}
                            currentCard={currentCard}
                            setcurrentCard={setcurrentCard}
                            />
                        </div>
                        )
                    })
                    }
                </div>
                </div>

      
    </div>
  )
}

export default exploreMore
