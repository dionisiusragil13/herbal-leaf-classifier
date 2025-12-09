import React from "react";

const TextWithHighlight = ({ text, wordsToHighlight = [] }) => {
    const lines = text.split("\n");
    return (
      <div>
        {lines.map((line, lineIndex) => (
          <div key={lineIndex}>
            {line.split(" ").map((word, wordIndex) => (
              <React.Fragment key={wordIndex}>
                <span
                  className={
                    wordsToHighlight.includes(word.replace(/[,;.!?]/g, ""))
                      ? "text-yellow-400"
                      : "text-white"
                  }
                >
                  {word}
                </span>
                {wordIndex < line.split(" ").length - 1 && " "}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    );
  };

export default TextWithHighlight;