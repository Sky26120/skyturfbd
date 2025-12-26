import React from 'react'

const DashboardProfileInfo = () => {
  return (
    <div className="dashboard__profile">
        <div className='dashboard__profile-wrap'>
            <p className='dashboard__profile-title'>Profile</p>
            <p className='dashboard__profile-role'>Role: <strong>User</strong></p>
        </div>
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
  )
}

export default DashboardProfileInfo