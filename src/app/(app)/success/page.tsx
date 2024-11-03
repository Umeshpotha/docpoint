// app/appointment-success/page.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Bell, ArrowLeft } from 'lucide-react';

export default function AppointmentSuccessPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full">
                <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                        {/* Success Icon */}
                        <div className="rounded-full bg-green-100 p-3">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>

                        {/* Success Message */}
                        <h1 className="text-2xl font-bold text-gray-900">
                            Appointment Scheduled Successfully!
                        </h1>

                        {/* Notification Message */}
                        <div className="flex items-center gap-2 bg-blue-50 p-4 rounded-lg">
                            <Bell className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            <p className="text-blue-700 text-sm">
                                You will receive a reminder notification one day before your appointment.
                            </p>
                        </div>

                        {/* Back to Dashboard Button */}
                        <Button
                            className="w-full mt-6 gap-2"
                            variant="default"
                            onClick={() => router.push('/dashboard')}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Dashboard
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}