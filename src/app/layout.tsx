import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Werewolf Papers",
  description: "Generate papers for werewolf players",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${inter.className} bg-purple-700 text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
