"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SignupImage from '@/public/images/sky-signin.jpg';

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsSuccess(false);

  
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let data = {};
      try {
        data = await res.json();
      } catch (err) {
        console.error("Invalid JSON response:", err);
      }

      if (res.ok) {
        setMessage("Signup successful!");
        setIsSuccess(true);
        setTimeout(() => router.push("/signin"), 1000);
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="signup">
      <div className="container">
        <div className="signup__content">
       
          <div className="signup__form-wrap">
            <h3 className="secondary-heading signup__heading">Create your account</h3>
            <p className="primary-text signup__text">
              Sky Turf Where Football Meets the Sky
            </p>

            <form className="signup__form" onSubmit={handleSubmit}>
              <label htmlFor="name" className="signup__form-label">Full Name</label>
              <input
                id="name"
                name="name"
                className="signup__form-input"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />

              <label htmlFor="phone" className="signup__form-label">Phone</label>
              <input
                id="phone"
                name="phone"
                className="signup__form-input"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />

              <label htmlFor="email" className="signup__form-label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="signup__form-input"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />

              <label htmlFor="password" className="signup__form-label">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className="signup__form-input"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />

              <label htmlFor="confirmPassword" className="signup__form-label">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="signup__form-input"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                required
              />

             
              {message && (
                <p
                  style={{
                    marginTop: "10px",
                    color: isSuccess ? "green" : "red",
                  }}
                >
                  {message}
                </p>
              )}

              
              <button
                className="secondary-button signup__button"
                type="submit"
                disabled={loading}
              >
                {loading ? <span className="loader" /> : "Sign up"}
              </button>

              <p className="signup__acc-text">
                Already have an account?{" "}
                <Link href="/signin">
                  <span className="signup__link-text">Sign In</span>
                </Link>
              </p>
            </form>
          </div>

         
          <div className="signup__image-wrap">
            <Image
              src={SignupImage}
              alt="Signup Image"
              width={500}
              className="signup__image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
