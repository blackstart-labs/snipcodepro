import { ThemeSwitcher } from './ThemeSwitcher';
import { Camera } from 'lucide-react';

interface TitleBarProps {
  projectName: string;
  setProjectName: (name: string) => void;
}

export function TitleBar({ projectName, setProjectName }: TitleBarProps) {
  return (
    <header className="sticky top-0 z-50 h-[60px] flex items-center justify-between px-6 bg-[var(--surface-titlebar)] border-b border-[var(--border-dark)] backdrop-blur-md shadow-[0_1px_0_var(--border-light)_inset,0_2px_10px_rgba(0,0,0,0.1)] transition-colors duration-300">
      {/* macOS Traffic Lights + Title */}
      <div className="flex items-center gap-6">
        <div className="flex gap-2 relative group cursor-default">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1),0_1px_3px_rgba(255,95,87,0.3)]"></div>
          <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1),0_1px_3px_rgba(254,188,46,0.3)]"></div>
          <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1),0_1px_3px_rgba(40,200,64,0.3)]"></div>
        </div>

        <div className="flex items-center gap-2 font-semibold text-sm tracking-wide text-[var(--text-secondary)] pointer-events-none select-none">
          <Camera size={16} className="opacity-80" />
          SnipCode Pro
        </div>
      </div>

      {/* Center: Project Name Input */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project Name"
          className="bg-[var(--surface-inset)] border border-[var(--border-dark)] shadow-[var(--shadow-inset)] text-[var(--text-primary)] text-sm font-medium px-4 py-1.5 rounded-lg w-48 text-center focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all placeholder:text-[var(--text-muted)]"
        />
      </div>

      {/* Right: Theme Switcher */}
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
      </div>
    </header>
  );
}
