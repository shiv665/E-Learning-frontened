import React from 'react'
import Logo from '../../../assets/homepage/Logo2.svg';

const timeline = ({heading, para}) => {
  return (
    <div className='flex flex-row justify-center items-center gap-3'>

        <div className=''>
            <img src={Logo} alt="logo" />
        </div>
        <div className='flex flex-col'>
            <h1 className='font-bold '>{heading}</h1>
            <p>{para}</p>
        </div>


      
    </div>
  )
}

export default timeline
