import React from 'react'
import Map from '@/components/Map'

import Link from 'next/link'

const Contactus = () => {
  return (
    <>
      <section className='contact'>
        <Map/>
        <div className='button-wrap'>
          <Link href='https://wa.me/8801887876580' target='_blank'>
            <span className='secondary-button'>Book Now</span>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Contactus