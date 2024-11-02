'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Doctor } from '@/model/doctor';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const params = useParams();
  let hospitalName = Array.isArray(params.name) ? params.name[0] : params.name;  const router = useRouter();

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/get-doctors?hospitalName=${hospitalName}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Doctor[] = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    if (hospitalName) {
      fetchDoctors();
    }
  }, [hospitalName]);

  const handleScheduleAppointment = (doctorId: string, doctorName: string) => {
    doctorName=encodeURIComponent(doctorName);
    hospitalName=encodeURIComponent(hospitalName);
    router.push(`/schedule/${doctorId}?doctorName=${doctorName}&hospitalName=${hospitalName}`);
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Doctors</h1>
        <input
          type="text"
          placeholder="Search by name or specialization"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-1/3 focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-teal-500" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor._id} className="border p-4 rounded-lg shadow-lg transition hover:shadow-xl bg-white">
              <h2 className="text-xl font-semibold text-center">{doctor.name}</h2>
              <p className="text-center text-gray-600">Specialization: {doctor.specialization}</p>
              <button
                onClick={() => handleScheduleAppointment(doctor._id, doctor.name)}
                className="w-full mt-4 py-2 px-4 bg-teal-500 text-white font-bold rounded-md hover:bg-teal-600"
              >
                Schedule Appointment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
