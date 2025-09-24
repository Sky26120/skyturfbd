"use client";

import React from "react";
import Link from "next/link";

class Signin extends React.Component {
  state = { email: "", password: "", error: "" };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // ✅ cookies পাঠানোর জন্য
      });

      const data = await res.json();
      if (!res.ok) return this.setState({ error: data.error || "Login failed" });

      // login success → dashboard redirect
      window.location.href = "/dashboard";
    } catch {
      this.setState({ error: "Something went wrong" });
    }
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input name="email" type="email" value={email} onChange={this.handleChange} placeholder="Email" />
        <input name="password" type="password" value={password} onChange={this.handleChange} placeholder="Password" />
        <button type="submit">Login</button>
        <Link href="/signup">Sign Up</Link>
      </form>
    );
  }
}

export default Signin;