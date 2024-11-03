// app/api/appointments/availability/route.ts
import { NextResponse } from 'next/server';
import Appointment from '@/model/Appointment';
import dbConnect from '@/lib/dbConnect';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const doctorId = searchParams.get('doctorId');

  await dbConnect(); // Ensure you connect to the database

  try {
    console.log('Doctor ID:', doctorId);

    const appointments = await Appointment.find({ doctor: doctorId }).lean();

    // console.log(appointments)

    // Organize data by date and include available slots with max and booked persons
    const availability = appointments.reduce<{ [key: string]: { timeSlot: string; maxPersons: number; bookedPersons: number; available: number }[] }>((acc, appointment) => {
      const dateKey = appointment.date.toDateString(); // Use date string as key

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      const availableSlots = appointment.maxPersons - appointment.bookedPersons;

      acc[dateKey].push({
        timeSlot: appointment.timeSlot,
        maxPersons: appointment.maxPersons,
        bookedPersons: appointment.bookedPersons,
        available: availableSlots >= 0 ? availableSlots : 0, // Ensure no negative values
      });

      return acc;
    }, {});

    return NextResponse.json(availability);
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.error();
  }
}
