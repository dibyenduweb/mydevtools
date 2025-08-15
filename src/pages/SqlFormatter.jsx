import { useState } from "react";
import { toast } from "react-toastify";
import { format } from "sql-formatter";

const SqlFormatter = () => {
  const [inputSql, setInputSql] = useState("");
  const [outputSql, setOutputSql] = useState("");

  const handleFormat = () => {
    try {
      const result = format(inputSql, { language: "sql" });
      setOutputSql(result);
      toast.success("SQL formatted");
    } catch (err) {
      toast.error("Invalid SQL");
      setOutputSql("");
    }
  };

  const handleClear = () => {
    setInputSql("");
    setOutputSql("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputSql);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold dark:text-white">SQL Formatter</h1>

      <textarea
        value={inputSql}
        onChange={(e) => setInputSql(e.target.value)}
        placeholder="Paste SQL to format..."
        rows={6}
        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
      />

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={handleFormat}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Format
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-300 rounded-lg dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Clear
        </button>
      </div>

      {outputSql && (
        <>
          <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg whitespace-pre-wrap break-all">
            {outputSql}
          </pre>
          <button
            onClick={handleCopy}
            className="px-3 py-2 mt-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Copy
          </button>
        </>
      )}
    </div>
  );
};

export default SqlFormatter;