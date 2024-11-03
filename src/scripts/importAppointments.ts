// scripts/populateAppointments.ts
import dbConnect from '@/lib/dbConnect';
import Appointment from '@/model/Appointment'; // Adjust based on your structure
import mongoose from 'mongoose';

const populateAppointments = async () => {
    await dbConnect();

    // Create a new appointment
    const newAppointment = new Appointment({
        doctor: new mongoose.Types.ObjectId('671a9c3d7b0fcf129fc10ffd'), // Replace with a valid doctor ID
        date: new Date('2024-11-01'), // Set the desired date
        timeSlot: '09:00 AM - 10:00 AM', // Set the desired time slot
        maxPersons: 5, // Set your max persons
        bookedPersons: 0 // Set your booked persons
    });

    newAppointment.save()
        .then(() => console.log('Appointment saved!'))
        .catch((err: any) => console.error('Error saving appointment:', err));
};

export default populateAppointments;
