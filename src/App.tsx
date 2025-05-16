import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import UploadForm from './components/UploadForm';
import OutputGallery from './components/OutputGallery';
import LoadingGame from './components/LoadingGame';
import axios from 'axios';
import backend_url  from './config';

interface StylizedImage {
  url: string;
  occasion: 'Office' | 'Party' | 'Vacation';
}

interface HistoryItem {
  sessionId: string;
  uploaded: string;
  results: StylizedImage[];
  createdAt: number;
}

function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);

  useEffect(() => {
    // Check system preference for dark mode
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Update dark mode class on document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  // Fetch history on component mount
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setIsHistoryLoading(true);
    try {
      const response = await axios.get(backend_url+'history');
      setHistory(response.data);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    } finally {
      setIsHistoryLoading(false);
    }
  };

  const handleImageUpload = (file: File, imageUrl: string) => {
    setUploadedFile(file);  
    setUploadedImage(imageUrl);
  };

  const handleGenerateStyles = async () => {
    if (!uploadedFile) return;
  
    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', uploadedFile);
  
    try {
      const response = await axios.post(backend_url+'/generate-styles', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
  
      const results = response.data; // Expecting an array of { url, occasion }
      const imageUrls = results.generated_images || {};
      const images = Object.entries(imageUrls).map(([occasion, url]) => ({
        url: url as string,
        occasion: occasion.charAt(0).toUpperCase() + occasion.slice(1) as 'Office' | 'Party' | 'Vacation',
      }));
      const newHistoryItem = {
        sessionId: `session-${Date.now()}`,
        uploaded: uploadedImage || '', // Ensure it's a string
        results: images,
        createdAt: Date.now(),
      };
  
      setHistory((prevHistory: HistoryItem[]) => [newHistoryItem, ...prevHistory]);
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setIsLoading(false);
    }
  };
  const getImageSrc = (path: string) => {
    if (path.startsWith('https') || path.startsWith('blob')) return path;
    return `${backend_url}${path}`;
  };
    
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-200">
      <header className="bg-surface-light dark:bg-surface-dark shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary-dark dark:text-primary-light">
            Outfit Stylizer
          </h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-surface-dark dark:hover:bg-surface-light transition-colors"
          >
            {isDarkMode ? (
              <Sun className="w-6 h-6 text-primary-light" />
            ) : (
              <Moon className="w-6 h-6 text-primary-dark" />
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <UploadForm onImageUpload={handleImageUpload} />
          </motion.div>

          {/* Small preview before style generation only */}
          {uploadedImage && !isLoading && (
            <div className="flex flex-col items-center mt-6 mb-4">
              <img
                src={uploadedImage}
                alt="Uploaded outfit preview"
                className="w-32 h-44 object-cover rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
              />
            </div>
          )}

          {/* Generate Styles button only before style generation */}
          {uploadedImage && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-2"
            >
              <button
                onClick={handleGenerateStyles}
                disabled={isLoading}
                className="w-full px-6 py-3 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Generate Styles
              </button>
            </motion.div>
          )}

          {isLoading && <LoadingGame />}

          {/* History Section */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-primary-dark dark:text-primary-light mb-4">
              History
            </h2>
            {isHistoryLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-pink-600 border-r-transparent"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Loading history...</p>
              </div>
            ) : (
              <div className="space-y-12">
                {history.length > 0 ? (
                  history.map((session: HistoryItem, idx: number) => (
                    <div key={session.sessionId} className="bg-surface-light dark:bg-surface-dark rounded-xl shadow p-6">
                      <div className="flex items-center mb-4">
                        <span className="font-semibold text-primary-dark dark:text-primary-light mr-4">Session {history.length - idx}</span>
                        <span className="text-xs text-gray-500">{new Date(session.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="flex flex-row gap-6">
                        <div className="flex flex-col items-center">
                          <img
                            src={getImageSrc(session.uploaded)}
                            alt="Uploaded"
                            className="w-20 h-28 object-cover rounded-lg border border-gray-200 dark:border-gray-700 mb-2"
                          />
                          <span className="text-xs text-gray-500">Original</span>
                        </div>
                        <OutputGallery images={session.results} enableDownload={true} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No history found. Upload an image to get started!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;