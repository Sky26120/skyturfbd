import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import DarkLogo from '@/public/images/darklogo.png'

const header = () => {
  return (
    <>
        <header className='header'>
            <div className="container">
                <div className="header__content">
                  <div className="header__logo-wrap">
                    <Image 
                      src={DarkLogo}
                      alt='Sky Turf Logo'
                      className='header__logo'
                    />
                  </div>
                  <div className="header__nav-wrap">
                    <Link href='/'>
                      <span className='header__nav-item'>Home</span>
                    </Link>
                    <Link href='/aboutus'>
                      <span className='header__nav-item'>About Us</span>
                    </Link>
                    <Link href='/facilities'>
                      <span className='header__nav-item'>Facilities</span>
                    </Link>
                    <Link href='/gallery'>
                      <span className='header__nav-item'>Gallery</span>
                    </Link>
                    <Link href='/contactus'>
                      <span className='header__nav-item'>Contact Us</span>
                    </Link>

                    <Link href='/signin'>
                      <span className='primary-button'>Sign In</span>
                    </Link>
                  </div>

                  {/* <div className="header__mobile-nav-wrap">

                  </div> */}
                </div>
            </div>
        </header>
    </>
  )
}

export default header