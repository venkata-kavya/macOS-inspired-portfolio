import React from "react";

export default function VSCode() {
  return (
    <div
      className="flex h-full w-full overflow-hidden bg-[#1e1e1e] text-white"
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Activity Bar */}
      <aside className="flex w-[52px] shrink-0 flex-col items-center border-r border-[#2b2b2b] bg-[#181818]">
        <div className="flex h-[52px] w-full items-center justify-center border-b border-[#2b2b2b] text-[#cccccc]">
          <span className="text-xl">▣</span>
        </div>

        <div className="flex flex-col items-center gap-6 py-5 text-xl text-[#858585]">
          <button className="text-[#ffffff]">▤</button>
          <button>⌕</button>
          <button>⑂</button>
          <button>▣</button>
          <button>♙</button>
        </div>

        <div className="mt-auto flex flex-col items-center gap-5 pb-5 text-lg text-[#858585]">
          <button>⚙</button>
        </div>
      </aside>

      {/* Explorer */}
      <aside className="w-[210px] shrink-0 border-r border-[#2b2b2b] bg-[#181818]">
        <div className="flex h-[42px] items-center px-4 text-[11px] font-medium uppercase tracking-wide text-[#bbbbbb]">
          Explorer
        </div>

        <div className="px-2">
          <div className="flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-[#cccccc]">
            <span>⌄</span>
            <span>KAVYA-PORTFOLIO</span>
          </div>

          <div className="ml-3 mt-1 space-y-0.5 text-[12px]">
            <div className="flex items-center gap-2 rounded px-2 py-1 text-[#cccccc]">
              <span className="text-[#e5c07b]">◫</span>
              <span>src</span>
            </div>

            <div className="flex items-center gap-2 rounded bg-[#37373d] px-2 py-1 text-white">
              <span className="text-[#61dafb]">⚛</span>
              <span>App.tsx</span>
            </div>

            <div className="flex items-center gap-2 px-2 py-1 text-[#cccccc]">
              <span className="text-[#519aba]">◇</span>
              <span>index.tsx</span>
            </div>

            <div className="flex items-center gap-2 px-2 py-1 text-[#cccccc]">
              <span className="text-[#4ec9b0]">{}</span>
              <span>package.json</span>
            </div>

            <div className="flex items-center gap-2 px-2 py-1 text-[#cccccc]">
              <span className="text-[#cbcb41]">◆</span>
              <span>README.md</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Editor */}
      <main className="flex min-w-0 flex-1 flex-col bg-[#1e1e1e]">
        {/* Tabs */}
        <div className="flex h-[42px] shrink-0 border-b border-[#2b2b2b] bg-[#181818]">
          <div className="flex items-center gap-2 border-r border-[#2b2b2b] bg-[#1e1e1e] px-4 text-[12px] text-[#ffffff]">
            <span className="text-[#61dafb]">⚛</span>
            <span>App.tsx</span>
            <span className="ml-3 text-[#858585]">×</span>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex h-[30px] shrink-0 items-center border-b border-[#2b2b2b] px-4 text-[11px] text-[#858585]">
          src &nbsp;›&nbsp; App.tsx
        </div>

        {/* Code */}
        <div className="min-h-0 flex-1 overflow-auto font-mono text-[13px] leading-[22px]">
          <div className="flex min-w-max">
            {/* Line numbers */}
            <div className="select-none px-4 text-right text-[#5a5a5a]">
              {Array.from({ length: 22 }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Code */}
            <pre className="m-0 pr-10 text-[#d4d4d4]">
              <code>
                <span className="text-[#c586c0]">import</span>{" "}
                <span className="text-[#4ec9b0]">React</span>{" "}
                <span className="text-[#c586c0]">from</span>{" "}
                <span className="text-[#ce9178]">'react'</span>;{"\n\n"}
                <span className="text-[#c586c0]">
                  export default function
                </span>{" "}
                <span className="text-[#dcdcaa]">App</span>() {"{"}
                {"\n"}
                {"  "}
                <span className="text-[#c586c0]">return</span> ({"\n"}
                {"    "}&lt;
                <span className="text-[#4ec9b0]">main</span>
                {"\n"}
                {"      "}
                <span className="text-[#9cdcfe]">className</span>=
                <span className="text-[#ce9178]">"portfolio"</span>
                {"\n"}
                {"    "}&gt;
                {"\n"}
                {"      "}&lt;
                <span className="text-[#4ec9b0]">Hero</span> /&gt;
                {"\n"}
                {"      "}&lt;
                <span className="text-[#4ec9b0]">Projects</span> /&gt;
                {"\n"}
                {"      "}&lt;
                <span className="text-[#4ec9b0]">Experience</span> /&gt;
                {"\n"}
                {"      "}&lt;
                <span className="text-[#4ec9b0]">Contact</span> /&gt;
                {"\n"}
                {"    "}&lt;/
                <span className="text-[#4ec9b0]">main</span>&gt;
                {"\n"}
                {"  "});
                {"\n"}
                {"}"}
                {"\n\n"}
                <span className="text-[#6a9955]">
                  // Building intelligent systems.
                </span>
                {"\n"}
                <span className="text-[#6a9955]">
                  // Creating things that feel impossible.
                </span>
              </code>
            </pre>
          </div>
        </div>

        {/* Status Bar */}
        <footer className="flex h-[22px] shrink-0 items-center justify-between bg-[#007acc] px-3 text-[10px] text-white">
          <div className="flex items-center gap-4">
            <span>⑂ main</span>
            <span>✓ 0</span>
            <span>⚠ 0</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Ln 1, Col 1</span>
            <span>Spaces: 2</span>
            <span>UTF-8</span>
            <span>TypeScript React</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
