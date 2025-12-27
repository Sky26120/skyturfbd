import React from 'react'

const DashboardUsersTableRow = ({userDataAtt}) => {
  return (
    <>
        {
            userDataAtt.map((currElem) => {
                return (
                    <>
                        <tr>
                            <td>{currElem.id}</td>
                            <td>{currElem.name}</td>
                            <td>{currElem.contact}</td>
                            <td>{currElem.email}</td>
                            <td>{currElem.role}</td>
                            <td>
                                <select name="" id="">
                                    <option value="Permission">Permission</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Inspect-Admin">Inspect-Admin</option>
                                    <option value="Moderator">Moderator</option>
                                </select>
                            </td>
                            <td>
                                <button>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="white"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </>
                )
            })
        }
    </>
  )
}

export default DashboardUsersTableRow