"use client";

import React from "react";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  async componentDidMount() {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        this.setState({ user: data.user });
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  }

  handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/signin";
  };

  render() {
    const { user } = this.state;

    return (
      <div>
        <h1>Welcome to Dashboard</h1>
        <p>This page is protected. Only logged-in users can see this.</p>

        {user ? (
          <div style={{ marginTop: "20px" }}>
            <h2>User Info</h2>
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Phone:</b> {user.phone}</p>
          </div>
        ) : (
          <p>Loading user info...</p>
        )}

        <button onClick={this.handleLogout} style={{ marginTop: "20px" }}>
          Logout
        </button>
      </div>
    );
  }
}

export default Dashboard;