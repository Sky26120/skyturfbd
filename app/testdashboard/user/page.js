import React from 'react'
import DashboardGreeting from '@/components/DashboardGreeting'
import DashboardProfileInfo from '@/components/DashboardProfileInfo'

const Customer = () => {
  return (
    <>
        <section className='dashboard'>
          <div className="container">
            <div className="dashboard__content">
              <DashboardGreeting />
              <DashboardProfileInfo />
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