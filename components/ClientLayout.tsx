'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AlertProvider } from "../context";

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AlertProvider>
          {children}
        </AlertProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
