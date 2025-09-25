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
      <>
        <section className="signup">
          <div className="container">
            <form className="signup__form" onSubmit={this.handleSubmit}>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <input className="signup__form-input" name="name" value={name} onChange={this.handleChange} placeholder="Name" />
              <input className="signup__form-input" name="phone" value={phone} onChange={this.handleChange} placeholder="Phone" />
              <input className="signup__form-input" name="email" type="email" value={email} onChange={this.handleChange} placeholder="Email" />
              <input className="signup__form-input" name="password" type="password" value={password} onChange={this.handleChange} placeholder="Password" />
              <input className="signup__form-input" name="confirm" type="password" value={confirm} onChange={this.handleChange} placeholder="Confirm Password" />
              <button className="secondary-button" type="submit">Sign up</button>
              <Link href="/signin">Sign In</Link>
            </form>
          </div>
        </section>
      </>
    );
  }
}

export default Signup;