"use client";

import React from "react";
import Link from "next/link";

class Signup extends React.Component {
  state = { name: "", phone: "", email: "", password: "", confirm: "", error: "" };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, email, password, confirm } = this.state;
    if (password !== confirm) return this.setState({ error: "Passwords do not match" });

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, password }),
      });
      const data = await res.json();
      if (!res.ok) return this.setState({ error: data.error });
      window.location.href = "/signin";
    } catch {
      this.setState({ error: "Something went wrong" });
    }
  };

  render() {
    const { name, phone, email, password, confirm, error } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input name="name" value={name} onChange={this.handleChange} placeholder="Name" />
        <input name="phone" value={phone} onChange={this.handleChange} placeholder="Phone" />
        <input name="email" type="email" value={email} onChange={this.handleChange} placeholder="Email" />
        <input name="password" type="password" value={password} onChange={this.handleChange} placeholder="Password" />
        <input name="confirm" type="password" value={confirm} onChange={this.handleChange} placeholder="Confirm Password" />
        <button type="submit">Signup</button>
        <Link href="/signin">Sign In</Link>
      </form>
    );
  }
}

export default Signup;