import type { TerminalData } from "~/types";

const terminal: TerminalData[] = [
  {
    id: "about", title: "about", type: "folder", children: [
      { id: "about-me", title: "intro.txt", type: "file", content: <div className="py-1">Hi, this is Kavya — an AI/ML engineer and final-year engineering student who enjoys building intelligent products and obsessing over the details.</div> },
      { id: "about-interests", title: "interests.txt", type: "file", content: "AI/ML / LLMs / Agentic AI / Product Engineering / Creative Frontend" },
      { id: "about-who-cares", title: "who-cares.txt", type: "file", content: "I like building things that feel both technically thoughtful and genuinely delightful to use." },
      { id: "about-contact", title: "contact.txt", type: "file", content: (
        <ul className="list-disc ml-6">
          <li>Email: <a className="text-blue-300" href="mailto:venkatakavya1100@gmail.com" target="_blank" rel="noreferrer">venkatakavya1100@gmail.com</a></li>
          <li>GitHub: <a className="text-blue-300" href="https://github.com/venkata-kavya" target="_blank" rel="noreferrer">@venkata-kavya</a></li>
          <li>Portfolio: <a className="text-blue-300" href="https://kavyabuilds.vercel.app/" target="_blank" rel="noreferrer">kavyabuilds.vercel.app</a></li>
        </ul>
      ) }
    ]
  },
  {
    id: "about-dream", title: "my-dream.cpp", type: "file", content: (
      <div className="py-1">
        <div><span className="text-yellow-400">while</span>(<span className="text-blue-400">building</span>) <span>{"{"}</span></div>
        <div><span className="text-blue-400 ml-9">ideas</span><span className="text-yellow-400">++</span>;</div>
        <div><span>{"}"}</span></div>
      </div>
    )
  }
];

export default terminal;
