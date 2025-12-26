import React, { useState } from 'react'


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Slot from './api/slotsApi';

import DashboardTableRow from './DashboardTableRow';

const DashboardTable = () => {
  
  const [slotData, setSlotData] = useState(Slot);

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
                <div className='dashboard__table-wrap'>
                    <table>
                        <tr>
                            <th>Slot</th>
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
                <h2>This Data will be come from Database</h2>
            </TabPanel>
        </Tabs>
    </div>
  )
}

export default DashboardTable