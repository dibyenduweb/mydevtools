import { useState } from "react";
import { toast } from "react-toastify";

const Base64Converter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleEncode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
      toast.success("Encoded successfully");
    } catch (err) {
      toast.error("Failed to encode");
    }
  };

  const handleDecode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
      toast.success("Decoded successfully");
    } catch (err) {
      toast.error("Invalid Base64");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold dark:text-white">Base64 Converter</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text or Base64..."
        rows={6}
        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
      />

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={handleEncode}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Encode
        </button>
        <button
          onClick={handleDecode}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Decode
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-300 rounded-lg dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Clear
        </button>
      </div>

      {output && (
        <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg break-all whitespace-pre-wrap">
          {output}
        </pre>
      )}
    </div>
  );
};

export default Base64Converter;
