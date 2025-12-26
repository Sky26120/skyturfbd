"use client"
import React from 'react'
import DashboardGreeting from '@/components/DashboardGreeting'
import DashboardProfileInfo from '@/components/DashboardProfileInfo'
import DashboardTable from '@/components/DashboardTable'

const InspectAdmin = () => {
  return (
    <>
        <div className="dashboard">
            <div className="container">
                <div className="dashboard__content">
                    <DashboardGreeting />
                    <DashboardProfileInfo />
                    <DashboardTable />
                </div>
            </div>
        </div>
    </>
  )
}

export default InspectAdmin