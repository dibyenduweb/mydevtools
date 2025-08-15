import { useState, useRef } from "react";
import { toast } from "react-toastify";

const AiImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const [imageSize, setImageSize] = useState("512x512");
  const downloadRef = useRef(null);

  // API key from .env
  const HF_API_KEY = import.meta.env.VITE_HF_API_KEY;

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    setGeneratedImage("");

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${HF_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: prompt,
            negative_prompt: negativePrompt || "",
            options: { 
              wait_for_model: true,
              use_cache: false
            }
          }),
        }
      );

      if (response.status === 503) {
        const data = await response.json();
        const estimatedTime = data.estimated_time || 30;
        toast.info(`Model loading (try again in ${estimatedTime} seconds)`);
        return;
      }

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error.includes("rate limit") 
          ? "API rate limit exceeded (try later)" 
          : "Generation failed");
      }

      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setGeneratedImage(imageUrl);
      toast.success("Image generated!");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `ai-art-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Download started");
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl text-white font-bold text-center mb-6">AI Image Generator</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-white font-medium">Prompt*</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A futuristic city at sunset..."
              rows={4}
              className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-white mb-1 font-medium">Negative Prompt</label>
            <textarea
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              placeholder="blurry, distorted, low quality..."
              rows={2}
              className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-white mb-1 font-medium">Size</label>
            <select
              value={imageSize}
              onChange={(e) => setImageSize(e.target.value)}
              className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-800"
              disabled={isLoading}
            >
              <option value="512x512">512×512</option>
              <option value="768x768">768×768</option>
            </select>
          </div>

          <button
            onClick={generateImage}
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-lg font-medium ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isLoading ? "Generating..." : "Create Image"}
          </button>
        </div>

        {/* Output Section */}
        <div className="flex flex-col">
          <div className={`border-2 rounded-lg aspect-square flex items-center justify-center ${
            generatedImage ? "border-transparent" : "border-dashed border-gray-300"
          }`}>
            {generatedImage ? (
              <img
                src={generatedImage}
                alt="Generated AI art"
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <div className="text-center p-4 text-gray-500">
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                    <p>Generating your image...</p>
                    <p className="text-sm mt-1">This may take 15-30 seconds</p>
                  </>
                ) : (
                  <>
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p className="mt-2">Your AI art will appear here</p>
                  </>
                )}
              </div>
            )}
          </div>

          {generatedImage && (
            <button
              onClick={downloadImage}
              className="mt-4 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Download
            </button>
          )}

          <div className="mt-4 text-sm text-gray-500 text-center">
            <p>Free API may have limits. For heavy use, get your own key from Hugging Face.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiImageGenerator;
