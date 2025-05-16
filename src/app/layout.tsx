import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Canarian Barber",
  description: "La vida se ve mejor después de un corte de pelo.",
  icons: {
    icon: "/images/logo_sm.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <footer className="text-center text-xs text-muted-foreground pb-4">
          © {new Date().getFullYear()} Canarian Barber. Todos los derechos reservados.
          <br />
          Hecho con pasión por &nbsp;
          <a
            href="https://ouariachi.com/?utm_source=canarianbarber&utm_medium=footer"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            @ouariachi
          </a>
        </footer>
      </body>
    </html>
  );
}
