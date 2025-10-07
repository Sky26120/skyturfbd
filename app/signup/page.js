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
  const [loading, setLoading] = useState(false); // <-- loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading
    setMessage("");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Signup successful!");
        setTimeout(() => router.push("/signin"), 1000);
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setMessage("Something went wrong, please try again.");
    } finally {
      setLoading(false); // stop loading
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
              <label className="signup__form-label" htmlFor="name">Full Name</label>
              <input
                id="name"
                className="signup__form-input"
                name="name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Full Name"
              />

              <label className="signup__form-label" htmlFor="phone">Phone</label>
              <input
                id="phone"
                className="signup__form-input"
                name="phone"
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Phone"
              />

              <label className="signup__form-label" htmlFor="email">Email</label>
              <input
                id="email"
                className="signup__form-input"
                name="email"
                type="email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
              />

              <label className="signup__form-label" htmlFor="password">Password</label>
              <input
                id="password"
                className="signup__form-input"
                name="password"
                type="password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Password"
              />

              <label className="signup__form-label" htmlFor="confirm">Confirm Password</label>
              <input
                id="confirm"
                className="signup__form-input"
                name="confirm"
                type="password"
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                placeholder="Confirm Password"
              />

              {/* Message */}
              {/* {message && (
                <p
                  style={{
                    marginTop: "10px",
                    color: isSuccess ? "green" : "red",
                  }}
                >
                  {message}
                </p>
              )} */}

              {/* Button with loader */}
              <button
                className="secondary-button signup__button"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="loader" />
                ) : (
                  "Sign up"
                )}
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
              alt=""
              width={500}
              className="signup__image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}