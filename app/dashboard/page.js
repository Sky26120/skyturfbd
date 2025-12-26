"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (status === "unauthenticated") router.push("/signin");
  // }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <p>Phone: {session.user.phone}</p>
      <p>Email: {session.user.email}</p>
    </div>
  );
}