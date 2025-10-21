import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../contexts/ThemeContext";
import { ThemeToggle } from "../components/ThemeToggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--typography-font-family-primary",
});

export const metadata: Metadata = {
  title: "Design System Starter",
  description: "Minimal Todo example showcasing the shared UI library.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
