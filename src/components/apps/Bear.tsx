import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeExternalLinks from "rehype-external-links";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula, prism } from "react-syntax-highlighter/dist/esm/styles/prism";

import bear from "~/configs/bear";
import type { BearMdData } from "~/types";

interface ContentProps {
  contentID: string;
  contentURL: string;
}

interface MiddlebarProps {
  items: BearMdData[];
  cur: number;
  setContent: (id: string, url: string, index: number) => void;
}

interface SidebarProps {
  cur: number;
  setMidBar: (items: BearMdData[], index: number) => void;
}

interface BearState extends ContentProps {
  curSidebar: number;
  curMidbar: number;
  midbarList: BearMdData[];
}

/* ============================================================
   MARKDOWN CODE HIGHLIGHTER
   ============================================================ */

const Highlighter = (dark: boolean): any => {
  interface CodeProps {
    node: any;
    inline: boolean;
    className: string;
    children: any;
  }

  return {
    code({ node, inline, className, children, ...props }: CodeProps) {
      const match = /language-(\w+)/.exec(className || "");

      return !inline && match ? (
        <SyntaxHighlighter
          style={dark ? dracula : prism}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };
};

/* ============================================================
   SIDEBAR
   ============================================================ */

const Sidebar = ({ cur, setMidBar }: SidebarProps) => {
  return (
    <div
      className="h-full"
      style={{
        color: "var(--c-text, #1d1d1f)",
      }}
    >
      {/* Header */}

      <div
        className="h-12 px-4 flex items-center justify-end gap-4"
        style={{
          color: "rgba(60,60,67,.65)",
        }}
      >
        <span className="i-ph:cloud-slash text-lg" />
        <span className="i-ph:sliders-horizontal text-lg" />
      </div>

      {/* Sidebar items */}

      <ul className="pb-4">
        {bear.map((item, index) => {
          const active = cur === index;

          return (
            <li
              key={`bear-sidebar-${item.id}`}
              className="mx-2 mb-1 rounded-lg overflow-hidden"
              onClick={() => setMidBar(item.md, index)}
              style={{
                cursor: "default",
              }}
            >
              <div
                className="h-9 px-3 flex items-center"
                style={{
                  background: active ? "rgba(255,59,48,.88)" : "transparent",

                  color: active ? "#fff" : "rgba(40,40,45,.78)",

                  transition: "background .15s ease, color .15s ease",
                }}
              >
                <span
                  className={item.icon}
                  style={{
                    fontSize: 17,
                    flexShrink: 0,
                  }}
                />

                <span
                  className="ml-2 truncate"
                  style={{
                    fontSize: 13,
                    fontWeight: active ? 600 : 500,
                  }}
                >
                  {item.title}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

/* ============================================================
   MIDDLE BAR
   ============================================================ */

const Middlebar = ({ items, cur, setContent }: MiddlebarProps) => {
  return (
    <div
      className="h-full"
      style={{
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <ul
        style={{
          padding: "8px 0 20px",
        }}
      >
        {items.map((item: BearMdData, index: number) => {
          const active = cur === index;

          return (
            <li
              key={`bear-midbar-${item.id}`}
              onClick={() => setContent(item.id, item.file, index)}
              style={{
                margin: "0 7px 4px",

                minHeight: 86,

                borderRadius: 9,

                borderLeft: active
                  ? "3px solid #ff3b30"
                  : "3px solid transparent",

                background: active ? "rgba(255,255,255,.78)" : "transparent",

                boxShadow: active ? "0 1px 4px rgba(0,0,0,.06)" : "none",

                cursor: "default",

                transition:
                  "background .15s ease, box-shadow .15s ease, border .15s ease",
              }}
            >
              <div
                style={{
                  padding: "11px 11px 9px 10px",
                }}
              >
                {/* title row */}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    minWidth: 0,
                  }}
                >
                  {/* icon */}

                  <div
                    style={{
                      width: 28,
                      height: 28,
                      flexShrink: 0,

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      borderRadius: 7,

                      color: "rgba(80,80,88,.72)",

                      background: "rgba(120,120,128,.10)",
                    }}
                  >
                    <span
                      className={item.icon}
                      style={{
                        fontSize: 15,
                      }}
                    />
                  </div>

                  {/* title */}

                  <div
                    style={{
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        position: "relative",

                        display: "flex",
                        alignItems: "center",

                        gap: 6,

                        minWidth: 0,

                        fontSize: 13,
                        lineHeight: 1.3,

                        fontWeight: active ? 650 : 600,

                        color: "var(--c-text, #1d1d1f)",
                      }}
                    >
                      <span
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.title}
                      </span>

                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(event) => event.stopPropagation()}
                          style={{
                            flexShrink: 0,
                            color: "#0a84ff",
                          }}
                        >
                          <span className="i-ph:arrow-square-out" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* excerpt */}

                <div
                  style={{
                    marginTop: 8,
                    marginLeft: 37,

                    color: "rgba(60,60,67,.62)",

                    fontSize: 11.5,
                    lineHeight: 1.45,

                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",

                    overflow: "hidden",
                  }}
                >
                  {item.excerpt}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

/* ============================================================
   IMAGE URL FIXER
   ============================================================ */

const getRepoURL = (url: string) => {
  return url.slice(0, -10) + "/";
};

const fixImageURL = (text: string, contentURL: string): string => {
  text = text.replace(/&nbsp;/g, "");

  if (contentURL.indexOf("raw.githubusercontent.com") !== -1) {
    const repoURL = getRepoURL(contentURL);

    const imgReg = /!\[(.*?)\]\((.*?)\)/;

    const imgRegGlobal = /!\[(.*?)\]\((.*?)\)/g;

    const imgList = text.match(imgRegGlobal);

    if (imgList) {
      for (const img of imgList) {
        const match = img.match(imgReg);

        if (!match) continue;

        const imgURL = match[2];

        if (imgURL.indexOf("http") !== -1) {
          continue;
        }

        const newImgURL = repoURL + imgURL;

        text = text.replace(imgURL, newImgURL);
      }
    }
  }

  return text;
};

/* ============================================================
   CONTENT
   ============================================================ */

const Content = ({ contentID, contentURL }: ContentProps) => {
  const [storeMd, setStoreMd] = useState<{
    [key: string]: string;
  }>({});

  const dark = useStore((state) => state.dark);

  const fetchMarkdown = useCallback(
    (id: string, url: string) => {
      if (storeMd[id]) return;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch ${url}`);
          }

          return response.text();
        })
        .then((text) => {
          const fixedText = fixImageURL(text, url);

          setStoreMd((current) => ({
            ...current,
            [id]: fixedText,
          }));
        })
        .catch(() => {
          setStoreMd((current) => ({
            ...current,
            [id]: "Unable to load this note right now.",
          }));
        });
    },
    [storeMd],
  );

  useEffect(() => {
    fetchMarkdown(contentID, contentURL);
  }, [contentID, contentURL, fetchMarkdown]);

  const markdown = storeMd[contentID];

  return (
    <div
      className="bear-content"
      style={{
        width: "100%",
        minHeight: "100%",

        padding: "34px clamp(28px, 7vw, 100px) 70px",

        color: "var(--c-text, #1d1d1f)",

        background: "var(--lg-bg-tinted, rgba(255,255,255,.72))",
      }}
    >
      <article
        className="markdown"
        style={{
          width: "100%",
          maxWidth: 850,
          margin: "0 auto",
        }}
      >
        {markdown ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[
              rehypeKatex,
              [
                rehypeExternalLinks,
                {
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
              ],
            ]}
            components={Highlighter(dark as boolean)}
          >
            {markdown}
          </ReactMarkdown>
        ) : (
          <div
            style={{
              minHeight: 200,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              color: "rgba(60,60,67,.45)",

              fontSize: 13,
            }}
          >
            Loading…
          </div>
        )}
      </article>
    </div>
  );
};

/* ============================================================
   BEAR APP
   ============================================================ */

const Bear = () => {
  const [state, setState] = useState<BearState>({
    curSidebar: 0,
    curMidbar: 0,
    midbarList: bear[0]?.md ?? [],
    contentID: bear[0]?.md?.[0]?.id ?? "",
    contentURL: bear[0]?.md?.[0]?.file ?? "",
  });

  const setMidBar = (items: BearMdData[], index: number) => {
    if (!items?.length) return;

    setState({
      curSidebar: index,

      curMidbar: 0,

      midbarList: items,

      contentID: items[0].id,

      contentURL: items[0].file,
    });
  };

  const setContent = (id: string, url: string, index: number) => {
    setState((current) => ({
      ...current,

      curMidbar: index,

      contentID: id,

      contentURL: url,
    }));
  };

  return (
    <div
      className="bear"
      style={{
        display: "grid",

        gridTemplateColumns: "190px minmax(250px, 300px) minmax(0, 1fr)",

        width: "100%",
        height: "100%",

        minWidth: 0,
        minHeight: 0,

        overflow: "hidden",

        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",

        background: "rgba(245,245,247,.94)",
      }}
    >
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        style={{
          minWidth: 0,

          overflowY: "auto",
          overflowX: "hidden",

          borderRight: "1px solid rgba(0,0,0,.07)",

          background: "rgba(235,235,240,.72)",

          backdropFilter: "blur(28px) saturate(160%)",
        }}
      >
        <Sidebar cur={state.curSidebar} setMidBar={setMidBar} />
      </aside>

      {/* =====================================================
          MIDDLE LIST
      ===================================================== */}

      <aside
        style={{
          minWidth: 0,

          overflow: "hidden",

          borderRight: "1px solid rgba(0,0,0,.08)",

          background: "rgba(250,250,252,.84)",

          backdropFilter: "blur(24px) saturate(150%)",
        }}
      >
        <Middlebar
          items={state.midbarList}
          cur={state.curMidbar}
          setContent={setContent}
        />
      </aside>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main
        style={{
          minWidth: 0,
          minHeight: 0,

          overflow: "auto",

          background: "rgba(255,255,255,.82)",
        }}
      >
        <Content contentID={state.contentID} contentURL={state.contentURL} />
      </main>

      {/* =====================================================
          LOCAL RESPONSIVE STYLES
      ===================================================== */}

      <style>
        {`
          .bear * {
            box-sizing: border-box;
          }

          .bear ::-webkit-scrollbar {
            width: 7px;
            height: 7px;
          }

          .bear ::-webkit-scrollbar-track {
            background: transparent;
          }

          .bear ::-webkit-scrollbar-thumb {
            background: rgba(60,60,67,.22);
            border-radius: 999px;
          }

          .bear ::-webkit-scrollbar-thumb:hover {
            background: rgba(60,60,67,.34);
          }

          .bear .markdown {
            font-size: 15px;
            line-height: 1.72;
          }

          .bear .markdown h1 {
            font-size: 32px;
            line-height: 1.15;
            letter-spacing: -.035em;
            margin: 0 0 20px;
            font-weight: 750;
          }

          .bear .markdown h2 {
            font-size: 24px;
            line-height: 1.25;
            letter-spacing: -.025em;
            margin: 34px 0 14px;
            font-weight: 700;
          }

          .bear .markdown h3 {
            font-size: 18px;
            line-height: 1.3;
            margin: 26px 0 10px;
            font-weight: 650;
          }

          .bear .markdown p {
            margin: 0 0 17px;
          }

          .bear .markdown ul,
          .bear .markdown ol {
            margin: 0 0 18px;
            padding-left: 25px;
          }

          .bear .markdown li {
            margin-bottom: 6px;
          }

          .bear .markdown a {
            color: #007aff;
            text-decoration: none;
          }

          .bear .markdown a:hover {
            text-decoration: underline;
          }

          .bear .markdown blockquote {
            margin: 20px 0;
            padding: 12px 18px;
            border-left: 3px solid #ff3b30;
            background: rgba(0,0,0,.035);
            border-radius: 0 8px 8px 0;
          }

          .bear .markdown img {
            display: block;
            max-width: 100%;
            height: auto;
            margin: 22px auto;
            border-radius: 10px;
          }

          .bear .markdown pre {
            overflow-x: auto;
            border-radius: 10px;
            margin: 20px 0;
          }

          .bear .markdown code:not(pre code) {
            padding: 2px 5px;
            border-radius: 5px;
            background: rgba(0,0,0,.06);
            font-size: .9em;
          }

          @media (max-width: 900px) {
            .bear {
              grid-template-columns: 155px 230px minmax(0, 1fr) !important;
            }

            .bear .markdown {
              font-size: 14px;
            }

            .bear .markdown h1 {
              font-size: 27px;
            }
          }

          @media (max-width: 700px) {
            .bear {
              grid-template-columns: 130px 190px minmax(0, 1fr) !important;
            }

            .bear-content {
              padding-left: 22px !important;
              padding-right: 22px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Bear;
