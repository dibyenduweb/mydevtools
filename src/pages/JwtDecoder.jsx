import { useState } from "react";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";

const JwtDecoder = () => {
  const [token, setToken] = useState("");
  const [header, setHeader] = useState(null);
  const [payload, setPayload] = useState(null);
  const [status, setStatus] = useState("");
  const [genHeader, setGenHeader] = useState({ alg: "HS256", typ: "JWT" });
  const [genPayload, setGenPayload] = useState({ sub: "", name: "", exp: Math.floor(Date.now() / 1000) + 3600 });
  const [secret, setSecret] = useState("");

  // ------------------ Decode JWT ------------------
  const handleDecode = () => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) throw new Error("Invalid JWT");

      const decodedHeader = JSON.parse(atob(parts[0]));
      const decodedPayload = JSON.parse(atob(parts[1]));

      setHeader(decodedHeader);
      setPayload(decodedPayload);

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

  // ------------------ Generate JWT ------------------
  const handleGenerate = () => {
    try {
      if (!secret) throw new Error("Secret is required");

      const encode = (obj) => btoa(JSON.stringify(obj));

      const headerEncoded = encode(genHeader);
      const payloadEncoded = encode(genPayload);

      const signature = CryptoJS.HmacSHA256(`${headerEncoded}.${payloadEncoded}`, secret).toString(
        CryptoJS.enc.Base64
      );

      // Replace '+' '/' '=' to make Base64URL
      const base64Url = (str) =>
        str.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

      const jwt = `${headerEncoded}.${payloadEncoded}.${base64Url(signature)}`;
      setToken(jwt);
      toast.success("JWT generated");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ------------------ Copy JWT ------------------
  const handleCopy = () => {
    if (!token) return toast.error("No JWT to copy");
    navigator.clipboard.writeText(token);
    toast.success("JWT copied to clipboard");
  };

  const handleClear = () => {
    setToken("");
    setHeader(null);
    setPayload(null);
    setStatus("");
    setSecret("");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold dark:text-white">JWT Tool</h1>

      {/* ---------- JWT Input & Decoder ---------- */}
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
          onClick={handleCopy}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          Copy
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

      {/* ---------- JWT Generator ---------- */}
      <div className="space-y-2 pt-4 border-t border-gray-300 dark:border-gray-700">
        <h2 className="font-semibold dark:text-white">Generate JWT</h2>

        <input
          type="text"
          placeholder="Secret"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />

        <textarea
          rows={4}
          value={JSON.stringify(genPayload, null, 2)}
          onChange={(e) => setGenPayload(JSON.parse(e.target.value))}
          className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />

        <button
          onClick={handleGenerate}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Generate JWT
        </button>
      </div>
    </div>
  );
};

export default JwtDecoder;
