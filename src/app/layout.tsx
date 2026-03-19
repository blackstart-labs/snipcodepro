import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Code Snapshot',
  description: 'Generate beautiful, shareable images from your code instantly.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="monokai" suppressHydrationWarning={true}>
      <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
