import React from 'react';
import TopBar from '../components/TopBar/TopBar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <TopBar title="Admin" />
      <main className="p-4">
        {children}
      </main>
    </div>
  );
}
