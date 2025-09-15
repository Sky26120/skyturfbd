import React from 'react'
import Image from 'next/image'
import DarkLogo from '@/public/images/darklogo.png'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Turfs from '@/components/Turfs'

const home = () => {
  return (
    <>
      {/* <div className='home'>
        <div className="container">
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
      </div> */}

      <Header />
      <Hero />
      <Turfs />
    </>
  )
}

export default home