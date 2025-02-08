import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import "@fontsource-variable/playfair-display/index.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair"
});

export const metadata: Metadata = {
  title: "mental (ye)down",
  description: "A daily collection of 30 Ye tweets",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} antialiased bg-white text-black`}
      >
        {children}
      </body>
    </html>
  );
}
