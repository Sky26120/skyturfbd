import React from 'react'

const Customer = () => {
  return (
    <>
        <section className='dashboard'>
          <div className="container">
            <div className="dashboard__content">
              <div className='dashboard__greetings'>
                <p className='dashboard__greeting-text'>WELCOME, <strong>MINHAZUL ABEDIN</strong></p>
                <div className='dashboard__button-wrap'>
                  <button className='secondary-button'>Sign Out</button>
                </div>
              </div>
              <div className="dashboard__profile">
                <p className='dashboard__profile-title'>Profile</p>
                <div className='dashboard__profile-info-wrap'>
                  <p className='dashboard__profile-label'>Name:</p>
                  <p className='dashboard__profile-input'>MINHAZUL ABEDIN</p>
                </div>
                <div className='dashboard__profile-info-wrap'>
                  <p className='dashboard__profile-label'>Phone:</p>
                  <p className='dashboard__profile-input'>+8801328501655</p>
                </div>
                <div className='dashboard__profile-info-wrap'>
                  <p className='dashboard__profile-label'>Email:</p>
                  <p className='dashboard__profile-input'>minhazulabedin1071@gmail.com</p>
                </div>
              </div>
              <div className="dashboard__booking">
                <p className='dashboard__booking-title'>Booking</p>
                <div className='dashboard__booking-info-wrap'>
                  <p className='dashboard__booking-label'>You have no bookings currently</p>
                </div>

                <div className='dashboard__booking-list'>
                  <div className='dashboard__booking-list-item'>
                    <p className='dashboard__booking-label'>Arena:</p>
                    <p className='dashboard__booking-input'>Sky Turf</p>
                  </div>
                  <div className='dashboard__booking-list-item'>
                    <p className='dashboard__booking-label'>Date:</p>
                    <p className='dashboard__booking-input'>01 Jan 2026</p>
                  </div>
                  <div className='dashboard__booking-list-item'>
                    <p className='dashboard__booking-label'>Slot:</p>
                    <p className='dashboard__booking-input'>05:30pm-07:00pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  )
}

export default Customer