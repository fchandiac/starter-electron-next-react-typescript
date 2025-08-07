import { initDb } from '../lib/db';
import bcrypt from 'bcryptjs';

async function createAdminUser() {
  try {
    const db = await initDb();
    
    // Verificar si ya existe un usuario admin
    const existingAdmin = await db.get('SELECT * FROM users WHERE username = ?', ['admin']);
    
    if (existingAdmin) {
      console.log('⚠️  El usuario admin ya existe');
      console.log('Username:', existingAdmin.username);
      console.log('Name:', existingAdmin.name);
      console.log('Role:', existingAdmin.role);
      await db.close();
      return;
    }
    
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash('admin', 10);
    
    // Insertar el usuario admin
    const result = await db.run(
      'INSERT INTO users (username, password, name, role) VALUES (?, ?, ?, ?)',
      ['admin', hashedPassword, 'Administrador', 'admin']
    );
    
    console.log('✅ Usuario administrador creado exitosamente!');
    console.log('📋 Detalles del usuario:');
    console.log('- ID:', result.lastID);
    console.log('- Username: admin');
    console.log('- Password: admin (hasheada)');
    console.log('- Name: Administrador');
    console.log('- Role: admin');
    
    // Verificar la creación
    const newUser = await db.get('SELECT id, username, name, role FROM users WHERE id = ?', [result.lastID]);
    console.log('\n🔍 Usuario verificado en la base de datos:');
    console.log(newUser);
    
    await db.close();
  } catch (error) {
    console.error('❌ Error al crear el usuario administrador:', error);
  }
}

createAdminUser();
