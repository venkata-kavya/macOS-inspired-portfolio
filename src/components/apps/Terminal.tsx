import React, { useEffect, useMemo, useRef, useState } from "react";

type Entry = {
  name: string;
  type: "file" | "dir";
  content?: string;
};

type Line = {
  id: number;
  kind: "input" | "output" | "muted" | "success" | "error" | "accent" | "block";
  text?: string;
  node?: React.ReactNode;
  path?: string;
  command?: string;
};

const FILES: Record<string, Entry[]> = {
  "~": [
    { name: "about", type: "dir" },
    { name: "projects", type: "dir" },
    { name: "skills", type: "dir" },
    { name: "contact", type: "dir" },
    {
      name: "README.md",
      type: "file",
      content:
        "Kavya — AI/ML engineer, builder, and curious human.\n\nThis terminal is part portfolio, part playground.\nTry `help`, `neofetch`, or `sudo make-me-famous`.",
    },
    {
      name: ".secrets",
      type: "file",
      content:
        "Nice try.\n\nThere is nothing here except good engineering hygiene. 🔐",
    },
  ],

  "~/about": [
    {
      name: "me.txt",
      type: "file",
      content:
        "AI/ML engineer and builder.\nI like turning ambitious ideas into things people can actually use.\n\nCurrent obsession: agents, interfaces, neuroscience, and beautiful software.",
    },
    {
      name: "interests.txt",
      type: "file",
      content:
        "AI • neuroscience • product design • books • chess • creative coding • weird little experiments",
    },
  ],

  "~/projects": [
    { name: "KARTA", type: "dir" },
    { name: "AI-Resume-Analyzer", type: "dir" },
    {
      name: "README.md",
      type: "file",
      content:
        "Selected projects live here.\nTry `projects` for the portfolio view.",
    },
  ],

  "~/skills": [
    {
      name: "ai.txt",
      type: "file",
      content:
        "LLM APIs • RAG • embeddings • LangChain • LangGraph • MCP • agent orchestration",
    },
    {
      name: "engineering.txt",
      type: "file",
      content:
        "Python • Java • TypeScript • React • FastAPI • PostgreSQL • Docker • GitHub Actions",
    },
  ],

  "~/contact": [
    {
      name: "hello.txt",
      type: "file",
      content:
        "The fastest route is through the portfolio contact section.\n\nTip: try `open contact` or `mail kavya`.",
    },
  ],
};

const COMMANDS = [
  "help",
  "clear",
  "ls",
  "cd",
  "pwd",
  "cat",
  "whoami",
  "date",
  "echo",
  "about",
  "skills",
  "projects",
  "contact",
  "neofetch",
  "fortune",
  "coffee",
  "cowsay",
  "matrix",
  "history",
  "open",
  "mail",
  "sudo",
  "rm",
  "exit",
];

const FORTUNES = [
  "The best interface is the one that makes someone curious enough to click.",
  "Ship the weird prototype. Refine the beautiful one later.",
  "Your future self is going to be very glad you wrote that README.",
  "A bug is just an undocumented feature until production finds it.",
  "Somewhere between curiosity and obsession is a portfolio project.",
];

const COW = [
  "  ________________________________",
  " <  hello from Kavya's terminal  >",
  "  --------------------------------",
  "         \\   ^__^",
  "          \\  (oo)\\_______",
  "             (__)\\       )\\/\\",
  "                 ||----w |",
  "                 ||     ||",
];

const neon = {
  green: "#30d158",
  blue: "#64d2ff",
  purple: "#bf8cff",
  yellow: "#ffd60a",
  red: "#ff453a",
  text: "#f5f5f7",
  muted: "#8e8e93",
};

function normalizePath(path: string) {
  if (!path || path === "~") return "~";

  const parts = path.replace(/^~\/?/, "").split("/").filter(Boolean);

  const result: string[] = [];

  for (const part of parts) {
    if (part === ".") continue;

    if (part === "..") {
      result.pop();
    } else {
      result.push(part);
    }
  }

  return result.length ? `~/${result.join("/")}` : "~";
}

function getEntries(path: string) {
  return FILES[normalizePath(path)] ?? [];
}

function getFile(path: string, name: string) {
  return getEntries(path).find(
    (entry) => entry.name === name && entry.type === "file",
  );
}

function pathFor(path: string, target: string) {
  if (target === "~" || target.startsWith("~/")) {
    return normalizePath(target);
  }

  return normalizePath(path === "~" ? `~/${target}` : `${path}/${target}`);
}

function Prompt({ path }: { path: string }) {
  return (
    <span style={{ whiteSpace: "nowrap" }}>
      <span
        style={{
          color: neon.green,
          fontWeight: 700,
        }}
      >
        kavya
      </span>

      <span style={{ color: neon.muted }}>@</span>

      <span style={{ color: neon.blue }}>portfolio</span>

      <span style={{ color: neon.muted }}> {path} </span>

      <span
        style={{
          color: neon.yellow,
          fontWeight: 700,
        }}
      >
        %
      </span>
    </span>
  );
}

function Neofetch() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "150px 1fr",
        gap: 18,
        lineHeight: 1.7,
      }}
    >
      <pre
        style={{
          margin: 0,
          color: neon.blue,
          fontSize: 12,
          lineHeight: 1.35,
        }}
      >
        {`       .-'     '-'.
     .'  .-"""-.  '.
    /   /       \\   \\
   ;   |       |   ;
   |   |  macOS |   |
   ;   |         |   ;
    \\   \\       /   /
     '.  '-.__.-'  .'
       '-._____.-'`}
      </pre>

      <div>
        <div>
          <b style={{ color: neon.text }}>kavya@portfolio</b>
        </div>

        <div>
          <span style={{ color: neon.blue }}>OS</span> macOS-inspired portfolio
        </div>

        <div>
          <span style={{ color: neon.blue }}>Shell</span> zsh-ish / simulated
        </div>

        <div>
          <span style={{ color: neon.blue }}>Stack</span> React · TypeScript ·
          AI/ML
        </div>

        <div>
          <span style={{ color: neon.blue }}>Focus</span> agents · interfaces ·
          systems
        </div>

        <div>
          <span style={{ color: neon.blue }}>Status</span>{" "}
          <span style={{ color: neon.green }}>building</span>
        </div>
      </div>
    </div>
  );
}

export default function Terminal() {
  const [path, setPath] = useState("~");
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const [lines, setLines] = useState<Line[]>([
    {
      id: 1,
      kind: "muted",
      text: "Last login: today on ttys001",
    },
    {
      id: 2,
      kind: "success",
      text: "Welcome to Kavya's terminal.",
    },
    {
      id: 3,
      kind: "muted",
      text: "Type `help` to explore. Try `neofetch` if you're curious.",
    },
  ]);

  const [matrix, setMatrix] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const promptPath = useMemo(() => path, [path]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines, matrix]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const push = (line: Omit<Line, "id">) => {
    setLines((current) => [
      ...current,
      {
        ...line,
        id: Date.now() + Math.random(),
      },
    ]);
  };

  const run = (raw: string) => {
    const command = raw.trim();

    if (!command) {
      push({
        kind: "input",
        path: promptPath,
        command: "",
      });

      return;
    }

    push({
      kind: "input",
      path: promptPath,
      command,
    });

    setHistory((h) => [...h, command]);
    setHistoryIndex(-1);

    const [cmd, ...rest] = command.split(/\s+/);

    const args = rest.join(" ");
    const arg0 = rest[0];

    switch (cmd.toLowerCase()) {
      case "help":
        push({
          kind: "block",
          node: (
            <div style={{ lineHeight: 1.8 }}>
              <div
                style={{
                  color: neon.text,
                  fontWeight: 700,
                  marginBottom: 5,
                }}
              >
                Available commands
              </div>

              <div>
                <span style={{ color: neon.green }}>Navigation</span> · ls · cd
                · pwd · open
              </div>

              <div>
                <span style={{ color: neon.green }}>Portfolio</span> · about ·
                skills · projects · contact
              </div>

              <div>
                <span style={{ color: neon.green }}>Files</span> · cat · echo ·
                clear · history
              </div>

              <div>
                <span style={{ color: neon.green }}>Easter eggs</span> ·
                neofetch · fortune · coffee · cowsay · matrix · sudo
              </div>

              <div
                style={{
                  color: neon.muted,
                  marginTop: 7,
                }}
              >
                ↑ ↓ history · Tab autocomplete · ⌘K / Ctrl+K clear
              </div>
            </div>
          ),
        });

        break;

      case "clear":
        setLines([]);
        break;

      case "pwd":
        push({
          kind: "accent",
          text: `/Users/kavya/${path === "~" ? "" : path.slice(2)}`.replace(
            /\/$/,
            "",
          ),
        });
        break;

      case "ls": {
        const entries = getEntries(path);

        push({
          kind: "block",
          node: (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))",
                gap: "8px 16px",
              }}
            >
              {entries.map((entry) => (
                <span
                  key={entry.name}
                  style={{
                    color: entry.type === "dir" ? neon.blue : neon.text,
                  }}
                >
                  {entry.type === "dir" ? "▸ " : "  "}
                  {entry.name}
                </span>
              ))}
            </div>
          ),
        });

        break;
      }

      case "cd": {
        const target = arg0 ?? "~";
        const next = pathFor(path, target);

        if (FILES[next]) {
          setPath(next);
        } else {
          push({
            kind: "error",
            text: `cd: no such file or directory: ${target}`,
          });
        }

        break;
      }

      case "cat": {
        if (!arg0) {
          push({
            kind: "error",
            text: "cat: missing file operand",
          });

          break;
        }

        const file = getFile(path, arg0);

        if (!file) {
          push({
            kind: "error",
            text: `cat: ${arg0}: No such file or directory`,
          });
        } else {
          push({
            kind: "block",
            text: file.content,
          });
        }

        break;
      }

      case "whoami":
        push({
          kind: "accent",
          text: "kavya — builder / engineer / professional overthinker",
        });
        break;

      case "date":
        push({
          kind: "muted",
          text: new Date().toString(),
        });
        break;

      case "echo":
        push({
          kind: "block",
          text: args,
        });
        break;

      case "about":
        push({
          kind: "block",
          node: (
            <div>
              <div
                style={{
                  color: neon.blue,
                  fontWeight: 700,
                }}
              >
                KAVYA
              </div>

              <div style={{ marginTop: 5 }}>
                AI/ML engineer & builder who likes ambitious ideas, polished
                interfaces and systems that feel a little magical.
              </div>

              <div
                style={{
                  color: neon.muted,
                  marginTop: 6,
                }}
              >
                Try `cat about/me.txt` for the long version.
              </div>
            </div>
          ),
        });

        break;

      case "skills":
        push({
          kind: "block",
          text: "Python · Java · TypeScript · React · FastAPI · SQL · RAG · embeddings · LangChain · LangGraph · MCP · agents · vector search",
        });
        break;

      case "projects":
        push({
          kind: "block",
          node: (
            <div style={{ lineHeight: 1.8 }}>
              <div>
                <span style={{ color: neon.blue }}>01</span> KARTA — cognitive
                OS / neural thought mapping
              </div>

              <div>
                <span style={{ color: neon.blue }}>02</span> AI Resume Analyzer
                — intelligent resume feedback
              </div>

              <div>
                <span style={{ color: neon.blue }}>03</span> More experiments —
                currently compiling…
              </div>
            </div>
          ),
        });

        break;

      case "contact":
        push({
          kind: "block",
          text: "Open the Contact app from the desktop, or try `open contact`.",
        });
        break;

      case "open":
        if (arg0 === "contact") {
          push({
            kind: "success",
            text: "Opening contact… ✨",
          });
        } else {
          push({
            kind: "muted",
            text: `open: ${arg0 ?? "missing target"}`,
          });
        }

        break;

      case "neofetch":
        push({
          kind: "block",
          node: <Neofetch />,
        });
        break;

      case "fortune":
        push({
          kind: "accent",
          text: FORTUNES[Math.floor(Math.random() * FORTUNES.length)],
        });
        break;

      case "coffee":
        push({
          kind: "block",
          text: "☕ brewing…\n☕ brewing…\n☕ okay, now we can code.",
        });
        break;

      case "cowsay":
        push({
          kind: "block",
          text: COW.join("\n"),
        });
        break;

      case "matrix":
        setMatrix(true);

        push({
          kind: "success",
          text: "Wake up, Neo…",
        });

        window.setTimeout(() => setMatrix(false), 4200);
        break;

      case "history":
        push({
          kind: "block",
          text: history.length
            ? history
                .map((h, i) => `${String(i + 1).padStart(2, " ")}  ${h}`)
                .join("\n")
            : "No history yet.",
        });

        break;

      case "sudo":
        push({
          kind: "error",
          text: "kavya is not in the sudoers file. This incident will be reported to absolutely nobody. :)",
        });
        break;

      case "rm":
        if (
          args.includes("-rf") ||
          args.includes("/") ||
          args.includes("--no-preserve-root")
        ) {
          push({
            kind: "error",
            text: "rm: nice try. Portfolio files are protected by plot armor.",
          });
        } else {
          push({
            kind: "muted",
            text: `rm: cannot remove '${arg0 ?? ""}': Permission denied`,
          });
        }

        break;

      case "exit":
        push({
          kind: "accent",
          text: "You can't leave. The portfolio has unfinished business. ✦",
        });
        break;

      case "hello":
        push({
          kind: "success",
          text: "hello, human. 👋",
        });
        break;

      case "konami":
        push({
          kind: "accent",
          text: "↑ ↑ ↓ ↓ ← → ← → B A — developer mode unlocked (emotionally).",
        });
        break;

      default:
        push({
          kind: "error",
          text: `zsh: command not found: ${cmd}`,
        });
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      setLines([]);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();

      run(input);
      setInput("");

      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (!history.length) return;

      const next =
        historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);

      setHistoryIndex(next);
      setInput(history[next] ?? "");

      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (!history.length) return;

      const next =
        historyIndex < 0
          ? history.length
          : Math.min(history.length, historyIndex + 1);

      setHistoryIndex(next);
      setInput(history[next] ?? "");

      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();

      const partial = input.trim();

      if (!partial) return;

      const parts = partial.split(/\s+/);
      const prefix = parts[0];

      if (parts.length === 1) {
        const match = COMMANDS.find((cmd) => cmd.startsWith(prefix));

        if (match) {
          setInput(match);
        }
      } else if (parts.length === 2 && (prefix === "cd" || prefix === "cat")) {
        const candidates = getEntries(path).filter((entry) =>
          prefix === "cd" ? entry.type === "dir" : entry.type === "file",
        );

        const match = candidates.find((entry) =>
          entry.name.startsWith(parts[1]),
        );

        if (match) {
          setInput(`${prefix} ${match.name}`);
        }
      }
    }
  };

  return (
    <div
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        inputRef.current?.focus();
      }}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "rgba(18,18,20,.96)",
        color: neon.text,
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
        fontSize: 13,
        letterSpacing: "-0.01em",
      }}
    >
      <div
        style={{
          height: 34,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 13px",
          borderBottom: "1px solid rgba(255,255,255,.08)",
          background: "rgba(255,255,255,.035)",
          backdropFilter: "blur(18px)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            color: "#a1a1a6",
            fontSize: 11,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: neon.green,
              boxShadow: `0 0 8px ${neon.green}`,
            }}
          />

          <span>zsh</span>

          <span style={{ color: "#5f5f64" }}>—</span>

          <span>kavya@portfolio</span>
        </div>

        <div
          style={{
            color: "#636366",
            fontSize: 10,
          }}
        >
          interactive shell · {path}
        </div>
      </div>

      <div
        ref={scrollRef}
        style={{
          height: "calc(100% - 34px)",
          overflowY: "auto",
          padding: "16px 18px 24px",
          scrollbarWidth: "thin",
          scrollbarColor: "#48484a transparent",
        }}
      >
        {matrix && (
          <div
            style={{
              position: "absolute",
              inset: 34,
              zIndex: 5,
              pointerEvents: "none",
              overflow: "hidden",
              background: "rgba(0,0,0,.84)",
              color: neon.green,
              opacity: 0.9,
              fontFamily: "monospace",
              fontSize: 11,
              lineHeight: 1.1,
              padding: 12,
            }}
          >
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i}>
                {Array.from({ length: 105 }).map((__, j) => (
                  <span key={j}>{Math.random() > 0.5 ? "1" : "0"}</span>
                ))}
              </div>
            ))}
          </div>
        )}

        {lines.map((line) => (
          <div
            key={line.id}
            style={{
              marginBottom: 8,
              lineHeight: 1.55,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {line.kind === "input" ? (
              <>
                <Prompt path={line.path ?? "~"} />

                <span
                  style={{
                    marginLeft: 8,
                    color: neon.text,
                  }}
                >
                  {line.command}
                </span>
              </>
            ) : null}

            {line.kind === "muted" ? (
              <span style={{ color: neon.muted }}>{line.text}</span>
            ) : null}

            {line.kind === "success" ? (
              <span style={{ color: neon.green }}>{line.text}</span>
            ) : null}

            {line.kind === "error" ? (
              <span style={{ color: neon.red }}>{line.text}</span>
            ) : null}

            {line.kind === "accent" ? (
              <span style={{ color: neon.blue }}>{line.text}</span>
            ) : null}

            {line.kind === "output" ? <span>{line.text}</span> : null}

            {line.kind === "block" ? (
              <div style={{ color: "#d1d1d6" }}>{line.node ?? line.text}</div>
            ) : null}
          </div>
        ))}

        {!matrix && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              minHeight: 24,
            }}
          >
            <Prompt path={promptPath} />

            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal command input"
              style={{
                flex: 1,
                minWidth: 0,
                marginLeft: 8,
                border: 0,
                outline: 0,
                background: "transparent",
                color: neon.text,
                font: "inherit",
                caretColor: neon.green,
              }}
            />

            <span
              style={{
                width: 7,
                height: 16,
                background: neon.green,
                opacity: 0.85,
                animation: "terminal-caret 1s steps(1) infinite",
              }}
            />
          </div>
        )}
      </div>

      <style>{`
        @keyframes terminal-caret {
          50% {
            opacity: 0;
          }
        }

        ::selection {
          background: rgba(10,132,255,.35);
        }
      `}</style>
    </div>
  );
}
