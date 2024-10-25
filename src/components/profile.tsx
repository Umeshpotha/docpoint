"use client";
import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '../components/ui/button'; // Adjust the import path based on your project structure

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(session?.user?.username || '');
  const [email, setEmail] = useState(session?.user?.email || '');

  // Handle profile update (mock function)
  const handleProfileUpdate = () => {
    // Here you would typically make an API call to update the user profile
    console.log("Profile updated", { username, email });
    setIsEditing(false);
  };

  if (status === 'loading') {
    return <div>Loading...</div>; // You can replace this with a spinner or loading animation
  }

  if (!session) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-bold">You are not logged in.</h1>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 ml-3">Profile</h1>
      <div className=" bg-slate-200 dark:bg-gray-800 text-black dark:text-white p-4 rounded-lg">
        <div className="mb-4">
          <label className="block text-black dark:text-gray-300 font-bold">Username</label>
          {isEditing ? (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 rounded bg-gray-400  w-full"
            disabled/>
          ) : (
            <p className='text-black '>{username}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-black dark:text-gray-300 font-bold">Email</label>
          {isEditing ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 rounded bg-gray-400 w-full"
            disabled/>
          ) : (
            <p className='text-black '>{email}</p>
          )}
        </div>
        <div className="flex items-center justify-between mt-4">
          {isEditing ? (
            <>
              <Button onClick={handleProfileUpdate} className="bg-blue-500 text-white hover:bg-transparent hover:border-2 hover:border-solid hover:border-sky-500 hover:text-black">
                Save
              </Button>
              <Button onClick={() => setIsEditing(false)} className="bg-red-500 text-white hover:bg-transparent hover:border-2 hover:border-solid hover:border-red-500 hover:text-black" >
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white hover:bg-transparent  hover:border-solid hover:border-2 hover:border-sky-500 hover:text-black">
              Edit Profile
            </Button>
          )}
          {isEditing ?null:<Button onClick={() => signOut()} className="bg-red-600 text-white hover:bg-transparent hover:text-black hover:border-solid hover:border-2 hover:border-red-500">
            Logout
          </Button>}
          
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;