'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // For app router
import { Doctor } from '@/model/doctor';


const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]); // Ensure this state holds an array of Doctor objects
  const [loading, setLoading] = useState(true);
  const { name } = useParams(); 

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      
      
      try {
        const response = await fetch(`/api/get-doctors?hospitalName=${name}`);
        console.log("hello") // Fetch doctors by hospital name
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Doctor[] = await response.json(); // Expecting an array of Doctor objects
        setDoctors(data); // Set doctors to state
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    if (name) {
      fetchDoctors();
    }
  }, [name]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Doctors in this Hospital</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        doctors.map((doctor) => (
          <div key={doctor._id} className="mb-4">
            <h2 className="text-xl font-semibold">{doctor.name}</h2>
            <p>Specialization: {doctor.specialization}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default DoctorsPage;
