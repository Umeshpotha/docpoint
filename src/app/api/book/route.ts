// src/app/api/book/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect'; // Adjust the import based on your project structure
import scheduled from '@/model/scheduled';
 // Adjust the import based on your Appointment model

export async function POST(req: Request) {
  await dbConnect(); // Connect to your database

  try {
    const {
      name,
      dateOfBirth,
      preferredDate,
      preferredTime,
      BloodGroup,
      doctorId,
      doctorName,
        hospitalName,
        userId
    } = await req.json(); // Parse the JSON body

    // Validate required fields
    if (!name || !dateOfBirth || !preferredDate || !preferredTime || !BloodGroup || !doctorId) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    // Create the appointment record
    const newAppointment = new scheduled({
      name,
      dateOfBirth,
      preferredDate,
      preferredTime,
      BloodGroup,
      doctorId,
      doctorName,
        hospitalName,
      userId
    });

    await newAppointment.save();

    // Respond with success
    return NextResponse.json(
      { message: 'Appointment booked successfully.', appointment: newAppointment },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error booking appointment:', error);
    return NextResponse.json(
      { message: 'An error occurred while booking the appointment.' },
      { status: 500 }
    );
  }
}
