import { LoginForm } from '../../../components';

export default function LoginPage() {
  const handleLogin = async (email: string, password: string) => {
    console.log('Login attempt:', { email, password });
    // Aquí puedes agregar la lógica de autenticación
    // Por ejemplo, usando NextAuth o tu propia API
    
    // Simulación de login
    if (email === 'admin@example.com' && password === '123456') {
      alert('Login exitoso!');
      // Redirigir o cambiar el estado de la aplicación
    } else {
      throw new Error('Credenciales incorrectas');
    }
  };

  const handleRegister = () => {
    console.log('Redirect to register');
    // Aquí puedes redirigir a la página de registro
  };

  return (
    <LoginForm 
      onLogin={handleLogin}
      onRegister={handleRegister}
    />
  );
}
