'use client';

import { LoginForm } from '../../components';
// import eliminado: useAlertContext
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  // showAlert eliminado, no se usa AlertContext
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Mostrar error específico de la API
  // Mostrar error específico de la API (alerta eliminada)
        return;
      }

      // Verificar que el usuario sea admin
      if (data.user.role !== 'admin') {
  // Acceso denegado. Solo los administradores pueden acceder. (alerta eliminada)
        return;
      }

      // Login exitoso para admin
  // ¡Bienvenido! Login exitoso. (alerta eliminada)
      
      // Redireccionar a la página de admin después de un breve delay
      setTimeout(() => {
        router.push('/admin');
      }, 1500);

    } catch (error) {
      console.error('Error durante el login:', error);
  // Error de conexión. Verifica tu conexión a internet. (alerta eliminada)
    }
  };

  const handleRegister = () => {
  // Función de registro próximamente (alerta eliminada)
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <LoginForm />
    </div>
  );
}
