"use client";

import React from "react";
import Link from "next/link";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", error: "" };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        this.setState({ error: data.error || "Login failed" });
      } else {
        window.location.href = "/dashboard";
      }
    } catch {
      this.setState({ error: "Something went wrong" });
    }
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input name="email" type="email" placeholder="Email" value={email} onChange={this.handleChange} />
        <input name="password" type="password" placeholder="Password" value={password} onChange={this.handleChange} />
        <button type="submit">Login</button>
        <Link href='/signup'>
          <span>Sign Up</span>
        </Link>
      </form>
    );
  }
}

export default Signin;