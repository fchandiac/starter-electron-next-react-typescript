'use client';
import React, { createContext, ReactNode, useContext } from 'react';
import { useState, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";

// Definir tipos localmente para evitar problemas de importación
type AlertType = {
  message: string;
  severity: "success" | "error" | "info" | "warning";
};

// Hook local en el contexto para evitar problemas de importación
const useAlert = () => {
  const [alert, setAlert] = useState<AlertType | null>(null);
  const [open, setOpen] = useState(false);

  const showAlert = useCallback(
    (message: string, severity: AlertType["severity"]) => {
      setAlert({ message, severity });
      setOpen(true);
    },
    []
  );

  const closeAlert = useCallback(() => {
    setOpen(false);
  }, []);

  const AlertComponent = alert ? (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={closeAlert}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={closeAlert}
        severity={alert.severity}
        sx={{ width: "100%" }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  ) : null;

  return { showAlert, AlertComponent };
};

// Tipo del contexto
type AlertContextType = {
  showAlert: (message: string, severity: "success" | "error" | "info" | "warning") => void;
  AlertComponent: React.JSX.Element | null;
};

// Crear el contexto
export const AlertContext = createContext<AlertContextType | undefined>(
  undefined,
);

// Tipo de las props del Provider
type AlertProviderProps = {
  children: ReactNode;
};

// Crear el Provider
export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const { showAlert, AlertComponent } = useAlert();

  return (
    <AlertContext.Provider value={{ showAlert, AlertComponent }}>
      {children}
      {AlertComponent}
    </AlertContext.Provider>
  );
};

// Hook para consumir el contexto de forma segura
export const useAlertContext = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlertContext debe usarse dentro de AlertProvider');
  }
  return context;
};
