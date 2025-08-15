import { useState } from "react";
import { toast } from "react-toastify";

const CsvJson = () => {
  const [csv, setCsv] = useState("");
  const [json, setJson] = useState("");

  // CSV → JSON
  const csvToJson = () => {
    try {
      const [headers, ...rows] = csv.trim().split("\n").map((r) => r.split(","));
      const data = rows.map((row) =>
        headers.reduce((acc, header, idx) => {
          acc[header] = row[idx];
          return acc;
        }, {})
      );
      setJson(JSON.stringify(data, null, 2));
      toast.success("Converted to JSON");
    } catch (err) {
      toast.error("Invalid CSV");
    }
  };

  // JSON → CSV
  const jsonToCsv = () => {
    try {
      const arr = JSON.parse(json);
      if (!Array.isArray(arr)) throw new Error();
      const headers = Object.keys(arr[0]);
      const rows = arr.map((obj) => headers.map((h) => obj[h]).join(","));
      const csvString = [headers.join(","), ...rows].join("\n");
      setCsv(csvString);
      toast.success("Converted to CSV");
    } catch (err) {
      toast.error("Invalid JSON");
    }
  };

  const copyCsv = () => {
    navigator.clipboard.writeText(csv);
    toast.success("Copied CSV");
  };

  const copyJson = () => {
    navigator.clipboard.writeText(json);
    toast.success("Copied JSON");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold dark:text-white">CSV ⇌ JSON Converter</h1>

      <div className="flex flex-col lg:flex-row gap-4">
        <textarea
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          placeholder="CSV..."
          rows={8}
          className="flex-1 p-3 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />

        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          placeholder="JSON..."
          rows={8}
          className="flex-1 p-3 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={csvToJson}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          CSV → JSON
        </button>
        <button
          onClick={jsonToCsv}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          JSON → CSV
        </button>
        <button
          onClick={copyCsv}
          className="px-4 py-2 bg-gray-300 rounded-lg dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Copy CSV
        </button>
        <button
          onClick={copyJson}
          className="px-4 py-2 bg-gray-300 rounded-lg dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Copy JSON
        </button>
      </div>
    </div>
  );
};

export default CsvJson;
