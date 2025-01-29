import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reddit Clone",
  description: "Reddit Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased dark min-h-svh">
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
