import type { Metadata } from "next";
import ClientLayout from "./components/ClientLayout";
import { LogoProvider } from "./context/LogoContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Starter-Electron-Next-React-Typescript",
  description: "Starter app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LogoProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </LogoProvider>
      </body>
    </html>
  );
}
