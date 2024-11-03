
import mongoose, { Document, Model } from 'mongoose';

interface IAppointment extends Document {
  doctor: mongoose.Types.ObjectId;
  date: Date;
  timeSlot: string;
  maxPersons: number; 
  bookedPersons: number; 
}

const AppointmentSchema = new mongoose.Schema<IAppointment>({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true }, // e.g., '09:00 AM - 10:00 AM'
  maxPersons: { type: Number, required: true, default: 1 }, // Default to 1 for individual appointments
  bookedPersons: { type: Number, required: true, default: 0 }, // Start with 0 booked
});

const Appointment: Model<IAppointment> = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);

export default Appointment;
