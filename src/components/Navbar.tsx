"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { User } from "next-auth";
import { Bell, UserCircle, X } from "lucide-react";
import NotificationModal from "./NotificationModel";
import ProfilePage from "./profile";

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav className="sticky top-0 z-50 p-4 md:p-6 shadow-lg bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center bg-transparent">
        <Link
          href="/"
          className="text-2xl font-bold mb-4 md:mb-0 text-sky-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 font-kaushan"
        >
          Doctors Point
        </Link>
        <div className="flex items-center">
          {session ? (
            <>
              <span className="mr-4 text-gray-700 dark:text-gray-300">
                Welcome {user?.username || user?.email}
              </span>
              <button
                className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
                aria-label="Profile"
                onClick={() => setShowProfile(true)}
              >
                <UserCircle className="h-8 w-8 text-gray-700 dark:text-gray-300" />
              </button>

              <div className="relative mr-4">
                <button
                  onClick={() => setShowNotifications(true)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
                  aria-label="Notifications"
                >
                  <Bell className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </button>
              </div>

              <Button
                onClick={() => signOut()}
                className="bg-sky-500 dark:bg-teal-400 text-black dark:text-black hover:bg-transparent dark:hover:bg-teal-300 shadow-lg hover:border-2 hover:border-solid hover:border-sky-500"
                aria-label="Logout"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button
                className="bg-sky-500 text-white dark:bg-teal-400  dark:text-black hover:bg-teal-500 dark:hover:bg-teal-300 shadow-lg hover:bg-transparent hover:border-2 hover:border-sky-500 hover:text-black"
                aria-label="Login"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>

      <NotificationModal
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
      />
      {showProfile && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-200 bg-opacity-50 z-50">
          <div className="bg-slate-200 dark:bg-gray-800 p-6 rounded-lg shadow-lg text-black dark:text-white relative max-w-md w-full">
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-2 right-2 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 text-xl"
              aria-label="Close Profile"
            >
              <X className="h-6 w-6 text-black font-bold" />
            </button>
            <ProfilePage />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
