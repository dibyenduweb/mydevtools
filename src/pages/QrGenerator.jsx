import { useState, useRef } from "react";
import { toast } from "react-toastify";
import QRCode from "qrcode";

const QrGenerator = () => {
  const [text, setText] = useState("");
  const [qrCode, setQrCode] = useState("");
  const qrRef = useRef(null);

  const generateQr = async () => {
    try {
      if (!text.trim()) {
        toast.error("Please enter text or URL");
        return;
      }
      const qrDataUrl = await QRCode.toDataURL(text);
      setQrCode(qrDataUrl);
      toast.success("QR Code generated");
    } catch (err) {
      toast.error("Failed to generate QR Code");
      console.error(err);
    }
  };

  const downloadQr = () => {
    if (!qrCode) {
      toast.error("No QR Code to download");
      return;
    }
    
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "qr-code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR Code downloaded");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold dark:text-white">QR Code Generator</h1>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text or URL..."
            rows={4}
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
          <button
            onClick={generateQr}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Generate QR Code
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center">
          {qrCode ? (
            <>
              <img 
                ref={qrRef}
                src={qrCode} 
                alt="Generated QR Code" 
                className="w-48 h-48 border dark:border-gray-700"
              />
              <button
                onClick={downloadQr}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Download QR Code
              </button>
            </>
          ) : (
            <div className="w-48 h-48 border-2 border-dashed flex items-center justify-center dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">QR Preview</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QrGenerator;