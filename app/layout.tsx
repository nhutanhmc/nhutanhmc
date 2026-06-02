import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Xavia // Cybernetic Command Center',
  description: 'Interactive Cyberpunk Portfolio & Command Terminal of Anh Nguyen (Xavia) - Full-Stack & AI Engineer.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} min-h-screen selection:bg-cyber-cyan selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
