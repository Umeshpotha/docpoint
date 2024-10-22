import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
   <div>
   <footer className="w-full bg-gray-900 text-gray-400 py-6">
    <div className="container mx-auto text-center">
      <div className="flex justify-center space-x-6 mb-4">
        <Link href="/about" className="hover:text-teal-400"target="_blank" rel="noopener noreferrer">About Us</Link>
        <Link href="/contact" className="hover:text-teal-400"target="_blank" rel="noopener noreferrer">Contact</Link>
        <Link href="/privacy" className="hover:text-teal-400"target="_blank" rel="noopener noreferrer">Privacy Policy</Link>
      </div>
      <p className="text-sm text-gray-500">
        &copy; 2024 Doctors Point. All rights reserved.
      </p>
    </div>
  </footer></div>
  )
}

export default Footer