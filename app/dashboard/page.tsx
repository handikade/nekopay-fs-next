"use client";

import { signOut } from "next-auth/react";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-4xl font-bold">Dashboard</h1>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Sign Out
      </button>
    </div>
  );
}
