'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { TextField } from '../TextField/TextField';
import { Button } from '../Button/Button';

interface LoginFormProps {
	onLogin?: (email: string, password: string) => Promise<void>;
	onRegister?: () => void;
	loading?: boolean;
}

export default function LoginForm({ onLogin, onRegister, loading = false }: LoginFormProps) {
	const router = useRouter();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
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
			const res = await signIn('credentials', {
				redirect: false,
				username: email,
				password,
			});
					if (res?.error) {
						setError('Error al iniciar sesión. Verifica tus credenciales.');
					} else {
						// Obtener el usuario autenticado
						const userRes = await fetch('/api/auth/session');
						const session = await userRes.json();
						if (session?.user?.role === 'admin') {
							router.push('/admin');
						} else {
							router.refresh();
						}
					}
		} catch (err) {
			setError('Error al iniciar sesión. Verifica tus credenciales.');
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full max-w-sm mx-auto bg-white rounded-lg border border-border p-6 flex flex-col gap-4"
		>
			<h2 className="text-xl font-bold text-center mb-2">Iniciar sesión</h2>
			<div className="flex flex-col gap-2">
				<TextField
					label="Email"
					name="email"
					type="email"
					value={email}
					onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEmail(e.target.value)}
					placeholder="Correo electrónico"
					className=""
				/>
				<TextField
					label="Contraseña"
					name="password"
					type={showPassword ? "text" : "password"}
					value={password}
					onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPassword(e.target.value)}
					placeholder="Contraseña"
					endIcon={
						<span
							className="material-symbols-outlined"
							style={{ cursor: 'pointer' }}
							onClick={togglePasswordVisibility}
						>{showPassword ? 'visibility_off' : 'visibility'}</span>
					}
				/>
			</div>
			{error && <div className="text-red-500 text-sm text-center">{error}</div>}
			<Button type="submit" variant="primary" className="w-full mt-2" disabled={loading}>
				{loading ? 'Ingresando...' : 'Ingresar'}
			</Button>
			{onRegister && (
				<Button type="button" variant="text" className="w-full" onClick={onRegister}>
					¿No tienes cuenta? Regístrate
				</Button>
			)}
		</form>
	);
}
