import { useState } from "react";
import { toast } from "react-toastify";

const CronCalculator = () => {
  const [mode, setMode] = useState("cronToHuman");
  const [cronInput, setCronInput] = useState("");
  const [result, setResult] = useState("");

  // For Human → Cron
  const [second, setSecond] = useState("*");
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [day, setDay] = useState("*");
  const [month, setMonth] = useState("*");
  const [weekday, setWeekday] = useState("*");

  const generateOptions = (max) =>
    Array.from({ length: max + 1 }, (_, i) => i.toString());

  const parseCron = () => {
    const parts = cronInput.split(" ");
    if (parts.length !== 6) {
      toast.error("Cron must have 6 fields");
      return;
    }
    const labels = ["Second", "Minute", "Hour", "Day", "Month", "Weekday"];
    const description = parts
      .map((v, i) => `${labels[i]}: ${v === "*" ? "every" : v}`)
      .join("\n");
    setResult(description);
    toast.success("Parsed");
  };

  const buildCron = () => {
    const cron = `${second} ${minute} ${hour} ${day} ${month} ${weekday}`;
    setResult(cron);
    toast.success("Cron string generated");
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard");
  };

  const clearAll = () => {
    setCronInput("");
    setResult("");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold dark:text-white">Cron Calculator</h1>

      {/* Mode switch */}
      <div className="flex gap-3">
        <button
          onClick={() => {
            setMode("cronToHuman");
            setResult("");
          }}
          className={`px-4 py-2 rounded-lg ${
            mode === "cronToHuman"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 dark:bg-gray-700 dark:text-white"
          }`}
        >
          Cron → Human
        </button>
        <button
          onClick={() => {
            setMode("humanToCron");
            setResult("");
          }}
          className={`px-4 py-2 rounded-lg ${
            mode === "humanToCron"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 dark:bg-gray-700 dark:text-white"
          }`}
        >
          Human → Cron
        </button>
      </div>

      {mode === "cronToHuman" ? (
        <>
          <textarea
            value={cronInput}
            onChange={(e) => setCronInput(e.target.value)}
            placeholder="Enter 6-field cron (e.g. */5 * * * * *)"
            rows={4}
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />

          <div className="flex gap-3">
            <button
              onClick={parseCron}
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
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {/* Seconds */}
            <select
              value={second}
              onChange={(e) => setSecond(e.target.value)}
              className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
            >
              <option value="*">Seconds *</option>
              {generateOptions(59).map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>

            {/* Minutes */}
            <select
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
            >
              <option value="*">Minutes *</option>
              {generateOptions(59).map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>

            {/* Hours */}
            <select
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
            >
              <option value="*">Hours *</option>
              {generateOptions(23).map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>

            {/* Day of month */}
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
            >
              <option value="*">Day *</option>
              {generateOptions(31).map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>

            {/* Month */}
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
            >
              <option value="*">Month *</option>
              {generateOptions(12).map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>

            {/* Weekday */}
            <select
              value={weekday}
              onChange={(e) => setWeekday(e.target.value)}
              className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
            >
              <option value="*">Weekday *</option>
              {generateOptions(6).map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={buildCron}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Generate Cron
          </button>
        </>
      )}

      {result && (
        <>
          <pre className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg whitespace-pre-wrap break-all">
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

export default CronCalculator;

