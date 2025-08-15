import {
  FaTools,
  FaUserTie,
  FaCodeBranch,
  FaCheckCircle,
  FaFileCode,
  FaBrain,
  FaHashtag,
  FaMarkdown,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const totalTools = 14;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold dark:text-white">Dashboard</h1>

      {/* General Details */}
      <div className="space-y-2 dark:text-white">
        <div className="flex items-center gap-2">
          <FaTools />
          <span>Tool Name: DevTool</span>
        </div>
        <div className="flex items-center gap-2">
          <FaUserTie />
          <span>Developer: Dibyendu Pramanik</span>
        </div>
        <div className="flex items-center gap-2">
          <FaCodeBranch />
          <span>Version: 1.0.0</span>
        </div>
      </div>

      {/* Tool Info */}
      <div className="flex items-center gap-4 dark:text-white">
        <span>Total Tools: {totalTools}</span>
        <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
          <FaCheckCircle /> Free Tools
        </span>
      </div>

      {/* Feedback / Request */}
      <div className="flex gap-4">
        <Link
          to="#"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Request a Tool
        </Link>
        <Link
          to="#"
          className="px-4 py-2 bg-gray-300 rounded-lg dark:bg-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Feedback
        </Link>
      </div>

      {/* Top Useful Tools */}
      <div className="dark:text-white">
        <h2 className="text-lg font-semibold mb-3">Top 4 Useful Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <Link
            to="/json-viewer"
            className="flex flex-col items-center gap-2 p-4 border rounded-xl hover:shadow dark:border-gray-700"
          >
            <FaFileCode className="text-3xl" />
            <span>JSON Viewer</span>
          </Link>

          {/* Card 2 */}
          <Link
            to="/ai-image"
            className="flex flex-col items-center gap-2 p-4 border rounded-xl hover:shadow dark:border-gray-700"
          >
            <FaBrain className="text-3xl" />
            <span>Ai Image Generator</span>
          </Link>

          {/* Card 3 */}
          <Link
            to="/uuid-generator"
            className="flex flex-col items-center gap-2 p-4 border rounded-xl hover:shadow dark:border-gray-700"
          >
            <FaHashtag className="text-3xl" />
            <span>UUID Generator</span>
          </Link>

          {/* Card 4 */}
          <Link
            to="/markdown"
            className="flex flex-col items-center gap-2 p-4 border rounded-xl hover:shadow dark:border-gray-700"
          >
            <FaMarkdown className="text-3xl" />
            <span>Markdown</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
