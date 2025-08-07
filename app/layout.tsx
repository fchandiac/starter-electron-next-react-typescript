import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
