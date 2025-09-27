"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import SignupImage from "@/public/images/sky-signin.jpg"

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
            <div className="signup__content">
              <div className="signup__form-wrap">
                <h3 className="secondary-heading signup__heading">Create your account</h3>
                <p className="primary-text signup__text">Sky Turf Where Football Meets the Sky</p>
                <form className="signup__form" onSubmit={this.handleSubmit}>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <label className="signup__form-label" htmlFor="name">Full Name</label>
                  <input id="name" className="signup__form-input" name="name" value={name} onChange={this.handleChange} placeholder="Full Name" />

                  <label className="signup__form-label" htmlFor="phone">Phone</label>
                  <input id="phone" className="signup__form-input" name="phone" value={phone} onChange={this.handleChange} placeholder="Phone" />

                  <label className="signup__form-label" htmlFor="email">Email</label>
                  <input id="email" className="signup__form-input" name="email" type="email" value={email} onChange={this.handleChange} placeholder="Email" />

                  <label className="signup__form-label" htmlFor="password">Password</label>
                  <input id="password" className="signup__form-input" name="password" type="password" value={password} onChange={this.handleChange} placeholder="Password" />

                  <label className="signup__form-label" htmlFor="confirm">Confirm Password</label>
                  <input id="confirm" className="signup__form-input" name="confirm" type="password" value={confirm} onChange={this.handleChange} placeholder="Confirm Password" />

                  <button className="secondary-button signup__button" type="submit">Sign up</button>

                  <p className="signup__acc-text">
                    Already have an account? <Link href="/signin"><span className="signup__link-text">Sign In</span></Link>
                  </p>
                </form>
              </div>
              <div className="signup__image-wrap">
                <Image 
                  src={SignupImage}
                  alt=""
                  width={500}
                  className="signup__image"
                />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Signup;