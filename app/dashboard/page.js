"use client";

import React from "react";

class Dashboard extends React.Component {
  state = { user: null, loading: true };

  async componentDidMount() {
    const res = await fetch("/api/auth/me");
    if (res.ok) {
      const data = await res.json();
      this.setState({ user: data.user, loading: false });
    } else {
      window.location.href = "/signin";
    }
  }

  handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/signin";
  };

  render() {
    const { user, loading } = this.state;
    if (loading) return <p>Loading...</p>;
    return (
      <div>
        <h1>Welcome {user.email}</h1>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}

export default Dashboard;