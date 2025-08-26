'use client';

// Removed Material UI imports

export default function AdminPage() {
  return (
      <div>
        <h2>Panel de administración</h2>
        <p>Bienvenido al panel de administración.</p>
        <div style={{ marginTop: '16px', display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div>
            <h3>Gestión de Usuarios</h3>
            <p>Administrar usuarios del sistema</p>
          </div>
          <div>
            <h3>Configuración</h3>
            <p>Configurar parámetros del sistema</p>
          </div>
          <div>
            <h3>Reportes</h3>
            <p>Ver reportes y estadísticas</p>
          </div>
        </div>
      </div>
  );
}
