"use client";
import { useEffect, useState } from "react";
import Loading from "../shared/Loading";
import EmptyState from "../shared/Empty";


const ALLOWED_ROLES = [
  "USER",
  "GENERAL_ADMIN",
  "MODERATOR",
  "INSPECT_ADMIN",
];

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/all-users");
      const data = await res.json();

      
      const filtered = data.filter(u => u.role !== "SUPER_ADMIN");

      setUsers(filtered);
    } catch (err) {
      console.error("Fetch users error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id, role) => {
    await fetch(`/api/all-users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });

    fetchUsers();
  };

  if (loading) return <Loading />;
  if (!users.length) return <EmptyState message="No users found" />;

  return (
    <div className="dashboard__booking">
      <p className="dashboard__booking-title">Users</p>

      <div className="dashboard__booking-scroll">
        <table>
          <div className="dashboard__booking-list">          
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Current Role</th>
                <th>Update Role</th>
              </tr>
            </thead>

            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) =>
                        updateRole(user._id, e.target.value)
                      }
                    >
                      {ALLOWED_ROLES.map(role => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </div>
        </table>
      </div>
    </div>
  );
}
