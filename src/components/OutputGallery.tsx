import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

interface StylizedImage {
  url: string;
  occasion: 'Original' | 'Office' | 'Party' | 'Vacation';
}

interface OutputGalleryProps {
  images: StylizedImage[];
  enableDownload?: boolean;
}

const labelColors: Record<string, string> = {
  Original: 'border-gray-300 text-gray-700 dark:text-gray-200',
  Office: 'border-blue-300 text-blue-500',
  Party: 'border-purple-300 text-purple-500',
  Vacation: 'border-orange-200 text-orange-500',
};

const OutputGallery: React.FC<OutputGalleryProps> = ({ images, enableDownload }) => {
  const handleDownload = (url: string, occasion: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${occasion}-outfit.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-row justify-center gap-6 w-full">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm w-56 min-h-[320px] p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
        >
          <div className="w-full aspect-[3/4] bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
            {image.url ? (
              <img
                src={image.url}
                alt={`${image.occasion} style`}
                className="object-cover w-full h-full rounded-xl"
              />
            ) : (
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="22" strokeWidth="2" />
                <line x1="12" y1="24" x2="36" y2="24" strokeWidth="2" />
                <line x1="24" y1="12" x2="24" y2="36" strokeWidth="2" />
              </svg>
            )}
          </div>
          <div className={`mt-auto w-full flex justify-center`}>
            <span
              className={`px-6 py-1 rounded-full border text-sm font-semibold bg-white dark:bg-surface-dark ${labelColors[image.occasion]}`}
            >
              {image.occasion}
            </span>
            {enableDownload && image.occasion !== 'Original' && image.url && (
              <button
                className="ml-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white transition-colors"
                onClick={() => handleDownload(image.url, image.occasion)}
                title={`Download ${image.occasion}`}
              >
                <Download className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default OutputGallery; 