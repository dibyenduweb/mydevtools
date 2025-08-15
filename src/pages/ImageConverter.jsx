import { useState } from "react";
import { toast } from "react-toastify";
import { FaUpload } from "react-icons/fa";

const ImageConverter = () => {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("png");
  const [quality, setQuality] = useState(0.9); // default High (90%)
  const [outputUrl, setOutputUrl] = useState(null);

  const handleUpload = (e) => {
    const imgFile = e.target.files[0];
    if (imgFile) {
      setFile(imgFile);
      setOutputUrl(null);
    }
  };

  const handleConvert = () => {
    if (!file) {
      toast.error("Please upload an image first");
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const mime = `image/${format}`;
      const dataUrl = canvas.toDataURL(mime, quality);
      setOutputUrl(dataUrl);

      toast.success("Converted successfully");
    };
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold dark:text-white">Image Converter</h1>

      {/* Upload button */}
      <label className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600">
        <FaUpload className="mr-2" />
        Choose File
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      </label>

      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
        >
          <option value="png">PNG</option>
          <option value="jpeg">JPG</option>
          <option value="webp">WEBP</option>
          <option value="gif">GIF</option>
          <option value="bmp">BMP</option>
          <option value="tiff">TIFF</option>
        </select>

        {/* Quality dropdown */}
        <select
          value={quality}
          onChange={(e) => setQuality(parseFloat(e.target.value))}
          className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
        >
          <option value={0.3}>Low (30%)</option>
          <option value={0.6}>Medium (60%)</option>
          <option value={0.9}>High (90%)</option>
        </select>

        <button
          onClick={handleConvert}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Convert
        </button>
      </div>

      {file && (
        <p className="dark:text-white">
          Selected: <strong>{file.name}</strong>
        </p>
      )}

      {outputUrl && (
        <div className="mt-4 space-y-2">
          <img
            src={outputUrl}
            alt="Converted preview"
            className="max-w-full rounded border dark:border-gray-700"
          />
          <a
            href={outputUrl}
            download={`converted.${format}`}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 inline-block"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageConverter;
