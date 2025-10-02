import React from 'react'
import Turfs from '@/components/Turfs'
import Link from 'next/link'

const Aboutus = () => {
  return (
    <>
      <Turfs/>
      <div className='button-wrap'>
        <Link href='https://wa.me/8801887876580' target='_blank'>
          <span className='secondary-button'>Book Now</span>
        </Link>
      </div>
    </>
  )
}

export default Aboutus