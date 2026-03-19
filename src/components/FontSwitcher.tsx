'use client';

import { useState, useRef, useEffect } from 'react';
import { useCodeFont } from '../hooks/useCodeFont';
import { CODE_FONTS } from '../fonts';
import { Type, ChevronDown } from 'lucide-react';

export function FontSwitcher() {
  const { codeFont, setCodeFont } = useCodeFont();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeFontName =
    CODE_FONTS.find((f) => f.id === codeFont)?.name || 'Default';

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-[var(--r-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5 transition-all outline-none"
        title="Change Font Family"
      >
        <Type size={14} />
        <span className="text-xs font-semibold">{activeFontName}</span>
        <ChevronDown size={14} className="opacity-70" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-44 bg-[var(--surface-menu)] border border-[var(--border-dark)] shadow-xl rounded-[var(--r-base)] overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-200">
          <div className="py-1">
            {CODE_FONTS.map((fontOption) => (
              <button
                key={fontOption.id}
                onClick={() => {
                  setCodeFont(fontOption.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors
                  ${codeFont === fontOption.id ? 'bg-[var(--accent)]/10 text-[var(--accent)] font-medium' : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]'}
                `}
                style={{ fontFamily: fontOption.variable }}
              >
                {fontOption.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
