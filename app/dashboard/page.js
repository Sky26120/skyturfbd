"use client";

import React from "react";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      // /api/auth/me থেকে logged-in user info fetch
      const res = await fetch("/api/auth/me", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // cookie send করার জন্য
      });

      const data = await res.json();

      if (!res.ok || !data.user) {
        // যদি login না থাকে, login page এ redirect
        window.location.href = "/signin";
        return;
      }

      // user state update
      this.setState({ user: data.user, loading: false });
    } catch (err) {
      console.error("Fetch user error:", err);
      window.location.href = "/signin";
    }
  }

  handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      window.location.href = "/signin";
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  render() {
    const { user, loading } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <h1>Welcome, {user.name}</h1>
        <p>This page is protected. Only logged-in users can see this.</p>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}

export default Dashboard;