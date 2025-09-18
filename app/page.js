import React from 'react'
import Image from 'next/image'
import DarkLogo from '@/public/images/darklogo.png'
import Hero from '@/components/Hero'
import Turfs from '@/components/Turfs'
import Facilities from '@/components/Facilities'
import Map from '@/components/Map'
import Gallery from '@/components/Gallery'

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

      <Hero />
      <Turfs />
      <Map />
      <Gallery />
    </>
  )
}

export default home