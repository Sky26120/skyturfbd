import React from 'react'
// import Image from 'next/image'
// import DarkLogo from '@/public/images/darklogo.png'
import Hero from '@/components/Hero'
import Turfs from '@/components/Turfs'
import Map from '@/components/Map'
import Gallery from '@/components/Gallery'
import Facilites from '@/components/Facilites'

const home = () => {
  return (
    <>
      <Hero />
      <Turfs />
      <Facilites />
      <Map />
      <Gallery />
    </>
  )
}

export default home