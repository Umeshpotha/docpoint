
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
  timeSlot: { type: String, required: true },
  maxPersons: { type: Number, required: true, default: 1 },
  bookedPersons: { type: Number, required: true, default: 0 },
});

const Appointment: Model<IAppointment> = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);

export default Appointment;
