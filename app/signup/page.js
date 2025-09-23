"use client";

import React from "react";
import Link from "next/link";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirm: "",
      error: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;   // destructure kora lagbe
    this.setState({ [name]: value });   // state properly update hobe
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, email, password, confirm } = this.state;

    if (password !== confirm) {
      this.setState({ error: "Passwords do not match" });
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        this.setState({ error: data.error || "Signup failed" });
      } else {
        window.location.href = "/signin"; // redirect
      }
    } catch {
      this.setState({ error: "Something went wrong" });
    }
  };

  render() {
    const { name, phone, email, password, confirm, error } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={phone}
          onChange={this.handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="confirm"
          placeholder="Confirm Password"
          value={confirm}
          onChange={this.handleChange}
        />

        <button type="submit">Signup</button>

        <Link href="/signin">
          <span style={{ marginLeft: "10px", cursor: "pointer" }}>Sign In</span>
        </Link>
      </form>
    );
  }
}

export default Signup;