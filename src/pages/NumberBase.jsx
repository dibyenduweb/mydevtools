import { useState } from "react";
import { toast } from "react-toastify";

const NumberBase = () => {
  const [value, setValue] = useState("");
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);
  const [result, setResult] = useState("");

  // build an array [2..36] for dropdown
  const baseOptions = Array.from({ length: 35 }, (_, i) => i + 2);

  const convert = () => {
    try {
      const decimalValue = parseInt(value, fromBase);
      if (isNaN(decimalValue)) throw new Error();
      const output = decimalValue.toString(toBase).toUpperCase();
      setResult(output);
      toast.success("Converted");
    } catch (err) {
      toast.error("Invalid input for selected base");
      setResult("");
    }
  };

  const clearAll = () => {
    setValue("");
    setResult("");
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copied");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold dark:text-white">
        Number Base Converter
      </h1>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter number..."
        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={fromBase}
          onChange={(e) => setFromBase(parseInt(e.target.value))}
          className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
        >
          {baseOptions.map((b) => (
            <option key={b} value={b}>
              From Base {b}
            </option>
          ))}
        </select>

        <select
          value={toBase}
          onChange={(e) => setToBase(parseInt(e.target.value))}
          className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
        >
          {baseOptions.map((b) => (
            <option key={b} value={b}>
              To Base {b}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 flex-wrap">
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

      {result && (
        <>
          <pre className="p-3 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg break-all">
            {result}
          </pre>
          <button
            onClick={copyResult}
            className="px-3 py-2 mt-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Copy
          </button>
        </>
      )}
    </div>
  );
};

export default NumberBase;
