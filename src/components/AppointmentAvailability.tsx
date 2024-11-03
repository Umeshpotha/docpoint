// AppointmentAvailability.tsx
import React from 'react';

// Define the TimeSlot interface if not already defined
interface TimeSlot {
  id: string;       // Unique identifier for the time slot
  time: string;     // The time for the appointment (e.g., "10:00 AM")
  available: boolean; // Indicates if the time slot is available
}

// Define props interface for AppointmentAvailability
interface AppointmentAvailabilityProps {
  availability: TimeSlot[];
  selectedSlot: string;
  onTimeSlotSelect: (slotId: string) => void;
}

const AppointmentAvailability: React.FC<AppointmentAvailabilityProps> = ({ availability, selectedSlot, onTimeSlotSelect }) => {
  return (
    <div>
      <label className="text-xs uppercase tracking-wide text-gray-600 font-semibold">
        Available Time Slots
      </label>
      <div className="grid grid-cols-3 gap-4">
        {availability.map(slot => (
          <button
            key={slot.id}
            onClick={() => onTimeSlotSelect(slot.id)}
            className={`border p-2 rounded-lg ${
              selectedSlot === slot.id
                ? 'bg-blue-600 text-white'
                : slot.available
                ? 'bg-white text-blue-600 hover:bg-blue-50'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!slot.available}
          >
            {slot.time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AppointmentAvailability;
