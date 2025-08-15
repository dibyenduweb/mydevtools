import { useState } from "react";

const TextCompare = () => {
  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");
  const [diffLines, setDiffLines] = useState([]);

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
        if (left) {
          result.push({ type: "removed", text: "- " + left });
        }
        if (right) {
          result.push({ type: "added", text: "+ " + right });
        }
      }
    }

    setDiffLines(result);
  };

  const handleClear = () => {
    setLeftText("");
    setRightText("");
    setDiffLines([]);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold dark:text-white">Text Compare</h1>

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
