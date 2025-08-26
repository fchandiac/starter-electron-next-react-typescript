'use client';

import React, { useState } from 'react';
// Removed Material UI imports

interface LoginFormProps {
  onLogin?: (email: string, password: string) => Promise<void>;
  onRegister?: () => void;
  loading?: boolean;
}

export default function LoginForm({ onLogin, onRegister, loading = false }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    if (!email.includes('@')) {
      setError('Por favor, ingresa un email válido');
      return;
    }

    try {
      if (onLogin) {
        await onLogin(email, password);
      }
    } catch (err) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <h3>Formulario de login deshabilitado</h3>
    </div>
  );
}
