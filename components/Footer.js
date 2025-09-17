import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import darkLogo from '@/public/images/darklogo.png'

const Footer = () => {
  return (
    <>
        <footer className="footer">
            <div className="container">
                <div className="footer__content">
                    <div className="footer__column">
                        <div className='footer__logo-wrap'>
                            <Link href='/' className='footer__logo-link'>
                                <Image 
                                    src={darkLogo}
                                    alt='Footer Sky Turf Logo'
                                    width={1000}
                                    className='footer__logo'
                                />
                            </Link>
                        </div>
                        <div className='footer__description-wrap'>
                            <p className='footer__description-text'>
                                Sky Turf Where Football Meets the Sky. Play at Jatrabari first rooftop football field. Enjoy stunning views on our artificial turf.
                            </p>
                        </div>
                    </div>
                    <div className='footer__column'>
                        <h3 className='footer__column-heading'>SUPPORT AND RESOURCES</h3>
                        <nav className='footer__column-nav-wrap'>
                            <Link href=''>
                                <span className='footer__column-nav-item'>Contact Us</span>
                            </Link>
                            <Link href=''>
                                <span className='footer__column-nav-item'>Refund And Cancellation</span>
                            </Link>
                            <Link href=''>
                                <span className='footer__column-nav-item'>Facilities</span>
                            </Link>
                            <Link href=''>
                                <span className='footer__column-nav-item'>Photo Gallery</span>
                            </Link>
                        </nav>
                    </div>
                    <div className='footer__column'>
                        <h3 className='footer__column-heading'>INFORMATION</h3>
                        <nav className='footer__column-nav-wrap'>
                            <Link href='' className='footer__column-nav-item-link'>
                                <span className='footer__column-nav-item'>About Us</span>
                            </Link>
                            <Link href='' className='footer__column-nav-item-link'>
                                <span className='footer__column-nav-item'>My Account</span>
                            </Link>
                            <Link href='' className='footer__column-nav-item-link'>
                                <span className='footer__column-nav-item'>Privacy Policy</span>
                            </Link>
                            <Link href='' className='footer__column-nav-item-link'>
                                <span className='footer__column-nav-item'>Terms And Conditions</span>
                            </Link>
                        </nav>
                    </div>
                    <div className='footer__column'>
                        <h3 className='footer__column-heading'>LOCATION</h3>
                        <address className='footer__address-text'>1 by 1, Meghna Shopping Complex, Rafikul Islam Road, Gobindapur, Sanir Akhra 1236 Dhaka, Bangladesh</address>
                        <div className='footer__social-wrap'>
                            <Link href='' target='_blank' className='footer__social-item-link'>
                                <span className='visually-hidden'>facebook</span>
                                <svg className='footer__social-item' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 10C20 4.48 15.52 0 10 0C4.48 0 0 4.48 0 10C0 14.84 3.44 18.87 8 19.8V13H6V10H8V7.5C8 5.57 9.57 4 11.5 4H14V7H12C11.45 7 11 7.45 11 8V10H14V13H11V19.95C16.05 19.45 20 15.19 20 10Z" fill="#ffffff"/>
                                </svg>
                            </Link>
                            <Link href='' target='_blank' className='footer__social-item-link'>
                                <span className='visually-hidden'>Instagram</span>
                                <svg className='footer__social-item' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.8 0H14.2C17.4 0 20 2.6 20 5.8V14.2C20 15.7383 19.3889 17.2135 18.3012 18.3012C17.2135 19.3889 15.7383 20 14.2 20H5.8C2.6 20 0 17.4 0 14.2V5.8C0 4.26174 0.61107 2.78649 1.69878 1.69878C2.78649 0.61107 4.26174 0 5.8 0ZM5.6 2C4.64522 2 3.72955 2.37928 3.05442 3.05442C2.37928 3.72955 2 4.64522 2 5.6V14.4C2 16.39 3.61 18 5.6 18H14.4C15.3548 18 16.2705 17.6207 16.9456 16.9456C17.6207 16.2705 18 15.3548 18 14.4V5.6C18 3.61 16.39 2 14.4 2H5.6ZM15.25 3.5C15.5815 3.5 15.8995 3.6317 16.1339 3.86612C16.3683 4.10054 16.5 4.41848 16.5 4.75C16.5 5.08152 16.3683 5.39946 16.1339 5.63388C15.8995 5.8683 15.5815 6 15.25 6C14.9185 6 14.6005 5.8683 14.3661 5.63388C14.1317 5.39946 14 5.08152 14 4.75C14 4.41848 14.1317 4.10054 14.3661 3.86612C14.6005 3.6317 14.9185 3.5 15.25 3.5ZM10 5C11.3261 5 12.5979 5.52678 13.5355 6.46447C14.4732 7.40215 15 8.67392 15 10C15 11.3261 14.4732 12.5979 13.5355 13.5355C12.5979 14.4732 11.3261 15 10 15C8.67392 15 7.40215 14.4732 6.46447 13.5355C5.52678 12.5979 5 11.3261 5 10C5 8.67392 5.52678 7.40215 6.46447 6.46447C7.40215 5.52678 8.67392 5 10 5ZM10 7C9.20435 7 8.44129 7.31607 7.87868 7.87868C7.31607 8.44129 7 9.20435 7 10C7 10.7956 7.31607 11.5587 7.87868 12.1213C8.44129 12.6839 9.20435 13 10 13C10.7956 13 11.5587 12.6839 12.1213 12.1213C12.6839 11.5587 13 10.7956 13 10C13 9.20435 12.6839 8.44129 12.1213 7.87868C11.5587 7.31607 10.7956 7 10 7Z" fill="#ffffff"/>
                                </svg>
                            </Link>
                            <Link href='' target='_blank' className='footer__social-item-link'>
                                <span className='visually-hidden'>Youtube</span>
                                <svg className='footer__social-item' width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5 12.75L16.9875 9L10.5 5.25V12.75ZM24.95 2.9625C25.1125 3.55 25.225 4.3375 25.3 5.3375C25.3875 6.3375 25.425 7.2 25.425 7.95L25.5 9C25.5 11.7375 25.3 13.75 24.95 15.0375C24.6375 16.1625 23.9125 16.8875 22.7875 17.2C22.2 17.3625 21.125 17.475 19.475 17.55C17.85 17.6375 16.3625 17.675 14.9875 17.675L13 17.75C7.7625 17.75 4.5 17.55 3.2125 17.2C2.0875 16.8875 1.3625 16.1625 1.05 15.0375C0.8875 14.45 0.775 13.6625 0.7 12.6625C0.6125 11.6625 0.575 10.8 0.575 10.05L0.5 9C0.5 6.2625 0.7 4.25 1.05 2.9625C1.3625 1.8375 2.0875 1.1125 3.2125 0.8C3.8 0.6375 4.875 0.525 6.525 0.45C8.15 0.3625 9.6375 0.325 11.0125 0.325L13 0.25C18.2375 0.25 21.5 0.45 22.7875 0.8C23.9125 1.1125 24.6375 1.8375 24.95 2.9625Z" fill="#ffffff"/>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='footer__copyright'>
                    <p className='footer__copyright-text'>© All Rights Reserve by Sky Turf, 2025</p>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer