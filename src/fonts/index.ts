import {
  JetBrains_Mono,
  Fira_Code,
  Roboto_Mono,
  Source_Code_Pro,
  Inconsolata,
} from 'next/font/google';

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

export const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira',
});

export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code',
});

export const inconsolata = Inconsolata({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inconsolata',
});

export const CODE_FONTS = [
  {
    id: 'jetbrains',
    name: 'JetBrains Mono',
    variable: 'var(--font-jetbrains)',
    className: jetbrainsMono.variable,
  },
  {
    id: 'fira',
    name: 'Fira Code',
    variable: 'var(--font-fira)',
    className: firaCode.variable,
  },
  {
    id: 'roboto',
    name: 'Roboto Mono',
    variable: 'var(--font-roboto)',
    className: robotoMono.variable,
  },
  {
    id: 'sourcecode',
    name: 'Source Code Pro',
    variable: 'var(--font-source-code)',
    className: sourceCodePro.variable,
  },
  {
    id: 'inconsolata',
    name: 'Inconsolata',
    variable: 'var(--font-inconsolata)',
    className: inconsolata.variable,
  },
] as const;

export type CodeFont = (typeof CODE_FONTS)[number]['id'];
