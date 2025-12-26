import React from 'react'
import DashboardGreeting from '@/components/DashboardGreeting'
import DashboardProfileInfo from '@/components/DashboardProfileInfo'

const Admin = () => {
  return (
    <>
        <div className="dashboard">
            <div className="container">
                <div className="dashboard__content">
                    <DashboardGreeting />
                    <DashboardProfileInfo />
                </div>
            </div>
        </div>
    </>
  )
}

export default Admin