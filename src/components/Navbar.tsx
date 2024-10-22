// Navbar.tsx
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';
import { Bell, UserCircle } from 'lucide-react';
import NotificationModal from './NotificationModel';

NotificationModal

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const [showNotifications, setShowNotifications] = useState(false); // State to control notifications visibility

  return (
    <nav className="sticky top-0 z-50 p-4 md:p-6 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="text-2xl font-bold mb-4 md:mb-0 text-teal-400 hover:text-teal-300 font-kaushan">
          Doctors Point
        </Link>
        <div className="flex items-center">
          {session ? (
            <>
              <span className="mr-4 text-gray-300">
                Welcome, {user?.username || user?.email}
              </span>
              <button 
                className="mr-4 p-2 rounded-full hover:bg-gray-700 focus:outline-none" 
                aria-label="Profile"
              >
                <UserCircle className="h-8 w-8 text-gray-300" />
              </button>
              <div className="relative mr-4">
                <button 
                  onClick={() => setShowNotifications(true)} // Open notifications
                  className="p-2 rounded-full hover:bg-gray-700 focus:outline-none" 
                  aria-label="Notifications"
                >
                  <Bell className="h-6 w-6 text-gray-300" />
                </button>
              </div>
              
              <Button 
                onClick={() => signOut()} 
                className="bg-teal-400 text-black hover:bg-teal-300 shadow-lg" 
                aria-label="Logout"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button 
                className="bg-teal-400 text-black hover:bg-teal-300 shadow-lg" 
                aria-label="Login"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* NotificationModal Component */}
      <NotificationModal showNotifications={showNotifications} setShowNotifications={setShowNotifications} />
    </nav>
  );
}

export default Navbar;
