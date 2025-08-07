'use client';

import { LoginForm } from '../../../components';
import { useAlertContext } from '../../../context';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { showAlert } = useAlertContext();
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
        showAlert(data.error || 'Error al iniciar sesión', 'error');
        return;
      }

      // Verificar que el usuario sea admin
      if (data.user.role !== 'admin') {
        showAlert('Acceso denegado. Solo los administradores pueden acceder.', 'error');
        return;
      }

      // Login exitoso para admin
      showAlert(`¡Bienvenido ${data.user.name}! Login exitoso.`, 'success');
      
      // Redireccionar a la página de admin después de un breve delay
      setTimeout(() => {
        router.push('/admin');
      }, 1500);

    } catch (error) {
      console.error('Error durante el login:', error);
      showAlert('Error de conexión. Verifica tu conexión a internet.', 'error');
    }
  };

  const handleRegister = () => {
    showAlert('Función de registro próximamente', 'info');
  };

  return (
    <LoginForm 
      onLogin={handleLogin}
      onRegister={handleRegister}
    />
  );
}
