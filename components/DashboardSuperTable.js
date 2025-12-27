import React, { useState } from 'react'


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Slot from './api/slotsApi';
import Users from './api/userApi';

import DashboardTableRow from './DashboardTableRow';
import DashboardUsersTableRow from './DashboardUsersTableRow';

const DashboardSuperTable = () => {
  
  const [slotData, setSlotData] = useState(Slot);

  const [userData, setUserData] = useState(Users);

  return (
    <div className='dashboard__tab-content'>
        <div className='dashboard__filter-date'>
            <input type="date" />
        </div>
        <Tabs>
            <TabList>
                <Tab>Slots Details</Tab>
                <Tab>All Users</Tab>
            </TabList>

            <TabPanel>
                <div className='dashboard__slot-table-wrap'>
                    <table>
                        <tr>
                            <th>Slot Time</th>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Location</th>
                            <th>Advance</th>
                            <th>Advance Receiver</th>
                            <th>Total</th>
                            <th>Due Receiver</th>
                            <th>Booking Person</th>
                            <th>Arena</th>
                            <th>Action</th>
                        </tr>

                        <DashboardTableRow slotDataAtt={slotData} />
                    </table>
                </div>
            </TabPanel>
            <TabPanel>
                <div className='dashboard__user-table-wrap'>
                    <table>
                        <tr>
                            <th>SL</th>
                            <th>Full Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Permission</th>
                            <th>Delete</th>
                        </tr>

                        <DashboardUsersTableRow userDataAtt={userData} />
                    </table>
                </div>
            </TabPanel>
        </Tabs>
    </div>
  )
}

export default DashboardSuperTable