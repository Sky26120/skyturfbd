"use client";

export default function Dashboard() {
  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      <p>This page is protected. Only logged-in users can see this.</p>
      <button
        onClick={async () => {
          await fetch("/api/auth/logout", { method: "POST" });
          window.location.href = "/signin";
        }}
      >
        Logout
      </button>
    </div>
  );
}
