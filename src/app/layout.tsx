import type { Metadata } from 'next';
import './globals.css';
import {
  jetbrainsMono,
  firaCode,
  robotoMono,
  sourceCodePro,
  inconsolata,
} from '../fonts';

export const metadata: Metadata = {
  title: 'SnipCode Pro',
  description: 'Generate beautiful, shareable images from your code instantly.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="monokai" suppressHydrationWarning={true}>
      <body
        className={`antialiased min-h-screen flex flex-col ${jetbrainsMono.variable} ${firaCode.variable} ${robotoMono.variable} ${sourceCodePro.variable} ${inconsolata.variable}`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
