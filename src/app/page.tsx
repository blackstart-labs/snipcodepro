'use client';

import { useState } from 'react';
import { TitleBar } from '../components/TitleBar';
import { EditorPanel } from '../components/EditorPanel';
import { PreviewPanel } from '../components/PreviewPanel';
import { useSnapshot } from '../hooks/useSnapshot';
import { LANGUAGES } from '../components/EditorPanel';

const INITIAL_CODE = `// Paste your code here

int main() {
    printf("Hello, Code Snapshot!\\n");
    return 0;
}`;

export default function Home() {
  const [code, setCode] = useState(INITIAL_CODE);
  const [language, setLanguage] = useState('cpp');
  const [projectName, setProjectName] = useState('snippet');

  const { generate, isGenerating, error } = useSnapshot();

  // Determine file extension
  const matchedLang = LANGUAGES.find((l) => l.id === language);
  const ext = matchedLang ? matchedLang.ext : 'txt';
  const fileName = `${projectName.trim() || 'snippet'}.${ext}`;

  return (
    <>
      <TitleBar projectName={projectName} setProjectName={setProjectName} />

      <main className="flex-1 flex flex-col lg:flex-row gap-6 p-4 lg:p-6 max-w-[1600px] mx-auto w-full items-stretch">
        {/* Left Side: Editor */}
        <div className="flex-1 w-full min-w-0 flex flex-col">
          <EditorPanel
            code={code}
            setCode={setCode}
            language={language}
            setLanguage={setLanguage}
            fileName={fileName}
          />
        </div>

        {/* Right Side: Preview */}
        <div className="flex-1 w-full min-w-0 flex flex-col">
          <PreviewPanel
            code={code}
            language={language}
            fileName={fileName}
            isExporting={isGenerating}
            onExport={(el) => generate(el, projectName)}
          />

          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm font-medium text-center">
              {error}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
