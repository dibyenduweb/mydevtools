import { useState } from "react";
import { toast } from "react-toastify";

const JwtDecoder = () => {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState(null);
  const [payload, setPayload] = useState(null);
  const [status, setStatus] = useState("");

  const handleDecode = () => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) throw new Error("Invalid JWT");

      const decodedHeader = JSON.parse(atob(parts[0]));
      const decodedPayload = JSON.parse(atob(parts[1]));

      setHeader(decodedHeader);
      setPayload(decodedPayload);

      // check expiration
      if (decodedPayload.exp) {
        const now = Math.floor(Date.now() / 1000);
        setStatus(now > decodedPayload.exp ? "Expired" : "Valid");
      } else {
        setStatus("No exp field");
      }

      toast.success("JWT decoded");
    } catch (err) {
      toast.error("Invalid JWT");
      setHeader(null);
      setPayload(null);
      setStatus("");
    }
  };

  const handleClear = () => {
    setToken("");
    setHeader(null);
    setPayload(null);
    setStatus("");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold dark:text-white">JWT Decoder</h1>

      <textarea
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Paste JWT token..."
        rows={5}
        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
      />

      <div className="flex gap-3">
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

      {status && (
        <div
          className={`inline-block px-3 py-1 text-sm rounded ${
            status === "Valid"
              ? "bg-green-500 text-white"
              : status === "Expired"
              ? "bg-red-500 text-white"
              : "bg-gray-500 text-white"
          }`}
        >
          {status}
        </div>
      )}

      {header && (
        <pre className="p-3 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg whitespace-pre-wrap break-all">
          <strong>Header:</strong>
          {"\n"}
          {JSON.stringify(header, null, 2)}
        </pre>
      )}

      {payload && (
        <pre className="p-3 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg whitespace-pre-wrap break-all">
          <strong>Payload:</strong>
          {"\n"}
          {JSON.stringify(payload, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default JwtDecoder;
