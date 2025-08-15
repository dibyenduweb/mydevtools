// import { useState } from "react";
// import Sidebar from "./components/Sidebar";
// import Router from "./router";

// const App = () => {
//   const [isDark, setIsDark] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDark = () => {
//     setIsDark(!isDark);
//     document.documentElement.classList.toggle("dark");
//   };

//   return (
//     <div className={`${isDark ? "dark" : ""}`}>
//       <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
//         <Sidebar
//           isOpen={isOpen}
//           setIsOpen={setIsOpen}
//           toggleDark={toggleDark}
//         />

//         {/* Content Area */}
//         <div className="flex-1">
//           {/* Hamburger */}
//           <div className="p-3 lg:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-2xl dark:text-white"
//             >
//               ☰
//             </button>
//           </div>

//           <div className="p-5">
//             <Router />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;


import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Router from "./router";

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`${isDark ? "dark" : ""}`}>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          toggleDark={toggleDark}
        />

        {/* Content Area */}
        <div className="flex-1 lg:ml-64">
          {/* Hamburger */}
          <div className="p-3 lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl dark:text-white"
            >
              ☰
            </button>
          </div>

          <div className="p-5">
            <Router />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
