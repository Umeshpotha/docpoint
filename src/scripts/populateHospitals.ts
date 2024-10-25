// scripts/populateHospitals.ts
import dbConnect from '@/lib/dbConnect';
import DoctorModel from '@/model/doctor';


const populateHospitals = async () => {
  await dbConnect();

  const newDoctor = new DoctorModel({
    name: 'Dr. John Doe',
    specialization: 'Cardiology',
    hospitalname: 'Siddhi Vinayak Hospital',
});

newDoctor.save()
    .then(() => console.log('Doctor saved!'))
    .catch((err: any) => console.error('Error saving doctor:', err));
};

export default populateHospitals;
