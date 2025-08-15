// import { Link, useLocation } from "react-router-dom";
// import { FaMoon, FaSun } from "react-icons/fa";

// const Sidebar = ({ isOpen, setIsOpen, toggleDark }) => {
//   const location = useLocation();

//   const links = [
//     { name: "Dashboard", path: "/" },
//     { name: "JSON Viewer", path: "/json-viewer" },
//     { name: "Text Compare", path: "/text-compare" },
//     { name: "Case Converter", path: "/case-converter" },
//     { name: "UUID Generator", path: "/uuid-generator" },
//     { name: "Base64 Converter", path: "/base64-converter" },
//     { name: "JWT Decoder", path: "/jwt-decoder" },
//     { name: "JSON to TS", path: "/json-to-ts" },
//     { name: "SQL Formatter", path: "/sql-formatter" },
//     { name: "Number Base", path: "/number-base" },
//     { name: "CSV ⇌ JSON", path: "/csv-json" },
//     { name: "Image Converter", path: "/image-converter" },
//     { name: "Markdown", path: "/markdown" },
//     { name: "Cron Calculator", path: "/cron-calculator" },
//   ];

//   return (
//     <div
//       className={`fixed lg:static z-40 top-0 left-0 h-full bg-white dark:bg-gray-800 w-64 p-5 transition-transform duration-300 ${
//         isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//       }`}
//     >
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-xl font-bold dark:text-white">DevTools</h1>
//         <button
//           onClick={() => setIsOpen(false)}
//           className="lg:hidden text-xl dark:text-white"
//         >
//           ✕
//         </button>
//       </div>

//       <ul className="space-y-2">
//         {links.map((link) => (
//           <li key={link.path}>
//             <Link
//               to={link.path}
//               className={`block px-3 py-2 rounded-lg ${
//                 location.pathname === link.path
//                   ? "bg-gray-200 dark:bg-gray-700"
//                   : "hover:bg-gray-200 dark:hover:bg-gray-700"
//               } dark:text-white`}
//               onClick={() => setIsOpen(false)}
//             >
//               {link.name}
//             </Link>
//           </li>
//         ))}
//       </ul>

//       <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
//         <button
//           onClick={toggleDark}
//           className="flex items-center gap-2 px-3 py-2 w-full rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white"
//         >
//           <FaSun className="hidden dark:inline" />
//           <FaMoon className="inline dark:hidden" />
//           <span>Toggle Dark Mode</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import { Link, useLocation } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";

const Sidebar = ({ isOpen, setIsOpen, toggleDark }) => {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/" },
    { name: "JSON Viewer", path: "/json-viewer" },
    { name: "Text Compare", path: "/text-compare" },
    { name: "Case Converter", path: "/case-converter" },
    { name: "UUID Generator", path: "/uuid-generator" },
    { name: "Base64 Converter", path: "/base64-converter" },
    { name: "JWT Decoder", path: "/jwt-decoder" },
    { name: "JSON to TS", path: "/json-to-ts" },
    { name: "SQL Formatter", path: "/sql-formatter" },
    { name: "Number Base", path: "/number-base" },
    { name: "CSV ⇌ JSON", path: "/csv-json" },
    { name: "Image Converter", path: "/image-converter" },
    { name: "Markdown", path: "/markdown" },
    { name: "Cron Calculator", path: "/cron-calculator" },
  ];

  return (
    <div
      className={`fixed z-40 top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 p-5 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold dark:text-white">DevTools</h1>
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden text-xl dark:text-white"
        >
          ✕
        </button>
      </div>

      {/* Menu list - scrollable */}
      <div className="overflow-y-auto mb-6" style={{ maxHeight: "calc(100% - 120px)" }}>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`block px-3 py-2 rounded-lg ${
                  location.pathname === link.path
                    ? "bg-gray-200 dark:bg-gray-700"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                } dark:text-white`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <button
        onClick={toggleDark}
        className="flex items-center gap-2 px-3 py-2 w-full rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white"
      >
        <FaSun className="hidden dark:inline" />
        <FaMoon className="inline dark:hidden" />
        <span>Toggle Dark Mode</span>
      </button>
    </div>
  );
};

export default Sidebar;

