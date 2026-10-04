import type { BearData } from "~/types";

const bear: BearData[] = [
  {
    id: "profile",
    title: "Kavya",
    icon: "i-ph:user-circle",
    md: [
      {
        id: "about-me",
        title: "About Me",
        file: "markdown/about-me.md",
        icon: "i-ph:sparkle",
        excerpt:
          "AI/ML engineer interested in neuroscience, human behavior, attention and technology that strengthens human agency.",
      },
      {
        id: "skills",
        title: "Skills",
        file: "markdown/skills.md",
        icon: "i-ph:brain",
        excerpt:
          "AI, LLM applications, agents, backend systems, modern interfaces and the engineering behind intelligent products.",
      },
      {
        id: "about-site",
        title: "About This Site",
        file: "markdown/about-site.md",
        icon: "i-ph:browser",
        excerpt:
          "A macOS-inspired personal workspace for exploring what I build, what I think about and what I'm learning.",
      },
    ],
  },

  {
    id: "projects",
    title: "Projects",
    icon: "i-ph:code",
    md: [
      {
        id: "karta",
        title: "KARTA",
        file: "markdown/karta.md",
        icon: "i-ph:brain",
        excerpt:
          "A cognitive OS exploring thought, memory, ideas and the relationship between humans and intelligent software.",
      },
      {
        id: "resume-ai",
        title: "AI Resume Analyzer",
        file: "markdown/resume-ai.md",
        icon: "i-ph:file-text",
        excerpt:
          "An AI application exploring language models, structured feedback and intelligent document understanding.",
      },
      {
        id: "atelier",
        title: "Atelier Céleste",
        file: "markdown/atelier.md",
        icon: "i-ph:cake",
        excerpt:
          "A high-end interface experiment focused on visual storytelling, interaction, motion and atmosphere.",
      },
      {
        id: "github-stats",
        title: "GitHub",
        file: "markdown/github-stats.md",
        icon: "i-ph:github-logo",
        excerpt:
          "A snapshot of my engineering activity, experiments and continuous process of building.",
      },
    ],
  },
];

export default bear;
