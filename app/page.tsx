'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// Removed Material UI imports

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redireccionar automáticamente al login
    router.push('/auth/login');
  }, [router]);

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <span>Cargando...</span>
    </div>
  );
}
