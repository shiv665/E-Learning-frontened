import React from 'react'
import CTAbutton from './button'
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import {TypeAnimation} from 'react-type-animation';


const codeblock = ({
    position, heading, subheading, ctabt1, ctabt2,codeblock, backgroundGradient, codeColor}) => {
  return (
    <div className={` justify-center items-center lg:w-8/12 flex flex-col ${position === "left" ? "lg:flex-row" : "lg:flex-row-reverse"} text-white my-2 lg:my-20 gap-1 lg:gap-10 justify-between`}>
        {/* section1 */}
        <div className=' lg:w-[40%] flex flex-col gap-8 justify-center items-center text-center'>
            {heading}
            <div className='text-[15px] text-2xl text-gray-200'>
                {subheading}
            </div>
            <div className='flex flex-row gap-4 mt-5'>
                <CTAbutton active={ctabt1.active} linkTo={ctabt1.linkTo}>
                    <div className='flex flex-row items-center gap-2'>
                        {ctabt1.txt}
                        <FaArrowRight/>
                    </div>
                </CTAbutton>
                <CTAbutton active={ctabt2.active} linkTo={ctabt2.linkTo}>
                    {ctabt2.txt}
                </CTAbutton>
            </div>
        </div>

        {/* section2 */}

        <div className='border border-blue-500 flex flex-row lg:w-[50%] relative'>
            {/* background gradient as a circular shape */}
            <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full z-0 ${backgroundGradient} opacity-20`}></div>

            <div className='flex flex-col text-center w-[10%] font-bold z-10'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
            </div>
            <div className={`lg:w-[90%] flex flex-col font-bold pr-2 z-10`}>
                <TypeAnimation
                    sequence={[
                        codeblock,
                        1000, // wait for 1 second before repeating
                    ]}
                    cursor={true}
                    repeat={Infinity}
                    style={{ whiteSpace: "pre-line", color: codeColor, display: "block" }}
                />
            </div>


        </div>

      
    </div>
  )
}

export default codeblock
