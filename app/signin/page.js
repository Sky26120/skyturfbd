"use client";
import React from "react";
import Link from "next/link";
import Router from "next/router";

class Signin extends React.Component {
  state = { email: "", password: "", error: "" };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      // ✅ Live-ready fetch with credentials
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // cookies পাঠানোর জন্য
      });

      const data = await res.json();
      if (!res.ok) return this.setState({ error: data.error || "Login failed" });

      // login successful → redirect to dashboard
      Router.push("/dashboard");
    } catch {
      this.setState({ error: "Something went wrong" });
    }
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={this.handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={this.handleChange}
        />

        <button type="submit">Login</button>

        <p>
          Don't have an account? <Link href="/signup">Sign Up</Link>
        </p>
      </form>
    );
  }
}

export default Signin;