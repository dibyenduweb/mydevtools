import { useState } from "react";
import { toast } from "react-toastify";

const JsonToTs = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [interfaceName, setInterfaceName] = useState("");
  const [output, setOutput] = useState("");

  const convert = () => {
    try {
      const obj = JSON.parse(jsonInput);
      const name = interfaceName.trim() || "RootObject";
      const fields = Object.entries(obj)
        .map(([key, value]) => `${key}: ${typeof value};`)
        .join("\n  ");

      const result = `interface ${name} {\n  ${fields}\n}`;
      setOutput(result);
      toast.success("Converted to TypeScript");
    } catch (err) {
      toast.error("Invalid JSON");
      setOutput("");
    }
  };

  const clearAll = () => {
    setJsonInput("");
    setInterfaceName("");
    setOutput("");
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold dark:text-white">JSON to TypeScript</h1>

      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Paste JSON here..."
        rows={7}
        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
      />

      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <input
          type="text"
          placeholder="Interface name (e.g. User)"
          value={interfaceName}
          onChange={(e) => setInterfaceName(e.target.value)}
          className="p-2 border rounded w-full sm:w-auto dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />
        <button
          onClick={convert}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Convert
        </button>
        <button
          onClick={clearAll}
          className="px-4 py-2 bg-gray-300 rounded-lg dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Clear
        </button>
      </div>

      {output && (
        <>
          <pre className="p-3 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg whitespace-pre-wrap break-all">
            {output}
          </pre>
          <button
            onClick={copyOutput}
            className="px-3 py-2 mt-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Copy
          </button>
        </>
      )}
    </div>
  );
};

export default JsonToTs;
