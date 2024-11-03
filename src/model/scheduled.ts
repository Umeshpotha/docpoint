
import mongoose, { Document, Schema } from 'mongoose';

export interface IScheduled extends Document {
  name: string;
  dateOfBirth: string;
  preferredDate: string;
  preferredTime: string;
  BloodGroup: string;
  doctorId: string;
  doctorName: string;
    hospitalName: string;
    userId: string;
}

const AppointmentSchema = new Schema<IScheduled>({
  name: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  preferredDate: { type: String, required: true },
  preferredTime: { type: String, required: true },
  BloodGroup: { type: String, required: true },
  doctorId: { type: String, required: true },
  doctorName: { type: String, required: true },
    hospitalName: { type: String, required: true },
  userId: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Scheduled || mongoose.model<IScheduled>('Scheduled', AppointmentSchema);
