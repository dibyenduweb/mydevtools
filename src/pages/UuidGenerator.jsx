import { useState } from "react";
import { toast } from "react-toastify";

const UuidGenerator = () => {
  const [uuid, setUuid] = useState("");

  const generateUuid = () => {
    const newUuid = crypto.randomUUID();
    setUuid(newUuid);
    toast.success("UUID generated");
  };

  const copyUuid = () => {
    if (uuid) {
      navigator.clipboard.writeText(uuid);
      toast.success("UUID copied to clipboard");
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold dark:text-white">UUID Generator</h1>

      <div className="flex gap-3">
        <button
          onClick={generateUuid}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Generate UUID
        </button>
        <button
          onClick={copyUuid}
          className="px-4 py-2 bg-gray-300 rounded-lg dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Copy
        </button>
      </div>

      {uuid && (
        <div className="p-3 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg break-all">
          {uuid}
        </div>
      )}
    </div>
  );
};

export default UuidGenerator;
