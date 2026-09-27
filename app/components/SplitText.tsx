import { Fragment, type CSSProperties } from "react";

/** Render a display headline as selectable, SSR-safe letter spans. */
export function plain(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

export function SplitText({
  text,
  accentClass = "text-red",
}: {
  text: string;
  accentClass?: string;
}) {
  let index = 0;

  return (
    <>
      {text.split("\n").map((line, lineIndex) => (
        <span key={lineIndex} className="hl-line" aria-hidden="true">
          {line
            .split(/\s+/)
            .filter(Boolean)
            .map((word, wordIndex, words) => (
              <Fragment key={wordIndex}>
                <span className="hl-word">
                  {Array.from(word).map((character) => {
                    const characterIndex = index++;
                    const accent = /[.,]/.test(character);
                    return (
                      <span
                        key={characterIndex}
                        className={`hl-letter${accent ? ` ${accentClass}` : ""}`}
                        style={{ ["--i" as string]: characterIndex } as CSSProperties}
                      >
                        <span className="hl-letter-inner">{character}</span>
                      </span>
                    );
                  })}
                </span>
                {wordIndex < words.length - 1 ? " " : null}
              </Fragment>
            ))}
        </span>
      ))}
    </>
  );
}

export default SplitText;
