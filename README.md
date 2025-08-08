
# AppName

> Aplicación de escritorio profesional multiplataforma construida con Electron, Next.js, React y TypeScript.

## Características principales

- **Splash screen** personalizado y elegante.
- **Login seguro** con autenticación de usuarios y admins (NextAuth, bcryptjs, SQLite).
- **UI moderna** con Material-UI (MUI) y tema personalizado.
- **Sistema global de alertas** vía Context API.
- **Menú nativo** personalizado con nombre de la app y diálogo "Acerca de..." con icono e info de la app.
- **Empaquetado multiplataforma** listo para macOS (.dmg) y Windows (.exe) usando electron-builder.
- **Soporte para iconos de app** en todas las plataformas.

## Tecnologías

- Electron 37+
- Next.js 15+
- React 19+
- TypeScript 5+
- Material-UI 7+
- electron-builder
- SQLite3

## Estructura del proyecto

- `/main.ts` — Proceso principal de Electron, splash, menú, empaquetado.
- `/preload.ts` — Preload para comunicación segura.
- `/app/` — App Next.js (páginas, contexto, tema MUI, API auth).
- `/assets/` — Splash, iconos, imágenes.
- `/lib/db.ts` — Configuración y acceso a la base de datos SQLite.

## Scripts principales

- `npm run dev` — Desarrollo (Next.js + Electron).
- `npm run build` — Build Next.js + Electron.
- `npm run build:mac` — Empaquetar para macOS (.dmg).
- `npm run build:win` — Empaquetar para Windows (.exe).

## Empaquetado y distribución

El empaquetado usa electron-builder y toma el nombre de la app desde `productName` en `package.json`.

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Para desarrollo:
   ```bash
   npm run dev
   ```
3. Para empaquetar:
   ```bash
   npm run build:mac   # macOS
   npm run build:win   # Windows
   ```

Los instaladores se generan en la carpeta `dist/`.

---
Desarrollado por Felipe Chandía Castillo — 2025
