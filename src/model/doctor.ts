import mongoose, { Schema, Document, Types } from 'mongoose';

// Doctor interface for TypeScript
export interface Doctor extends Document {
    _id:string;
  name: string;
  specialization: string;
  hospitalname: string; 
}

const DoctorSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  specialization: {
    type: String,
    required: true,
    trim: true,
  },
  hospitalname: {
    type: String,
    required: true,
  },
});

const DoctorModel = mongoose.models.Doctor || mongoose.model<Doctor>('Doctor', DoctorSchema);
export default DoctorModel;
