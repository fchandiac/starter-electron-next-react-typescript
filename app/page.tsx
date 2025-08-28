'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from './components/LoginForm/LoginForm';


// Removed Material UI imports

export default function Home() {
  const router = useRouter();

  // useEffect(() => {
  //   // Redireccionar automáticamente al login
  //   router.push('/auth/login');
  // }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <LoginForm />
    </div>
  );
}
