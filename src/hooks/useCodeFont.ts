'use client';

import { useState, useEffect } from 'react';
import type { CodeFont } from '../fonts';

export function useCodeFont() {
  const [codeFont, setCodeFont] = useState<CodeFont>('jetbrains');

  useEffect(() => {
    try {
      const savedFont = localStorage.getItem(
        'snipcode-font'
      ) as CodeFont | null;
      if (savedFont) {
        setCodeFont(savedFont);
      }
    } catch (err) {
      console.error('Error reading font from localStorage:', err);
    }
  }, []);

  const changeCodeFont = (fontId: CodeFont) => {
    try {
      localStorage.setItem('snipcode-font', fontId);
      setCodeFont(fontId);
    } catch (err) {
      console.error('Error saving font to localStorage:', err);
    }
  };

  return { codeFont, setCodeFont: changeCodeFont };
}
