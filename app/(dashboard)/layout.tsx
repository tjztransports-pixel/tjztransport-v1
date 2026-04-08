'use client';
import { redirect } from 'next/navigation';
import Sidebar from '../components/Sidebar';

import { useUser } from '../hooks/useUser';
import { Toaster } from 'sonner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return redirect('/auth');
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar user={user} />
      <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        {children}
      </main>
      <Toaster />
    </div>
  );
}
