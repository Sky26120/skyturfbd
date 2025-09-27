"use client";
import React from "react";
import Link from "next/link";
import Router from "next/router";
import Image from "next/image";

import SignupImage from "@/public/images/sky-signin.jpg"

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
        credentials: "include", // ✅ live cookie attach করার জন্য
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
    const { phone, password, error } = this.state;

    return (
      <>
        <section className="signin">
          <div className="container">
            <div className="signin__content">
              <div className="signin__image-wrap">
                <Image 
                  src={SignupImage}
                  alt=""
                  width={500}
                  className="signin__image"
                />
              </div>
              <div className="signin__form-wrap">
                <h3 className="secondary-heading signin__heading">Welcome to Sky Turf</h3>
                <p className="primary-text signin__text">Sky Turf Where Football Meets the Sky</p>
                <form className="signin__form" onSubmit={this.handleSubmit}>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <label className="signin__form-label" htmlFor="phone">Phone</label>
                  <input
                    className="signin__form-input"
                    name="phone"
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={this.handleChange}
                    id="phone"
                  />

                  <label className="signin__form-label" htmlFor="password">Password</label>
                  <input
                    className="signin__form-input"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.handleChange}
                    id="password"
                  />
                  <Link href="">
                    <span className="signin__forgot-pass-text">Forgot Password</span>
                  </Link>

                  <button className="secondary-button signin__button" type="submit">Login</button>

                  <p className="signin__acc-text">
                    Do not have an account? <Link href="/signup"><span className="signin__link-text">Sign Up</span></Link>
                  </p>
                </form>
              </div>
            </div>
            
          </div>
        </section>
      </>
    );
  }
}

export default Signin;