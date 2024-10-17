"use client";
import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;

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
                Welcome, {user?.name || user?.email}
              </span>
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
    </nav>
  );
}

export default Navbar;
