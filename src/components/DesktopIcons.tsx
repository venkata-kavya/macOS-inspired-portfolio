import React from "react";

export const FolderIcon = ({ className }: { className?: string }) => (
  <img
    src="/img/icons/folder-generic.png"
    alt="Folder"
    className={className}
    style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}
  />
);

export const FolderHomeIcon = ({ className }: { className?: string }) => (
  <img
    src="/img/icons/folder-home.png"
    alt="Home Folder"
    className={className}
    style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}
  />
);

export const FolderDockIcon = ({ className }: { className?: string }) => (
  <img
    src="/img/icons/folder-dock.png"
    alt="Dock Folder"
    className={className}
    style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}
  />
);

export const PdfIcon = ({ className }: { className?: string }) => (
  <img
    src="/img/icons/sf-icons/pdf.svg"
    alt="PDF File"
    className={className}
    style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}
  />
);

export const TxtIcon = ({ className }: { className?: string }) => (
  <img
    src="/img/icons/sf-icons/doc.text.svg"
    alt="Text File"
    className={className}
    style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}
  />
);

export const AudioIcon = ({ className }: { className?: string }) => (
  <img
    src="/img/icons/sf-icons/audio.svg"
    alt="Audio File"
    className={className}
    style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}
  />
);

export const VideoIcon = ({ className }: { className?: string }) => (
  <img
    src="/img/icons/sf-icons/mp4file.svg"
    alt="Video File"
    className={className}
    style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}
  />
);
