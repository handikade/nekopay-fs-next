"use client";

import {
  Cog6ToothIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Dashboard
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a
            href="/dashboard"
            className="flex items-center space-x-2 py-2 px-4 rounded hover:bg-gray-700"
          >
            <HomeIcon className="h-5 w-5" />
            <span>Home</span>
          </a>
          <a
            href="/dashboard/partners"
            className="flex items-center space-x-2 py-2 px-4 rounded hover:bg-gray-700"
          >
            <UsersIcon className="h-5 w-5" />
            <span>Partners</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 py-2 px-4 rounded hover:bg-gray-700"
          >
            <Cog6ToothIcon className="h-5 w-5" />
            <span>Settings</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
          <h1 className="text-2xl font-semibold">Welcome to Dashboard</h1>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Sign Out
          </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
