"use client";
import { redirect } from "next/navigation";
// import useAuthenticated from '../hooks/useAuthenticated';

interface ProtectedProps {
  children: React.ReactNode;
}

export default function ProtectedResource({ children }: ProtectedProps) {
  const isAuthenticated = false;

  return isAuthenticated ? children : redirect("/login");
}
