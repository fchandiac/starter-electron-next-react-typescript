"use client";
import React, { createContext, useContext, ReactNode } from 'react';
import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react';

interface AuthContextType {
  user: any;
  login: (...args: any[]) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();

  const login = async (...args: any[]) => {
    await signIn(...args);
  };

  const logout = async () => {
    await signOut();
  };

  return (
    <SessionProvider>
      <AuthContext.Provider value={{ user: session?.user, login, logout }}>
        {children}
      </AuthContext.Provider>
    </SessionProvider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthContextProvider');
  return context;
}
