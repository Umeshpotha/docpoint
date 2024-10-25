import { NextResponse } from 'next/server';
import HospitalModel from '@/model/Hospital';
import dbConnect from '@/lib/dbConnect';

export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const selectedCity = searchParams.get('location') || ''; 

  try {
    console.log('Selected city:', selectedCity);
    const hospitals = await HospitalModel.find({ location: selectedCity }); 
    console.log(hospitals)
    return NextResponse.json(hospitals);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching hospitals' }, { status: 500 });
  }
}
