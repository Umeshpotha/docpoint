import mongoose, { Schema, Document } from 'mongoose';


export interface Hospital extends Document {
  name: string;
  location: string;
  photoLink: string;
  
}


const hospitalSchema: Schema<Hospital> = new Schema({
  name: {
    type: String,
    required: [true, 'Hospital name is required'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  photoLink: {
    type: String,
    required: [true, 'Photo link is required'],
  },
  
}, {
  timestamps: true, 
});


const HospitalModel =

  (mongoose.models.Hospital as mongoose.Model<Hospital>) ||
  mongoose.model<Hospital>('Hospital', hospitalSchema);

export default HospitalModel;
