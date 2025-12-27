"use client"
import React from 'react'
import DashboardGreeting from '@/components/DashboardGreeting'
import DashboardProfileInfo from '@/components/DashboardProfileInfo'
import DashboardSuperTable from '@/components/DashboardSuperTable'

const SuperAdmin = () => {
  return (
    <>
        <div className="dashboard">
            <div className="container">
                <div className="dashboard__content">
                  <DashboardGreeting />
                  <DashboardProfileInfo />
                  <DashboardSuperTable />
                </div>
            </div>
        </div>        
    </>
  )
}

export default SuperAdmin