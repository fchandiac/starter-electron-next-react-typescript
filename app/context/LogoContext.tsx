'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LogoContextType {
  logoSrc?: string;
  setLogoSrc: (src?: string) => void;
}

const LogoContext = createContext<LogoContextType | undefined>(undefined);

export const LogoProvider = ({ children }: { children: ReactNode }) => {
  const [logoSrc, setLogoSrc] = useState<string | undefined>(undefined);
  return (
    <LogoContext.Provider value={{ logoSrc, setLogoSrc }}>
      {children}
    </LogoContext.Provider>
  );
};

export function useLogo() {
  const context = useContext(LogoContext);
  if (!context) throw new Error('useLogo must be used within LogoProvider');
  return context;
}
