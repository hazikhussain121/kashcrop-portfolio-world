import { useEffect, useId, useRef, useState } from "react";

type MermaidDiagramProps = {
  title: string;
  code: string;
};

/** Render the source case-study diagrams only after a modal is opened. */
export function MermaidDiagram({ title, code }: MermaidDiagramProps) {
  const holderRef = useRef<HTMLDivElement>(null);
  const instanceId = useId().replace(/[^a-z0-9]/gi, "");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    setFailed(false);

    async function renderDiagram() {
      try {
        const { default: mermaid } = await import("mermaid");
        const dark = document.documentElement.dataset.theme === "dark";
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          fontFamily: '"Geist", system-ui, sans-serif',
          themeVariables: dark
            ? {
                background: "#110b0d",
                primaryColor: "#241619",
                primaryTextColor: "#f4ece9",
                primaryBorderColor: "#6b5b58",
                lineColor: "#ff5b3a",
                secondaryColor: "#1b1214",
                tertiaryColor: "#0a0708",
                edgeLabelBackground: "#110b0d",
              }
            : {
                background: "#f7f5f3",
                primaryColor: "#f1ebe8",
                primaryTextColor: "#2a1b1d",
                primaryBorderColor: "#cdbdb8",
                lineColor: "#e10f1c",
                secondaryColor: "#fbf9f7",
                tertiaryColor: "#eee7e4",
                edgeLabelBackground: "#f7f5f3",
              },
        });

        const { svg } = await mermaid.render(`case-study-${instanceId}`, code);
        if (active && holderRef.current) holderRef.current.innerHTML = svg;
      } catch {
        if (active) setFailed(true);
      }
    }

    renderDiagram();
    return () => {
      active = false;
      if (holderRef.current) holderRef.current.innerHTML = "";
    };
  }, [code, instanceId]);

  return (
    <figure className="case-study-diagram">
      <figcaption>{title}</figcaption>
      {failed ? (
        <p className="case-study-diagram-fallback">Workflow diagram unavailable.</p>
      ) : (
        <div ref={holderRef} className="case-study-diagram-canvas" aria-label={title} />
      )}
    </figure>
  );
}
