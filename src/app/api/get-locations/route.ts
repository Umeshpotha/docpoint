
import { NextResponse } from 'next/server';
import HospitalModel from '@/model/Hospital';
import dbConnect from '@/lib/dbConnect';

export async function GET(request: Request) {
  await dbConnect();

  try {
    
    const locations = await HospitalModel.distinct('location');
    console.log('Distinct locations:', locations);
    return NextResponse.json(locations);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching locations' }, { status: 500 });
  }
}
