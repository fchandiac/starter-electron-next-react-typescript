import { initDb } from '../lib/db';

async function updateAdminUser() {
  try {
    const db = await initDb();
    
    // Actualizar el usuario admin para que use email como username
    const result = await db.run(
      'UPDATE users SET username = ? WHERE username = ?',
      ['admin@admin.com', 'admin']
    );
    
    if (result.changes && result.changes > 0) {
      console.log('✅ Usuario admin actualizado exitosamente!');
      console.log('📧 Nuevo email: admin@admin.com');
      console.log('🔑 Contraseña: admin');
    } else {
      console.log('⚠️ No se encontró el usuario admin para actualizar');
    }
    
    // Verificar la actualización
    const updatedUser = await db.get('SELECT id, username, name, role FROM users WHERE username = ?', ['admin@admin.com']);
    if (updatedUser) {
      console.log('\n🔍 Usuario verificado:');
      console.log(updatedUser);
    }
    
    await db.close();
  } catch (error) {
    console.error('❌ Error al actualizar el usuario admin:', error);
  }
}

updateAdminUser();
