'use client';

import { Typography, Container, Box, Card, CardContent } from '@mui/material';

export default function AdminPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Panel de Administración
        </Typography>
        
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Bienvenido al Panel Admin
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Has iniciado sesión exitosamente como administrador.
            </Typography>
          </CardContent>
        </Card>
        
        <Box sx={{ mt: 4, display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                Gestión de Usuarios
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Administrar usuarios del sistema
              </Typography>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                Configuración
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Configurar parámetros del sistema
              </Typography>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" component="h3" gutterBottom>
                Reportes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ver reportes y estadísticas
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
