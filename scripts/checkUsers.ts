import { initDb } from '../lib/db';

async function checkUsers() {
  try {
    const db = await initDb();
    
    // Verificar si la tabla existe y tiene datos
    const users = await db.all('SELECT * FROM users');
    
    console.log('📊 Estado de la tabla users:');
    console.log('Total de usuarios:', users.length);
    
    if (users.length > 0) {
      console.log('\n👥 Usuarios registrados:');
      users.forEach((user, index) => {
        console.log(`${index + 1}. ID: ${user.id}, Username: ${user.username}, Name: ${user.name}, Role: ${user.role}`);
      });
    } else {
      console.log('\n❌ No hay usuarios registrados en la tabla');
    }
    
    await db.close();
  } catch (error) {
    console.error('❌ Error al consultar la base de datos:', error);
  }
}

checkUsers();
