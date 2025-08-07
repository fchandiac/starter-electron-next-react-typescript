import type { Metadata } from "next";
import ClientLayout from "../components/ClientLayout";

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
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
