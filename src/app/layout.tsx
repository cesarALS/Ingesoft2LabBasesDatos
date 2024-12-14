import React from "react";
import "@/styles/globals.css"; // Import the global CSS file

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="bg-gray-100">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
