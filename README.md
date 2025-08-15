# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# DevTool-clone (React + Vite + Tailwind + React Router)

A starter template that replicates the layout of the DevTool web app with:

- Responsive sidebar (hamburger on mobile)
- React Router DOM routing
- Dark / Light mode toggle
- TailwindCSS (default config, no custom styling)
- Separate `main.jsx` and `router.jsx`
- 14 placeholder pages ready for development

---

## 🛠 Installation

```bash
# Create the project
npm create vite@latest DevTool-clone -- --template react

cd DevTool-clone

# Install dependencies
npm install react-router-dom react-icons

# Install TailwindCSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
