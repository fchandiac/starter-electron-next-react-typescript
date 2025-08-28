import { app, BrowserWindow, Menu, dialog } from 'electron';
import fs from 'fs';
import path from 'path';

// Configurar el icono de la aplicación según la plataforma
const getAppIcon = () => {
  const iconsPath = path.join(__dirname, '..', 'assets', 'icons');
  
  // En macOS, Electron puede usar .icns, pero PNG también funciona
  // En Windows, se recomienda .ico, pero PNG funciona
  // En Linux, PNG es estándar
  if (process.platform === 'darwin') {
    // macOS - usar icono grande para mejor calidad
    return path.join(iconsPath, 'icon-512x512.png');
  } else if (process.platform === 'win32') {
    // Windows - usar tamaño mediano
    return path.join(iconsPath, 'icon-256x256.png');
  } else {
    // Linux y otros - usar tamaño estándar
    return path.join(iconsPath, 'icon-256x256.png');
  }
};

// Función para detectar el puerto de Next.js
async function getNextPort(): Promise<number> {
  const net = require('net');
  
  // Lista de puertos comunes que Next.js puede usar - ampliado hasta 3050
  const ports = [];
  for (let i = 3000; i <= 3050; i++) {
    ports.push(i);
  }
  
  for (const port of ports) {
    try {
      const isPortOccupied = await new Promise<boolean>((resolve) => {
        const server = net.createServer();
        server.listen(port, () => {
          server.close();
          resolve(false); // Puerto libre
        });
        server.on('error', () => {
          resolve(true); // Puerto ocupado
        });
      });
      
      if (isPortOccupied) {
        // Verificar si es Next.js haciendo una petición HTTP
        try {
          const response = await fetch(`http://localhost:${port}`);
          if (response.ok) {
            console.log(`Next.js encontrado en puerto ${port}`);
            return port;
          }
        } catch (error) {
          // No es Next.js, continuar buscando
        }
      }
    } catch (error) {
      // Error al verificar puerto, continuar
    }
  }
  
  // Si no encuentra Next.js, usar puerto por defecto
  console.log('No se encontró Next.js activo en rango 3000-3050, usando puerto 3000 por defecto');
  return 3000;
}

// Función para esperar hasta que Next.js esté completamente listo
async function waitForNextReady(port: number): Promise<boolean> {
  const maxRetries = 60; // Máximo 60 intentos (2 minutos)
  let retries = 0;
  
  console.log(`Esperando que Next.js esté listo en puerto ${port}...`);
  
  while (retries < maxRetries) {
    try {
      // Crear un timeout manual para fetch
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(`http://localhost:${port}`, {
        method: 'GET',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        console.log(`✅ Next.js está listo en puerto ${port}`);
        return true;
      }
    } catch (error) {
      // Next.js aún no está listo
    }
    
    retries++;
    console.log(`⏳ Intento ${retries}/${maxRetries} - Next.js aún no está listo...`);
    
    // Esperar 2 segundos antes del siguiente intento
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log(`❌ Timeout: Next.js no estuvo listo después de ${maxRetries} intentos`);
  return false;
}

async function createWindows() {
  // Ruta del icono usando la función que detecta la plataforma
  const iconPath = getAppIcon();
  
  // Ventana splash
  const splash = new BrowserWindow({
    width: 640,
    height: 360,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    icon: iconPath,
  });
  
  // Ruta correcta al splash desde la carpeta dist
  const splashPath = path.join(__dirname, '..', 'assets', 'splash.html');
  splash.loadFile(splashPath);

  // Detectar puerto de Next.js
  const nextPort = await getNextPort();

  // Crear ventana principal pero mantenerla oculta
  const mainWin = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false, // No mostrar la ventana principal inicialmente
    opacity: 0, // Iniciar completamente transparente
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    }
  });
  
  // Conectar al servidor Next.js usando el puerto detectado
  const nextUrl = `http://localhost:${nextPort}`;
  console.log(`Cargando aplicación desde: ${nextUrl}`);
  mainWin.loadURL(nextUrl);

  // NUEVA LÓGICA: Esperar hasta que Next.js esté realmente listo
  const isNextReady = await waitForNextReady(nextPort);
  
  if (!isNextReady) {
    console.log('⚠️ Next.js no está listo, pero continuando con la transición...');
  }

  // Iniciar el fade-out del splash después del tiempo especificado
  setTimeout(() => {
    // Activar el fade-out del splash ejecutando JavaScript en la ventana
    splash.webContents.executeJavaScript(`
      document.body.classList.add('fade-out');
    `);
    
    // Esperar a que termine la animación CSS (1.5s) antes de cerrar la ventana
    setTimeout(() => {
      splash.close();
      
      // Esperar 100ms antes de mostrar la ventana principal (pausa entre ventanas)
      setTimeout(() => {
        mainWin.show();
        mainWin.focus();
        
        // Efecto fade-in más lento de la ventana principal
        let opacity = 0;
        const fadeIn = setInterval(() => {
          opacity += 0.0333; // Ajustado para 1.5s total (1/0.0333*50ms ≈ 1.5s)
          mainWin.setOpacity(opacity);
          
          if (opacity >= 1) {
            clearInterval(fadeIn);
            mainWin.setOpacity(1); // Asegurar que esté completamente visible
          }
        }, 50); // 1.5 segundos total de fade-in
        
  }, 300); // Pausa de 30ms entre el cierre del splash y la aparición de la ventana principal
      
    }, 1500); // Esperar 1.5s para que termine la animación CSS fade-out
    
  }, 3500); // 3.5 segundos después de que Next.js esté listo (1.5s + 2s adicionales)
}


// Leer info de package.json
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
const appName = pkg.productName || pkg.name || 'AppName';
const appVersion = pkg.version || '';
const appAuthor = (pkg.author && (typeof pkg.author === 'string' ? pkg.author : pkg.author.name)) || '';
const appCopyright = pkg.copyright || '';
const appIcon = path.join(__dirname, '..', 'assets', 'icons', 'icon-256x256.png');

const customMenu = Menu.buildFromTemplate([
  {
    label: appName,
    submenu: [
      {
        label: 'Acerca de...'
        ,click: () => {
          dialog.showMessageBox({
            title: `Acerca de ${appName}`,
            message: `${appName} v${appVersion}`,
            detail: `${appAuthor}\n${appCopyright}`,
            icon: appIcon
          });
        }
      },
      { type: 'separator' },
      { role: 'quit', label: 'Salir' }
    ]
  },
  {
    label: 'Edición',
    submenu: [
      { role: 'undo', label: 'Deshacer' },
      { role: 'redo', label: 'Rehacer' },
      { type: 'separator' },
      { role: 'cut', label: 'Cortar' },
      { role: 'copy', label: 'Copiar' },
      { role: 'paste', label: 'Pegar' },
      { role: 'selectAll', label: 'Seleccionar todo' }
    ]
  }
]);
Menu.setApplicationMenu(customMenu);

app.whenReady().then(() => {
  // Configurar el icono de la aplicación en el dock/taskbar
  if (process.platform === 'darwin' && app.dock) {
    // En macOS, establecer el icono del dock
    app.dock.setIcon(getAppIcon());
  }
  createWindows();
});
