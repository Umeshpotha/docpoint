import React, { Suspense } from 'react';
import Dashboard from '@/components/Dashboard';

const DashboardPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <Dashboard />
    </Suspense>
  );
};

export default DashboardPage;
