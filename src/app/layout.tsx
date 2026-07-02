import type { Metadata } from "next";
import "./globals.css";
import PWARegister from "@/components/PWARegister";

export const metadata: Metadata = {
  title: "OntwerpPrikkel",
  description:
    "Nederlandstalige generator voor verrassende en bruikbare ontwerpuitdagingen.",
  applicationName: "OntwerpPrikkel",
  appleWebApp: {
    capable: true,
    title: "OntwerpPrikkel",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    apple: "/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="h-full antialiased">
      <body className="min-h-full">
        {children}
        <PWARegister />
      </body>
    </html>
  );
}
