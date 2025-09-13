import React from 'react'
import Image from 'next/image'
import DarkLogo from '@/public/images/darklogo.png'

const home = () => {
  return (
    <>
      <div className='home'>
        <div className='home-content'>
          <div className='home-logo-wrap'>
            <Image 
              src={DarkLogo}
              alt='Sky Turf Logo'
              className='home-logo'
            />
          </div>
          <h2 className='home-title'>This site is under construction</h2>
        </div>
      </div>
    </>
  )
}

export default home