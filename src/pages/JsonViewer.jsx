import { useState } from "react";

const JsonViewer = () => {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");

  // Format the JSON
  const handleAddJson = () => {
    try {
      const parsed = JSON.parse(input);
      const pretty = JSON.stringify(parsed, null, 2);
      setFormatted(pretty);
    } catch (err) {
      alert("Invalid JSON format");
    }
  };

  // Clear both
  const handleClear = () => {
    setInput("");
    setFormatted("");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold dark:text-white">JSON Viewer</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your JSON here..."
        rows={7}
        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
      />

      <div className="flex gap-3">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={handleAddJson}
        >
          Add JSON
        </button>
        <button
          className="px-4 py-2 bg-gray-300 rounded-lg dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
          onClick={handleClear}
        >
          Clear JSON
        </button>
      </div>

      {formatted && (
        <pre className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg overflow-x-auto whitespace-pre-wrap">
          {formatted}
        </pre>
      )}
    </div>
  );
};

export default JsonViewer;
