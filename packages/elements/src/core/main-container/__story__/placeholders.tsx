import type { ReactNode } from "react";

interface ContentPlaceholderProps {
  children?: ReactNode;
}

export function ContentPlaceholder({ children }: ContentPlaceholderProps) {
  return (
    <div
      style={{
        display: "flex",
        placeItems: "center",
        placeContent: "center",
        background: "#F2CCFF",
        height: "100px",
      }}
    >
      {children}
    </div>
  );
}
