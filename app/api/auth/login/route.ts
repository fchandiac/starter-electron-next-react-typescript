import { NextRequest, NextResponse } from 'next/server';
import { initDb } from '../../../../lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validaciones básicas
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Por favor, ingresa un email válido' },
        { status: 400 }
      );
    }

    // Conectar a la base de datos
    const db = await initDb();

    // Buscar usuario por username (usaremos email como username)
    const user = await db.get(
      'SELECT id, username, password, name, role FROM users WHERE username = ?',
      [email]
    );

    await db.close();

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      );
    }

    // Login exitoso - retornar datos del usuario (sin la contraseña)
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: 'Login exitoso',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
