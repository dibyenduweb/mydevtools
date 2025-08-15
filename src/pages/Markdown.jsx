import { useState } from "react";
import { toast } from "react-toastify";

const Markdown = () => {
  const [content, setContent] = useState("");

  // Basic markdown-to-html parser (limited but lightweight)
  const parseMarkdown = (text) => {
    let html = text;
    html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
    html = html.replace(/^\* (.*$)/gim, "<ul><li>$1</li></ul>");
    html = html.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/gim, "<em>$1</em>");
    html = html.replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>");
    html = html.replace(/\n$/gim, "<br />");
    return html;
  };

  // Toolbar handlers
  const insertText = (syntax) => {
    setContent((prev) => prev + syntax);
  };

  const clearAll = () => {
    setContent("");
    toast.success("Cleared");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold dark:text-white">Markdown Editor</h1>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => insertText("**bold**")}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Bold
        </button>
        <button
          onClick={() => insertText("*italic*")}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Italic
        </button>
        <button
          onClick={() => insertText("## Heading")}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Heading
        </button>
        <button
          onClick={() => insertText("[title](url)")}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Link
        </button>
        <button
          onClick={() => insertText("* List item")}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          List
        </button>
        <button
          onClick={clearAll}
          className="px-3 py-1 bg-gray-300 rounded dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Clear
        </button>
      </div>

      {/* Editor / Preview */}
      <div className="flex flex-col lg:flex-row gap-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write markdown..."
          rows={10}
          className="flex-1 p-3 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />

        <div
          className="flex-1 p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
        />
      </div>
    </div>
  );
};

export default Markdown;
