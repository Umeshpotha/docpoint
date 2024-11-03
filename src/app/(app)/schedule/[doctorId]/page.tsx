"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar"
import { useSession } from 'next-auth/react';
import { User } from "next-auth";
interface AppointmentFormData {
  name: string;
  dateOfBirth: string;
  preferredDate: string;
  preferredTime: string;
  BloodGroup: string;
}

interface TimeSlot {
  id: string;
  timeSlot: string;
  maxPersons: number;
  bookedPersons: number;
  available: number;
}

interface DateSlot {
  id: string;
  label: string;
  available: boolean;
}

interface DoctorDetails {
  id: string | null;
  name: string | null;
  hospitalName: string | null;
}

const DoctorAppointmentForm = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const userId = user?.id;
  console.log(userId);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  const doctorId = params.doctorId as string;
  const doctorName = searchParams.get('doctorName') || '';
  const hospitalName = searchParams.get('hospitalName') || '';

  const [doctorDetails, setDoctorDetails] = useState<DoctorDetails>({
    id: null,
    name: null,
    hospitalName: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availability, setAvailability] = useState<{ [date: string]: TimeSlot[] } | null>(null);
  const [dateSlots, setDateSlots] = useState<DateSlot[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);

  const [formData, setFormData] = useState<AppointmentFormData>({
    name: '',
    dateOfBirth: '',
    preferredDate: '',
    preferredTime: '',
    BloodGroup: '',
  });

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const missingFields: string[] = [];
        if (!doctorId) missingFields.push('Doctor ID');
        if (!doctorName) missingFields.push('Doctor Name');
        if (!hospitalName) missingFields.push('Hospital Name');

        if (missingFields.length > 0) {
          throw new Error(`Missing required information: ${missingFields.join(', ')}`);
        }

        setDoctorDetails({
          id: doctorId,
          name: decodeURIComponent(doctorName),
          hospitalName: decodeURIComponent(hospitalName),
        });
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
        console.error('Error fetching doctor details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [doctorId, doctorName, hospitalName]);

  useEffect(() => {
    const fetchAvailability = async () => {
      if (!doctorId) return;
      try {
        const response = await fetch(`/api/appointments/availability?doctorId=${doctorId}`);
        
        if (!response.ok) throw new Error('Failed to fetch availability');
        const data = await response.json();
        setAvailability(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      }
    };

    fetchAvailability();
  }, [doctorId]);

  useEffect(() => {
    if (availability) {
      const slots = Object.keys(availability).map(date => ({
        id: date,
        label: new Date(date).toLocaleDateString(),
        available: availability[date].some(slot => slot.available > 0)
      }));
      setDateSlots(slots);
    }
  }, [availability]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateSelect = (date: string) => {
    setFormData(prev => ({
      ...prev,
      preferredDate: date,
      preferredTime: '' // Reset time when date changes
    }));
    setSelectedTimeSlots(availability?.[date] || []);
  };

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({
      ...prev,
      preferredTime: time
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      doctorId,
      doctorName: doctorDetails.name,
      hospitalName: doctorDetails.hospitalName,
      userId,
    };
    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }

      const result = await response.json();
      console.log('Appointment booked successfully:', result);

      // Optionally, you can redirect the user or show a success message
      router.push('/success'); // Redirect to a success page or similar
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred while booking the appointment');
      console.error('Error submitting appointment:', error);
    }







    console.log('Form submitted:', submitData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
        <Card className="w-full max-w-2xl p-6">
          <CardContent className="text-center">Loading...</CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
        <Card className="w-full max-w-2xl p-6 text-center">
          <CardHeader>
            <CardTitle className="text-xl text-red-600 mb-4">Unable to Load Appointment Form</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500 mb-4">{error}</p>
            <p className="text-gray-600 mb-6">
              Please ensure you have clicked through from a valid doctor's profile page.
            </p>
            <Button
              onClick={() => router.back()}
              className="bg-gray-800 text-white hover:bg-gray-700"
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl p-6">
        <CardHeader>
          <CardTitle className="text-xl">Schedule Appointment</CardTitle>


        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-sm gap-5 mb-5">
              <label className="text-xs uppercase tracking-wide text-blue-700 font-semibold">
                Doctor's Name
              </label>
              <p className="text-lg font-bold text-blue-900">{doctorDetails?.name}</p>
              {doctorDetails?.hospitalName && (
                <p className="text-sm text-blue-600 italic">{doctorDetails.hospitalName}</p>
              )}
              {/* <p className="text-xs text-blue-500 font-mono">ID: {doctorDetails?.id}</p> */}
            </div>
            <div className="grid gap-4">
              <Input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <label className="block text-sm font-medium text-gray-700">DOB</label>
              <Input
                type="date"
                name="dateOfBirth"
                placeholder="Date of Birth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
                className='w-36'
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Select Date</label>
                <Select
                  value={formData.preferredDate}
                  onValueChange={handleDateSelect}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a date" />
                  </SelectTrigger>
                  <SelectContent>
                    {dateSlots.map((slot) => (
                      <SelectItem
                        key={slot.id}
                        value={slot.id}
                        disabled={!slot.available}
                      >
                        {slot.label} {slot.available ? '(Available)' : '(Full)'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.preferredDate && selectedTimeSlots.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Select Time</label>
                  <Select
                    value={formData.preferredTime}
                    onValueChange={handleTimeSelect}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedTimeSlots.map((slot) => (
                        <SelectItem
                          key={slot.id}
                          value={slot.timeSlot}
                          disabled={slot.available === 0}
                        >
                          {slot.timeSlot} ({slot.available} slots available)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                <Select
                  value={formData.BloodGroup}
                  onValueChange={(value) => setFormData({ ...formData, BloodGroup: value })}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="bg-blue-600 text-white"
                disabled={!formData.preferredDate || !formData.preferredTime}
              >
                Book Appointment
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default DoctorAppointmentForm;