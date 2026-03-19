'use client';

import { useEffect, useState, useRef } from 'react';
import { clsx } from 'clsx';
import { Download, Sparkles } from 'lucide-react';
import { codeToHtml } from 'shiki';
import { useTheme } from '../hooks/useTheme';
import { useCodeFont } from '../hooks/useCodeFont';
import { CODE_FONTS } from '../fonts';
import { themes } from '../themes';

interface PreviewPanelProps {
  code: string;
  language: string;
  fileName: string;
  onExport: (element: HTMLElement | null) => Promise<void>;
  isExporting: boolean;
}

export function PreviewPanel({
  code,
  language,
  fileName,
  onExport,
  isExporting,
}: PreviewPanelProps) {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const { theme } = useTheme();
  const { codeFont } = useCodeFont();
  const activeFontVar =
    CODE_FONTS.find((f) => f.id === codeFont)?.variable ||
    'var(--font-jetbrains)';
  const previewRef = useRef<HTMLDivElement>(null);

  // We add a tiny artificial loading state to trigger the shimmer
  // when Shiki re-renders the syntax tree.
  const [isHighlighting, setIsHighlighting] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function highlight() {
      if (!code.trim()) {
        setHtmlContent('');
        return;
      }

      setIsHighlighting(true);
      const activeThemeConfig = themes.find((t) => t.id === theme);
      const shikiThemeStr = activeThemeConfig?.shikiTheme || 'monokai';

      try {
        const html = await codeToHtml(code, {
          lang: language,
          theme: shikiThemeStr,
        });

        if (mounted) {
          // Clean up standard Shiki background class so our CSS properties shine through
          const cleanedHtml = html.replace(/background-color: [^;]+;/, '');
          setHtmlContent(cleanedHtml);
          setIsHighlighting(false);
        }
      } catch (e) {
        console.error('Shiki highlight error:', e);
        if (mounted) setIsHighlighting(false);
      }
    }

    const t = setTimeout(() => {
      highlight();
    }, 150); // Debounce to prevent lag during fast typing

    return () => {
      mounted = false;
      clearTimeout(t);
    };
  }, [code, language, theme]);

  return (
    <div className="flex flex-col bg-[var(--surface-raised)] rounded-[var(--r-xl)] border border-[var(--border-dark)] shadow-[var(--shadow-panel)] overflow-hidden transition-all duration-300 h-full flex-1">
      <div className="flex items-center justify-between px-4 py-3 bg-[var(--surface-titlebar)] border-b border-[var(--border-dark)] shadow-[inset_0_1px_0_var(--border-light)] shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 opacity-80">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--tl-red)]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--tl-yellow)]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--tl-green)]"></div>
          </div>
          <span className="text-xs font-bold tracking-widest text-[var(--text-muted)] uppercase">
            Preview
          </span>
        </div>
      </div>

      {/* Snapshot Preview Area */}
      <div className="relative flex-1 flex flex-col items-center justify-center p-6 lg:p-8 bg-[var(--bg-body)] bg-[var(--bg-noise)] min-h-[300px] overflow-auto">
        {/* Shimmer Overlay */}
        {(isHighlighting || isExporting) && (
          <div className="absolute inset-8 rounded-[var(--r-lg)] overflow-hidden z-20 pointer-events-none transition-opacity duration-300">
            <div className="w-full h-full bg-gradient-to-r from-[var(--surface-inset)] via-[var(--surface-flat)] to-[var(--surface-inset)] bg-[length:300%_100%] animate-[shimmerSweep_1.5s_ease-in-out_infinite] opacity-60"></div>
          </div>
        )}

        {/* Empty State */}
        {!code.trim() && (
          <div className="flex flex-col items-center gap-4 text-[var(--text-muted)] opcacity-60 z-10 transition-opacity">
            <Sparkles size={48} className="opacity-30" />
            <p className="text-sm font-medium text-center">
              Type or paste code to generate a snapshot.
            </p>
          </div>
        )}

        {/* The Exportable Target */}
        {code.trim() && (
          <div
            ref={previewRef}
            // Tailwind + dynamic custom properties
            className="rounded-[var(--r-xl)] p-8 max-w-full isolate"
            style={{
              // Add a soft outer padding area matching the theme bg for the PNG export box
              background: 'var(--surface-flat)',
            }}
          >
            {/* Inner Mac Window */}
            <div className="rounded-[var(--r-lg)] border border-[var(--border-editor)] shadow-[0_20px_40px_rgba(0,0,0,0.3),_inset_0_1px_0_rgba(255,255,255,0.1)] bg-[var(--surface-editor)] overflow-hidden flex flex-col">
              {/* Window Header */}
              <div className="flex items-center px-4 py-3 bg-black/10 border-b border-black/20 relative">
                <div className="flex gap-2 relative z-10">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                </div>
                {/* Filename tab centered */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-[11px] font-mono text-[var(--text-secondary)] bg-black/10 px-3 py-1 rounded shadow-inner border border-black/5">
                    {fileName}
                  </span>
                </div>
              </div>

              {/* Shiki Rendered Code */}
              <div
                className="p-6 text-[15px] leading-relaxed overflow-auto [&>pre]:!bg-transparent [&>pre]:!m-0 max-w-[800px]"
                style={{ fontFamily: activeFontVar }}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-center p-4 lg:p-5 bg-[var(--surface-flat)] border-t border-[var(--border-dark)] shadow-[inset_0_1px_0_var(--border-light)] shrink-0">
        <button
          onClick={() => onExport(previewRef.current)}
          disabled={!code.trim() || isExporting || isHighlighting}
          style={{ backgroundColor: 'var(--accent)' }}
          className={clsx(
            'relative group inline-flex items-center justify-center gap-2 px-8 py-3 rounded-[var(--r-sm)] border-none text-white font-medium text-sm tracking-wide transition-all duration-200 select-none',
            'shadow-[var(--shadow-btn)]',
            'hover:brightness-110 hover:-translate-y-[1px] hover:shadow-[var(--shadow-btn),0_0_20px_var(--accent-glow)]',
            'active:translate-y-[1px] active:shadow-[var(--shadow-btn-pressed)]',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-[var(--shadow-btn-pressed)] disabled:filter-none'
          )}
        >
          {/* Top Sheen */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-[var(--r-sm)] pointer-events-none"></div>

          {isExporting ? (
            <Sparkles size={18} className="animate-spin" />
          ) : (
            <Download size={18} />
          )}
          <span>{isExporting ? 'Exporting...' : 'Export High-Res PNG'}</span>
        </button>
      </div>
    </div>
  );
}
