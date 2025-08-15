import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import JsonViewer from "./pages/JsonViewer";
import TextCompare from "./pages/TextCompare";
import CaseConverter from "./pages/CaseConverter";
import UuidGenerator from "./pages/UuidGenerator";
import Base64Converter from "./pages/Base64Converter";
import JwtDecoder from "./pages/JwtDecoder";
import JsonToTs from "./pages/JsonToTs";
import SqlFormatter from "./pages/SqlFormatter";
import NumberBase from "./pages/NumberBase";
import CsvJson from "./pages/CsvJson";
import ImageConverter from "./pages/ImageConverter";
import Markdown from "./pages/Markdown";
import CronCalculator from "./pages/CronCalculator";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/json-viewer" element={<JsonViewer />} />
      <Route path="/text-compare" element={<TextCompare />} />
      <Route path="/case-converter" element={<CaseConverter />} />
      <Route path="/uuid-generator" element={<UuidGenerator />} />
      <Route path="/base64-converter" element={<Base64Converter />} />
      <Route path="/jwt-decoder" element={<JwtDecoder />} />
      <Route path="/json-to-ts" element={<JsonToTs />} />
      <Route path="/sql-formatter" element={<SqlFormatter />} />
      <Route path="/number-base" element={<NumberBase />} />
      <Route path="/csv-json" element={<CsvJson />} />
      <Route path="/image-converter" element={<ImageConverter />} />
      <Route path="/markdown" element={<Markdown />} />
      <Route path="/cron-calculator" element={<CronCalculator />} />
    </Routes>
  );
};

export default Router;
