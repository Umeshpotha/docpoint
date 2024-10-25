import { NextRequest,NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import DoctorModel from '@/model/doctor';

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const selectedHospital = searchParams.get('hospitalName') || '';

  try {
    // Check if selectedCity is empty or undefined
    if (!selectedHospital) {
      return NextResponse.json({ error: 'HospitalName parameter is Empty' }, { status: 400 });
    }

    // Perform case-insensitive search for hospitals
    const doctors = await DoctorModel.find({ hospitalname: selectedHospital });

    if (doctors.length === 0) {
      return NextResponse.json({ message: 'No hospitals found in the specified location' }, { status: 404 });
    }

    return NextResponse.json(doctors);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching hospitals' }, { status: 500 });
  }
}