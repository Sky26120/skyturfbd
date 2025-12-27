import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import DashboardProfileInfo from '@/components/DashboardProfileInfo'
import bkashLogo from '@/public/images/bkash-logo.webp'

const Booking = () => {
  return (
    <>
        <section className='booking'>
            <div className="container">
                <div className="booking__content">
                    <div className="booking__info-wrap">
                        <DashboardProfileInfo />
                        <div className='booking__form-wrap'>
                            <h2 className='booking__form-heading'>Booking</h2>
                            <form className='booking__form' action="">
                                <div className='booking__form-input-wrap'>
                                    <label className='booking__form-label' htmlFor="">Arena:</label>
                                    <select className='booking__select' name="" id="">
                                        <option value="">Sky Turf</option>
                                        <option value="">Time Up</option>
                                    </select>
                                </div>
                                <div className='booking__form-input-wrap'>
                                    <label className='booking__form-label' htmlFor="">Date:</label>
                                    <input className='booking__form-input' type="date" />
                                </div>
                                <div className='booking__form-input-wrap'>
                                    <label className='booking__form-label' htmlFor="">Time:</label>
                                    <select className='booking__select' name="" id="">
                                        <option value="">Time Slots</option>
                                        <option value="">05:00am to 06:30am</option>
                                        <option value="">06:30am to 08:00am</option>
                                        <option value="">08:00am to 09:30am</option>
                                        <option value="">09:30am to 11:00am</option>
                                        <option value="">11:00am to 12:30pm</option>
                                        <option value="">12:30pm to 02:00pm</option>
                                        <option value="">02:00pm to 03:30pm</option>
                                        <option value="">03:30pm to 05:00pm</option>
                                        <option value="">05:00pm to 06:30pm</option>
                                        <option value="">06:30pm to 08:00pm</option>
                                        <option value="">08:00pm to 09:30pm</option>
                                        <option value="">09:30pm to 11:00pm</option>
                                        <option value="">11:00pm to 12:30am</option>
                                        <option value="">12:30am to 02:00am</option>
                                    </select>
                                </div>
                                <div className='booking__form-input-wrap'>
                                    <label className='booking__form-label' htmlFor="">Notes:</label>
                                    <textarea className='booking__form-input' rows="3" name="" id="" placeholder='Specify number of players or any specific requirements that you may have'></textarea>
                                </div>
                            </form>
                        </div>
                        <div className='booking__payment-wrap'>
                            <h2 className='booking__payment-heading'>Payment</h2>
                            <p className='booking__payment-amount'>BDT 2,500</p>
                            <div className='booking__payment-option-wrap'>
                                <div className='booking__payment-option'>
                                    <div className='booking__payment-radio'>
                                        <input className='booking__payment-input' id="fullpay" name='payment' type="radio" />
                                        <label className='booking__payment-label' htmlFor="fullpay">Full Pay with bKash</label>
                                    </div>
                                    <div className='booking__payment-option-logo-wrap'>
                                        <Image 
                                            className='booking__payment-option-logo'
                                            src={bkashLogo}
                                            alt="bkash Logo"
                                        />
                                    </div>
                                </div>
                                <div className='booking__payment-divider-wrap'>
                                    <hr />
                                    <p className='booking__payment-divider'>or</p>
                                    <hr />
                                </div>
                                <div className='booking__payment-option'>
                                    <div>
                                        <input className='booking__payment-input' id="advancepay" name='payment' type="radio" />
                                        <label className='booking__payment-label' htmlFor="advancepay">Pay Advance with bKash (BDT 500)</label>
                                    </div>
                                    <div className='booking__payment-option-logo-wrap'>
                                        <Image 
                                            className='booking__payment-option-logo'
                                            src={bkashLogo}
                                            alt="bkash Logo"
                                        />
                                    </div>
                                </div>
                                <p className='booking__payment-agree-text'>By making this booking you agree to our terms and conditions.</p>
                                <div className='booking__payment-button-wrap'>
                                    <button className='tertiary-button booking__payment-button'>CONFIRM BOOKING</button>
                                </div>
                                <p className='booking__payment-agree-text'>I agree that confirming the booking places me under an obligation to make a payment in accordance with the General Terms and Conditions.</p>
                            </div>
                        </div>
                    </div>
                    <div className="booking__summary-wrap">
                        <div className='booking__summary-sticky'>
                            <h3 className='booking__summary-heading'>Booking Summary</h3>
                            <div className='booking__summary-info-wrap'>
                                <h4 className='booking__summary-user-name'>MINHAZUL ABEDIN</h4>
                                <p className='booking__summary-user-contact'>01328501655</p>
                            </div>
                            <div className='booking__summary-slot-info'>
                                <p className='booking__summary-arena'>Sky Turf</p>
                                <p className='booking__summary-slot'>Sat Dec 27, 10:00 PM</p>
                                <p className='booking__summary-duration'>Duration: 90 mins</p>
                            </div>
                            <div className='booking__summary-amount-wrap'>
                                <p className='booking__summary-amount-text'>Payable</p>
                                <p className='booking__summary-amount'>BDT 2,500</p>
                            </div>
                            <div className='booking__summary-help-wrap'>
                                <p className='booking__summary-help-title'>Need help?</p>
                                <p className='booking__summary-help-text'>Contact our team of experts for further assistance.</p>
                                <p className='booking__summary-phone-text'>Phone: 
                                    <Link href='tel: 01887876580'>
                                        <span className='booking__summary-phone'> +8801887876580</span>
                                    </Link>
                                </p>
                                <p className='booking__summary-phone-text'>
                                    Email: 
                                    <Link href='mailto: skyturf0@gmail.com'>
                                        <span className='booking__summary-email'> skyturf0@gmail.com</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Booking