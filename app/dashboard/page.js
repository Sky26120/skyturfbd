"use client";

import React from "react";
import Router from "next/router";

class Dashboard extends React.Component {
  state = { user: null, loading: true };

  componentDidMount = async () => {
    try {
      // fetch /me API with credentials to include cookie
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        this.setState({ user: data.user, loading: false });
      } else {
        // not logged in → redirect to signin
        Router.push("/signin");
      }
    } catch (err) {
      Router.push("/signin");
    }
  };

  handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
      Router.push("/signin");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  render() {
    const { user, loading } = this.state;

    if (loading) return <p>Loading...</p>;

    return (
      <div>
        <h1>Dashboard</h1>
        {user ? (
          <>
            <p>Welcome, {user.email}</p>
            <button onClick={this.handleLogout}>Logout</button>
          </>
        ) : (
          <p>Redirecting...</p>
        )}
      </div>
    );
  }
}

export default Dashboard;