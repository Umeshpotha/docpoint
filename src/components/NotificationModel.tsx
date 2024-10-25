// NotificationModal.tsx
import React from 'react';
import { Bell, X } from 'lucide-react';

interface NotificationModalProps {
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ showNotifications, setShowNotifications }) => {
  return (
    <>
      {showNotifications && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-200 bg-opacity-50 z-50 dark:bg-gray-700">
          <div className="bg-slate-200 p-6 rounded-lg shadow-lg text-white relative max-w-md w-full dark:bg-gray-700 dark:text-black">
            <button 
              onClick={() => setShowNotifications(false)} 
              className="absolute top-2 right-2 text-gray-300 hover:text-teal-400 text-xl"
              aria-label="Close Notifications"
            >
              <X className="h-6 w-6 text-black dark:text-white " />
            </button>
            
            <h2 className="text-lg font-bold mb-4 flex items-center text-black dark:text-white">
              <Bell className="h-8 w-8 text-black mr-2 dark:text-teal-500" />
              Notifications
            </h2>
            
            {/* No Notifications Message */}
            <div className="text-center text-gray-400 mt-4">
              <p>No Notifications</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationModal;
