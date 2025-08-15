import { useState } from "react";

const TextCompare = () => {
  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");
  const [diffLines, setDiffLines] = useState([]);

  // conversion handlers
  const toUppercase = () => setLeftText(leftText.toUpperCase());
  const toLowercase = () => setLeftText(leftText.toLowerCase());
  const toSentenceCase = () => {
    const converted = leftText
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    setLeftText(converted);
  };
  const toBold = () => setLeftText(`**${leftText}**`);
  const toItalic = () => setLeftText(`*${leftText}*`);
  const copyLeft = () => navigator.clipboard.writeText(leftText);

  // compare
  const handleCompare = () => {
    const leftLines = leftText.split("\n");
    const rightLines = rightText.split("\n");
    const maxLength = Math.max(leftLines.length, rightLines.length);
    const result = [];

    for (let i = 0; i < maxLength; i++) {
      const left = leftLines[i] || "";
      const right = rightLines[i] || "";

      if (left === right) {
        result.push({ type: "same", text: left });
      } else {
        if (left) result.push({ type: "removed", text: "- " + left });
        if (right) result.push({ type: "added", text: "+ " + right });
      }
    }
    setDiffLines(result);
  };

  // clear all
  const handleClear = () => {
    setLeftText("");
    setRightText("");
    setDiffLines([]);
  };

  return (
    <div className="space-y-4 overflow-hidden">
      <h1 className="text-xl font-bold dark:text-white">Text Compare</h1>

      {/* Conversion buttons (left side only) */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={toUppercase}
          className="px-3 py-1 bg-cyan-600 text-white rounded hover:bg-cyan-800"
        >
          Uppercase
        </button>
        <button
          onClick={toLowercase}
          className="px-3 py-1 bg-cyan-600 text-white rounded hover:bg-cyan-800"
        >
          Lowercase
        </button>
        <button
          onClick={toSentenceCase}
          className="px-3 py-1 bg-cyan-600 text-white rounded hover:bg-cyan-800"
        >
          Sentence Case
        </button>
        <button
          onClick={toBold}
          className="px-3 py-1 bg-cyan-600 text-white rounded hover:bg-cyan-800"
        >
          Bold
        </button>
        <button
          onClick={toItalic}
          className="px-3 py-1 bg-cyan-600 text-white rounded hover:bg-cyan-800"
        >
          Italic
        </button>
        <button
          onClick={copyLeft}
          className="px-3 py-1 bg-cyan-600 text-white rounded hover:bg-cyan-800"
        >
          Copy
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <textarea
          value={leftText}
          onChange={(e) => setLeftText(e.target.value)}
          placeholder="Text A..."
          rows={8}
          className="flex-1 p-3 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />
        <textarea
          value={rightText}
          onChange={(e) => setRightText(e.target.value)}
          placeholder="Text B..."
          rows={8}
          className="flex-1 p-3 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleCompare}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Compare
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-300 rounded-lg dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Clear
        </button>
      </div>

      {diffLines.length > 0 && (
        <pre className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg overflow-x-auto whitespace-pre-wrap">
          {diffLines.map((line, idx) => (
            <div
              key={idx}
              className={
                line.type === "added"
                  ? "text-green-600"
                  : line.type === "removed"
                  ? "text-red-600"
                  : ""
              }
            >
              {line.text}
            </div>
          ))}
        </pre>
      )}
    </div>
  );
};

export default TextCompare;
