import React from 'react'
import Image from 'next/image'
import SkyTurf from '@/public/images/skyturf.jpg'
import Link from 'next/link'

const Turfs = () => {
  return (
    <>
        <section className='our-turfs'>
            <div className="container">
                <h2 className='our-turfs__heading'>Our Turfs</h2>
                <div className="our-turfs__content">
                    <Link href='/'>
                        <div className="our-turfs__turf-wrap">
                            <div className='our-turfs__turf-image-wrap'>
                                <Image 
                                    src={SkyTurf}
                                    alt=''
                                    className='our-turfs__turf-image'
                                />
                            </div>
                            <h3 className='our-turfs__turf-name'>Sky Turf</h3>
                            <p className='our-turfs__turf-text'>Sky Turf Where Football Meets the Sky</p>
                        </div>
                    </Link>
                    <Link href='/'>
                        <div className='our-turfs__turf-wrap'>
                            <div className='our-turfs__turf-image-wrap'>
                                <Image 
                                    src={SkyTurf}
                                    alt=''
                                    className='our-turfs__turf-image'
                                />
                            </div>
                            <h3 className='our-turfs__turf-name'>Time Up</h3>
                            <p className='our-turfs__turf-text'>Time Up sports arena</p>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    </>
  )
}

export default Turfs