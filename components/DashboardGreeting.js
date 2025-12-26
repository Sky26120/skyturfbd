import React from 'react'

const DashboardGreeting = () => {
  return (
    <div className='dashboard__greetings'>
        <p className='dashboard__greeting-text'>WELCOME, <strong>MINHAZUL ABEDIN</strong></p>
        <div className='dashboard__button-wrap'>
            <button className='secondary-button'>Sign Out</button>
        </div>
    </div>
  )
}

export default DashboardGreeting